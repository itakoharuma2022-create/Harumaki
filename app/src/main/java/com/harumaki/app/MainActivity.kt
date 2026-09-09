package com.harumaki.app
import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.webkit.*
import androidx.activity.ComponentActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

class MainActivity:ComponentActivity(){
 lateinit var web:WebView
 override fun onCreate(b:Bundle?){super.onCreate(b)
  web=WebView(this).apply{
   settings.javaScriptEnabled=true; settings.domStorageEnabled=true; settings.databaseEnabled=true
   settings.setGeolocationEnabled(true); webViewClient=WebViewClient()
   addJavascriptInterface(NativeBridge(this@MainActivity),"HarumakiNative")
   loadUrl("file:///android_asset/index.html")
  }; setContentView(web); requestPerms()
 }
 fun requestPerms(){ val p=mutableListOf(Manifest.permission.ACCESS_FINE_LOCATION,Manifest.permission.ACCESS_COARSE_LOCATION)
  if(Build.VERSION.SDK_INT>=33)p.add(Manifest.permission.POST_NOTIFICATIONS)
  ActivityCompat.requestPermissions(this,p.toTypedArray(),1001)
 }
 fun startTracking(){ ContextCompat.startForegroundService(this,Intent(this,LocationForegroundService::class.java)) }
 fun stopTracking(){ stopService(Intent(this,LocationForegroundService::class.java)) }
 fun pushLocation(lat:Double,lng:Double,speed:Float){ runOnUiThread{ web.evaluateJavascript("window.HarumakiNativeLocation($lat,$lng,${speed*3.6f});",null)} }
}
