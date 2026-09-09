package com.harumaki.app
import android.webkit.JavascriptInterface
import androidx.room.Room
import kotlinx.coroutines.runBlocking
import org.json.JSONArray
class NativeBridge(private val activity:MainActivity){
 private val db by lazy { Room.databaseBuilder(activity.applicationContext,AppDb::class.java,"harumaki.db").build() }
 @JavascriptInterface fun startTracking(){ activity.runOnUiThread{activity.startTracking()} }
 @JavascriptInterface fun stopTracking(){ activity.runOnUiThread{activity.stopTracking()} }
 @JavascriptInterface fun getTrailForDate(date:String):String= runBlocking {
   val a=JSONArray(); db.trailDao().byDate(date).forEach { p-> a.put(JSONArray().put(p.latitude).put(p.longitude)) }; a.toString()
 }
 @JavascriptInterface fun requestSync(){ /* Firebase同期は既存Web実装を維持。端末DBを原本にする拡張点 */ }
}
