package com.hmapvis.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class ChangeName {

	public static Connection getConn() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver");
			String url = "jdbc:postgresql://211.87.224.138:5432/hmap";
			try {
				conn = DriverManager.getConnection(url, "xhuyong", "123456");
			} catch (SQLException e) {
				e.printStackTrace();
			}
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return conn;
	}

	public static long getMinis(String time) {
		Calendar calendar = new GregorianCalendar();
		String symbol = "/";
		int index = time.indexOf(symbol);
		if (index != (-1)) {
			int year = Integer.parseInt(time.substring(0, index));
			String monthstr = time.substring(index + 1, index + 3);
			int month;
			if (monthstr != "00") {
				month = Integer.parseInt(monthstr);
			} else {
				month = 1;
			}
			String daystr = time.substring(index + 4, index + 6);
			int day;
			if (daystr != "00") {
				day = Integer.parseInt(daystr);
			} else {
				day = 1;
			}
			
			if (year > 0) {
				calendar.set(year, month - 1, day);
			} else {
				calendar.set(year + 1, month - 1, day);
			}
		}

		long timeinmillis = calendar.getTimeInMillis();
		return timeinmillis;
	}

	public static void main(String[] args) {
		Connection conn = getConn();

		String sql = "select * from event";
		Statement stmt = null;
		ResultSet rs = null;

		String sql2 = "";
		PreparedStatement stmt2 = null;
		try {
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);

			while (rs.next()) {
				int id = rs.getInt("event_id");

				String start_time = rs.getString("start_time_string");
				String end_time = rs.getString("end_time_string");

				if (start_time.equals("NotFound")
						&& end_time.equals("NotFound"))
					continue;
				if (start_time.equals("NotFound"))
					start_time = end_time;
				if (end_time.equals("NotFound"))
					end_time = start_time;
				
				long timeinmillis = getMinis(start_time);
				
				sql2 = "UPDATE event SET start_time='" + timeinmillis
						+ "' WHERE event_id='" + id + "'";
				stmt2 = conn.prepareStatement(sql2);
				stmt2.executeUpdate();
				
				timeinmillis = getMinis(end_time);
				sql2 = "UPDATE event SET end_time='" + timeinmillis
						+ "' WHERE event_id='" + id + "'";
				stmt2 = conn.prepareStatement(sql2);
				stmt2.executeUpdate();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

}
