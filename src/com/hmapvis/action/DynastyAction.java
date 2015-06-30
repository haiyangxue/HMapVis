package com.hmapvis.action;

import java.util.List;

import com.hmapvis.bean.Dynasty;
import com.hmapvis.bean.EventType;
import com.hmapvis.bean.Place;
import com.hmapvis.utils.TimeTrans;
import com.opensymphony.xwork2.ActionContext;

public class DynastyAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private Dynasty dynasty;
	private List<Dynasty> dynasties;
	
	public Dynasty getDynasty() {
		return dynasty;
	}

	public void setDynasty(Dynasty dynasty) {
		this.dynasty = dynasty;
	}

	public List<Dynasty> getDynasties() {
		return dynasties;
	}

	public void setDynasties(List<Dynasty> dynasties) {
		this.dynasties = dynasties;
	}

	public String fetch(){
		try{
			dynasty = dynastyService.findByFeildByInt("dynasty_id", dynasty.getDynasty_id());
			if(dynasty != null){
				return "success";
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String save(){
		try{
			//update
			if(dynastyService.dataExistsByInt("dynasty_id", dynasty.getDynasty_id())){
				dynastyService.update(dynasty);
			}else{//add
				dynastyService.add(dynasty);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchAllDynasty(){
		dynasties =  dynastyService.findAll();

		return "success";
	}
}
