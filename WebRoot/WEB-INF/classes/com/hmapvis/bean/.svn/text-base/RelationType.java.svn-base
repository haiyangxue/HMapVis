package com.hmapvis.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "relation_type", uniqueConstraints = {})
public class RelationType implements java.io.Serializable{
	private static final long serialVersionUID = 1L;
	
	private String relation_detail;
	private int relation_id;
	@Id
	@Column(name = "relation_id", unique = true, nullable = false, insertable = true, updatable = true)
	@GeneratedValue(strategy = GenerationType.AUTO)
	public int getRelation_id() {
		return relation_id;
	}
	public void setRelation_id(int relation_id) {
		this.relation_id = relation_id;
	}
	public String getRelation_detail() {
		return relation_detail;
	}
	public void setRelation_detail(String relation_detail) {
		this.relation_detail = relation_detail;
	}
}
