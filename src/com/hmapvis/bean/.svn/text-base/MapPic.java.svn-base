package com.hmapvis.bean;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.postgresql.geometric.PGpoint;

@Entity
@Table(name = "map_pic", uniqueConstraints = {})
public class MapPic implements java.io.Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int level;
	private int pic_id;
	private PGpoint mercator;
	private int height;
	private int width;
	private String path;
	
	@Id
	@Column(name = "pic_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getPic_id() {
		return pic_id;
	}
	public void setPic_id(int pic_id) {
		this.pic_id = pic_id;
	}
	
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	
	public PGpoint getMercator() {
		return mercator;
	}
	public void setMercator(PGpoint mercator) {
		this.mercator = mercator;
	}
	public int getHeight() {
		return height;
	}
	public void setHeight(int height) {
		this.height = height;
	}
	public int getWidth() {
		return width;
	}
	public void setWidth(int width) {
		this.width = width;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
}
