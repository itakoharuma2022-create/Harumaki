package com.harumaki.app
import androidx.room.*
@Database(entities=[TrailPoint::class],version=1,exportSchema=false)
abstract class AppDb:RoomDatabase(){abstract fun trailDao():TrailDao}
