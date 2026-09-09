package com.harumaki.app
import androidx.room.Entity
import androidx.room.PrimaryKey
@Entity(tableName="trail_points", indices=[androidx.room.Index(value=["date","timestamp"])])
data class TrailPoint(@PrimaryKey(autoGenerate=true) val id:Long=0,val timestamp:Long,val latitude:Double,val longitude:Double,val accuracy:Float,val speed:Float,val altitude:Double?,val date:String)
