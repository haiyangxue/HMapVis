package com.hmapvis.bean;

import java.util.List;

public class HeatMap implements java.io.Serializable{
	private int dynasty_id;
	private List<HeatMapData> data;
	
	public int getHeatMap_dynasty_id(){
		return dynasty_id;
	}
	public void setHeatMap_dynasty_id(int dynasty_id){
		this.dynasty_id = dynasty_id;
	}
	
	public HeatMapData getData_i(int i){
		return data.get(i);
	}
	public void setData_i(int i, HeatMapData data){
		this.data.set(i, data);
		
	}
	
	public List<HeatMapData> add(HeatMapData data){
		this.data.add(data);
		return this.data;
	}
}
