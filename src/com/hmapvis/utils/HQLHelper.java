package com.hmapvis.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;

/**
 * 该类用来构造HQL语句，主要是返回 "from ...where ... order by ..."的部分；
 * 另外，如果想要查询count，则可以的手动添加"select count(*)"部分。（这里为了方便，也增加了相应方法：getCountHql()）
 * 
 *
 */
public class HQLHelper {
	private StringBuilder hql = new StringBuilder("");

	/**
	 * make "from Object o "
	 * 
	 * @param clazz
	 */
	public void appendFrom(Class clazz) {
		hql.append("from " + clazz.getSimpleName() + " o ");
	}

	/**
	 * 与 条件拼接。
	 */
	private void appendWhereAnd(List<String> wheres) {
		if (wheres != null && wheres.size() != 0) {
			int size = wheres.size();
			hql.append("where ");
			for (int i = 0; i < size; i++) {
				hql.append(wheres.get(i));
				if (i != size - 1) {
					hql.append(" and ");
				}
			}
		}
	}
	/**
	 * 或 条件拼接。
	 */
	private void appendWhereOr(List<String> wheres) {
		if (wheres != null && wheres.size() != 0) {
			int size = wheres.size();
			hql.append("where ");
			for (int i = 0; i < size; i++) {
				hql.append(wheres.get(i));
				if (i != size - 1) {
					hql.append(" and ");
				}
			}
		}
	}
	/**
	 * make after from --> "where ..."
	 * 
	 * @param wheres
	 *            forexample ["o.name=?","o.age>?","o.email=?"]
	 * @param isAnd 判断是否是and条件
	 */
	public void appendWhere(List<String> wheres ,boolean isAnd) {
		if(isAnd){
			appendWhereAnd(wheres);
		}else{
			appendWhereOr(wheres);
		}
	}
	public void appendWhere(List<String> wheres ){
		appendWhereAnd(wheres);
	}
	/**
	 * make "order by" :every Entry has tow elements ,such as <"name","desc">
	 * 
	 * @param orders
	 */
	public void appendOrderBy(List<Entry<String, String>> orders) {

		if (orders != null && orders.size() != 0) {
			int size = orders.size();
			hql.append(" order by ");

			for (int i = 0; i < size; i++) {
				Entry entry = orders.get(i);
				hql.append(entry.getKey() + " " + entry.getValue());
				if (i != size - 1) {
					hql.append(" , ");
				}
			}
		}

	}

	/**
	 * 构建一个完整的hql语句，调用以上三个方法
	 * 
	 * @param clazz
	 * @param wheres
	 * @param orders
	 * @param isWhereAnd 与条件还是或条件
	 */
	public String getHql(Class clazz, List<String> wheres,
			List<Entry<String, String>> orders,boolean isWhereAnd) {
		this.appendFrom(clazz);
		this.appendWhere(wheres,isWhereAnd);
		this.appendOrderBy(orders);
		System.out.println("HQLHelper生成的hql:"+this.hql.toString());
		return this.hql.toString();
	}
	public String getHql(Class clazz, List<String> wheres,
			List<Entry<String, String>> orders){
		return getHql(clazz, wheres, orders, false);
	}
	
	/**
	 * 返回"select count(*) from ... where ..."部分
	 * @param clazz
	 * @param wheres
	 * @return
	 */
	public String getCountHql(Class clazz , List<String> wheres){
		this.hql.append("select count(*) ");
		this.appendFrom(clazz);
		this.appendWhere(wheres);
System.out.println("HQLHelper生成的count hql:"+this.hql.toString());
		return this.hql.toString();
	}

	
	public static void main(String args[]){
		HQLHelper test = new HQLHelper();
		List<String> wheres = new ArrayList<String>();
		wheres.add("o.dynasty_id=?");
		wheres.add("o.type_id=?");
		
		test.getCountHql("event".getClass(),wheres);
		
	}
	
	
}
