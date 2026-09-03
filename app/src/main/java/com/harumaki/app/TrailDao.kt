package com.harumaki.app
import androidx.room.*
@Dao interface TrailDao {
 @Insert suspend fun insert(p:TrailPoint)
 @Query("SELECT * FROM trail_points WHERE date=:date ORDER BY timestamp ASC") suspend fun byDate(date:String):List<TrailPoint>
 @Query("SELECT COUNT(*) FROM trail_points WHERE date=:date") suspend fun count(date:String):Int
}
