package com.hmapvis.action;

import java.util.List;
import com.hmapvis.bean.PeopleJob;
import com.opensymphony.xwork2.ActionContext;

public class PeopleJobAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	private PeopleJob peopleJob;
	private List<PeopleJob> jobs;
	
	public PeopleJob getPeopleJob() {
		return peopleJob;
	}
	public void setPeopleJob(PeopleJob peopleJob) {
		this.peopleJob = peopleJob;
	}
	public List<PeopleJob> getJobs() {
		return jobs;
	}
	public void setJobs(List<PeopleJob> jobs) {
		this.jobs = jobs;
	}

	public String fetch(){
		try{
			peopleJob = peoplejobService.findByFeildByInt("pj_id", peopleJob.getPj_id());
			if(peopleJob != null){
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
			if(peoplejobService.dataExistsByInt("pj_id", peopleJob.getPj_id())){
				peoplejobService.update(peopleJob);
			}else{//add
				peoplejobService.add(peopleJob);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchAllJob(){
		jobs =  peoplejobService.findAll();

		return "success";
	}
}
