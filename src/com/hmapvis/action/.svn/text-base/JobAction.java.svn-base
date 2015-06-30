package com.hmapvis.action;

import java.util.List;
import com.hmapvis.bean.Job;
import com.opensymphony.xwork2.ActionContext;

public class JobAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	private Job job;
	private List<Job> jobs;
	
	public Job getJob() {
		return job;
	}
	public void setJob(Job job) {
		this.job = job;
	}
	public List<Job> getJobs() {
		return jobs;
	}
	public void setJobs(List<Job> jobs) {
		this.jobs = jobs;
	}

	public String fetch(){
		try{
			job = jobService.findByFeildByInt("job_id", job.getJob_id());
			if(job != null){
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
			if(jobService.dataExistsByInt("job_id", job.getJob_id())){
				jobService.update(job);
			}else{//add
				jobService.add(job);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "success";
	}
	
	public String fetchAllJob(){
		jobs =  jobService.findAll();

		return "success";
	}
}
