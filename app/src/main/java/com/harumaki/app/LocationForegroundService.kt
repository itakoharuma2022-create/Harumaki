package com.harumaki.app
import android.Manifest
import android.app.*
import android.content.*
import android.content.pm.PackageManager
import android.os.*
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.room.Room
import com.google.android.gms.location.*
import kotlinx.coroutines.*
import java.text.SimpleDateFormat
import java.util.*

class LocationForegroundService:Service(){
 private val scope=CoroutineScope(SupervisorJob()+Dispatchers.IO)
 private lateinit var fused:FusedLocationProviderClient
 private lateinit var db:AppDb
 private val cb=object:LocationCallback(){override fun onLocationResult(r:LocationResult){r.locations.forEach{save(it)}}}
 override fun onCreate(){super.onCreate(); channel(); startForeground(1001,notif())
  db=Room.databaseBuilder(applicationContext,AppDb::class.java,"harumaki.db").build()
  fused=LocationServices.getFusedLocationProviderClient(this); start()
 }
 private fun start(){
  if(ActivityCompat.checkSelfPermission(this,Manifest.permission.ACCESS_FINE_LOCATION)!=PackageManager.PERMISSION_GRANTED &&
   ActivityCompat.checkSelfPermission(this,Manifest.permission.ACCESS_COARSE_LOCATION)!=PackageManager.PERMISSION_GRANTED){stopSelf();return}
  val req=LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY,5000).setMinUpdateIntervalMillis(2000).setMinUpdateDistanceMeters(2f).build()
  fused.requestLocationUpdates(req,cb,mainLooper)
 }
 private fun save(l:android.location.Location){ val date=SimpleDateFormat("yyyy-MM-dd",Locale.JAPAN).format(Date(l.time))
  scope.launch{db.trailDao().insert(TrailPoint(timestamp=l.time,latitude=l.latitude,longitude=l.longitude,accuracy=l.accuracy,speed=if(l.hasSpeed())l.speed else 0f,altitude=if(l.hasAltitude())l.altitude else null,date=date))}
  val i=Intent("com.harumaki.LOCATION").putExtra("lat",l.latitude).putExtra("lng",l.longitude).putExtra("speed",if(l.hasSpeed())l.speed else 0f); sendBroadcast(i)
 }
 private fun channel(){getSystemService(NotificationManager::class.java).createNotificationChannel(NotificationChannel("track","位置情報記録",NotificationManager.IMPORTANCE_LOW))}
 private fun notif():Notification=NotificationCompat.Builder(this,"track").setSmallIcon(android.R.drawable.ic_menu_mylocation).setContentTitle("Harumaki").setContentText("冒険を記録中").setOngoing(true).build()
 override fun onStartCommand(i:Intent?,f:Int,id:Int)=START_STICKY
 override fun onDestroy(){if(::fused.isInitialized)fused.removeLocationUpdates(cb);scope.cancel();super.onDestroy()}
 override fun onBind(i:Intent?)=null
}
