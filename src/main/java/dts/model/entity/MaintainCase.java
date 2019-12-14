package dts.model.entity;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Table(name = "MAINTAIN_CASE")
public class MaintainCase {
	@Id
	@Column(name = "SERIAL")
	private String sERIAL;
	
	@Column(name = "UNIT")
	private String uNIT;
	
	@Column(name = "NAME")
	private String nAME;
	
	@Column(name = "REPBEGINTIME")
	private String rEPBEGINTIME;
	
	@Column(name = "REPENDTIME")
	private String rEPENDTIME;
	
	@Column(name = "PROBLEMDESC")
	private String pROBLEMDESC;
	
	@Column(name = "ENGINEER")
	private String eNGINEER;
	
	@Column(name = "DEPATURETIME")
	private String dEPATURETIME;
	
	@Column(name = "ARRIVALTIME")
	private String aRRIVALTIME;
	
	@Column(name = "FINISHTIME")
	private String fINISHTIME;
	
	@Column(name = "PROCESSDESC")
	private String pROCESSDESC;
	
	@Column(name = "STATUS")
	private String sTATUS;
	
	@Column(name = "PROCESSTIME")
	private String pROCESSTIME;
	
	@Column(name = "COMMUTETIME")
	private String cOMMUTETIME;
	
	@Column(name = "MEMO1")
	private String mEMO1;
	
	@Column(name = "MEMO2")
	private String mEMO2;
	
	@Column(name = "MEMO3")
	private String mEMO3;
	
	@Column(name = "MEMO4")
	private String mEMO4;
	
	@Column(name = "MEMO5")
	private String mEMO5;
	
	@Column(name = "UDATE")
	private String uDATE;
	
	@Column(name = "EDATE")
	private String eDATE;
	
	@Column(name = "LUSER")
	private String lUSER;
	
	public MaintainCase() {}
	
	//報修編號
	public String fetchSerial() {
		return sERIAL;
	}
	public void setSerial(String Serial) {
		this.sERIAL = Serial;
	}
	
	//報修單位
	public String fetchUnit() {
		return uNIT;
	}
	public void setUnit(String UNIT) {
		this.uNIT = UNIT;
	}
	
	//聯絡人
	public String fetchName() {
		return nAME;
	}
	public void setName(String Name) {
		this.nAME = Name;
	}
	
	// 叫修時間/回覆時間
	public String fetchRbtime() {
		return rEPBEGINTIME;
	}
	public void setRbtime(String rbtime) {
		this.rEPBEGINTIME = rbtime;
	}

	public String fetchRetime() {
		return rEPENDTIME;
	}
	public void setRetime(String retime) {
		this.rEPENDTIME = retime;
	}
	
	//問題說明
	public String fetchProblem() {
		return pROBLEMDESC;
	}
	public void setProblem(String problem) {
		this.pROBLEMDESC = problem;
	}
	
	//工程師
	public String fetchEngineer() {
		return eNGINEER;
	}
	public void setEngineer(String Engineer) {
		this.eNGINEER = Engineer;
	}
	
	// 出發時間
	public String fetchDepaturetime() {
		return dEPATURETIME;
	}
	public void setDepaturetime(String depaturetime) {
		this.dEPATURETIME = depaturetime;
	}
	
	// 到達時間
	public String fetchArrivaltime() {
		return aRRIVALTIME;
	}
	public void setArrivaltime(String arrivaltime) {
		this.aRRIVALTIME = arrivaltime;
		setCommutingtime();
	}
	
	//完成時間
	public String fetchFinishtime() {
		return fINISHTIME;
	}
	public void setFinishtime(String finishtime) {
		this.fINISHTIME = finishtime;
		setProcessingtime();
	}	
	
	//處理說明
	public String fetchProcess() {
		return pROCESSDESC;
	}
	public void setProcess(String process) {
		this.pROCESSDESC = process;
	}
	
	//狀態
	public String fetchStatus() {
		return sTATUS;
	}
	public void setStatus(String Status) {
		this.sTATUS = Status;
	}
	
	// 處理時間(小時)
	public String fetchProcessingtime(){
		return this.pROCESSTIME;
	}
	private void setProcessingtime(){
		this.pROCESSTIME = TimeCalculater(aRRIVALTIME,fINISHTIME);
	}
	
	// 交通時間(小時)
	public String fetchCommutingtime(){
		return this.cOMMUTETIME;
	}
	
	private void setCommutingtime(){
		this.cOMMUTETIME = TimeCalculater(dEPATURETIME,aRRIVALTIME);
	}
	
	// MEMO 未來擴充需求
	public String fetchMemo1(){
		return this.mEMO1;
	}
	public void setMemo1(String memo1){
		this.mEMO1=memo1;
	}
	
	public String fetchMemo2(){
		return this.mEMO2;
	}
	public void setMemo2(String memo2){
		this.mEMO2=memo2;
	}
	
	public String fetchMemo3(){
		return this.mEMO3;
	}
	public void setMemo3(String memo3){
		this.mEMO3=memo3;
	}
	
	public String fetchMemo4(){
		return this.mEMO4;
	}
	public void setMemo4(String memo4){
		this.mEMO4=memo4;
	}
	
	public String fetchMemo5(){
		return this.mEMO5;
	}
	public void setMemo5(String memo5){
		this.mEMO5=memo5;
	}
	
	public String fetchUdate(){
		return this.uDATE;
	}
	public void setUdate(String udate){
		this.uDATE=udate;
	}
	
	public String fetchEdate(){
		return this.eDATE;
	}
	public void setEdate(String edate){
		this.eDATE=edate;
	}
	
	public String fetchLuser(){
		return this.lUSER;
	}
	public void setLuser(String luser){
		this.lUSER=luser;
	}
	
	private String TimeCalculater(String stime, String etime) {
		
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		long hour = 0;
		try {
		    Date d1 = (Date) df.parse(stime);
		    Date d2 = (Date) df.parse(etime);
		    long diff = d1.getTime() - d2.getTime();
		    hour = diff / (1000 * 60 * 60);
		} catch (Exception e) {
		}
		return String.valueOf(hour);
	}
}	
