package com.hmapvis.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller
@Scope("prototype")
public class FileUploadAction extends BaseAction {
	private static final long serialVersionUID = 1L;

	private File file;
	private String fileFileName;
	private String fileFileContentType;
	private String message = "0";
	private String filePath;

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileFileContentType() {
		return fileFileContentType;
	}

	public void setFileFileContentType(String fileFileContentType) {
		this.fileFileContentType = fileFileContentType;
	}

	@Override
	public String execute() throws Exception {
		return null;
	}

	public String upload() throws Exception {
		String path = ServletActionContext.getRequest().getSession()
				.getServletContext().getRealPath("/upload");

		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String[] fileSuffix = new String[] { ".exe" };
		try {
			File f = this.getFile();
			for (int i = 0; i < fileSuffix.length; i++) {
				if (fileFileName.endsWith(fileSuffix[i])) {
					message = "0";
					return ERROR;
				}
			}
			FileInputStream inputStream = new FileInputStream(f);
			FileOutputStream outputStream = new FileOutputStream(path + "\\"
					+ fileFileName);
			byte[] buf = new byte[1024];
			int length = 0;
			while ((length = inputStream.read(buf)) != -1) {
				outputStream.write(buf, 0, length);
			}
			inputStream.close();
			outputStream.flush();
			message = "upload/" + this.getFileFileName();
		} catch (Exception e) {
			e.printStackTrace();
			message = "2";
		}

		return SUCCESS;
	}

	public String uploadhead() throws Exception {
		String path = ServletActionContext.getRequest().getSession()
				.getServletContext().getRealPath("/upload/headpic");

		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String[] fileSuffix = new String[] { ".exe" };
		try {
			File f = this.getFile();
			for (int i = 0; i < fileSuffix.length; i++) {
				if (fileFileName.endsWith(fileSuffix[i])) {
					message = "0";
					return ERROR;
				}
			}
			FileInputStream inputStream = new FileInputStream(f);
			FileOutputStream outputStream = new FileOutputStream(path + "\\"
					+ fileFileName);
			byte[] buf = new byte[1024];
			int length = 0;
			while ((length = inputStream.read(buf)) != -1) {
				outputStream.write(buf, 0, length);
			}
			inputStream.close();
			outputStream.flush();
			message = "upload/headpic/" + this.getFileFileName();
		} catch (Exception e) {
			e.printStackTrace();
			message = "2";
		}

		return SUCCESS;
	}
	public String uploadeventpic() throws Exception {
		String path = ServletActionContext.getRequest().getSession()
				.getServletContext().getRealPath("/upload/eventpic");

		File file = new File(path);
		if (!file.exists()) {
			file.mkdir();
		}
		String[] fileSuffix = new String[] { ".exe" };
		try {
			File f = this.getFile();
			for (int i = 0; i < fileSuffix.length; i++) {
				if (fileFileName.endsWith(fileSuffix[i])) {
					message = "0";
					return ERROR;
				}
			}
			FileInputStream inputStream = new FileInputStream(f);
			FileOutputStream outputStream = new FileOutputStream(path + "\\"
					+ fileFileName);
			byte[] buf = new byte[1024];
			int length = 0;
			while ((length = inputStream.read(buf)) != -1) {
				outputStream.write(buf, 0, length);
			}
			inputStream.close();
			outputStream.flush();
			message = "upload/eventpic/" + this.getFileFileName();
		} catch (Exception e) {
			e.printStackTrace();
			message = "2";
		}

		return SUCCESS;
	}
}
