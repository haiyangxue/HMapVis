package com.hmapvis.utils;

import java.io.File;

import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.util.ServletContextAware;

import com.opensymphony.xwork2.ActionSupport;

public class StrutsFileUpload extends ActionSupport implements
		ServletContextAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private File upload;// 实际上传文件

	private String uploadContentType; // 文件的内容类型

	private String uploadFileName; // 上传文件名

	private String fileCaption;// 上传文件时的备注

	private ServletContext context;

	@Override
	public String execute() throws Exception {

		try {
			
			String targetDirectory = context.getRealPath("/upload");
			String targetFileName = uploadFileName;
			File target = new File(targetDirectory, targetFileName);
			FileUtils.copyFile(upload, target);			
			
			setUploadFileName(target.getPath());//保存文件的存放路径
		} catch (Exception e) {

			addActionError(e.getMessage());

			return INPUT;
		}

		return SUCCESS;

	}

	public String getFileCaption() {
		return fileCaption;
	}

	public void setFileCaption(String fileCaption) {
		this.fileCaption = fileCaption;
	}

	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}

	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}

	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}

	public void setServletContext(ServletContext context) {
		this.context = context;
	}

}
