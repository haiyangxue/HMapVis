package com.hmapvis.bean;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "map", uniqueConstraints = {})
public class Map implements java.io.Serializable{
	
	private static final long serialVersionUID = 1L;
	private int map_id;
	private String map_name;
	private int user_id;
	private int dynasty_id;
	private long start_time;
	private long end_time;
	private String tile_path;
	private Timestamp create_time;
	private String map_bounds;
	public int regiontype;
	@Id
	@Column(name = "map_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getMap_id() {
		return map_id;
	}
	public void setMap_id(int map_id) {
		this.map_id = map_id;
	}
	public String getMap_name() {
		return map_name;
	}
	public void setMap_name(String map_name) {
		this.map_name = map_name;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public int getDynasty_id() {
		return dynasty_id;
	}
	public void setDynasty_id(int dynasty_id) {
		this.dynasty_id = dynasty_id;
	}
	public long getStart_time() {
		return start_time;
	}
	public void setStart_time(long start_time) {
		this.start_time = start_time;
	}
	public long getEnd_time() {
		return end_time;
	}
	public void setEnd_time(long end_time) {
		this.end_time = end_time;
	}
	public String getTile_path() {
		return tile_path;
	}
	public void setTile_path(String tile_path) {
		this.tile_path = tile_path;
	}
	public Timestamp getCreate_time() {
		return create_time;
	}
	public void setCreate_time(Timestamp create_time) {
		this.create_time = create_time;
	}
	public String getMap_bounds() {
		return map_bounds;
	}
	public void setMap_bounds(String map_bounds) {
		this.map_bounds = map_bounds;
	}
	public int getRegiontype() {
		return regiontype;
	}
	public void setRegiontype(int regiontype) {
		this.regiontype = regiontype;
	}
	
}
