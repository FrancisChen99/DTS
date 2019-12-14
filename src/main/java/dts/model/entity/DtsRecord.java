package dts.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Entity
@Table(name = "DTS_RECORD")
public class DtsRecord {

	@Column(name = "CITY")
	private String cITY;
	@Id
	@Column(name = "SEQ")
	private String sEQ;

	@Column(name = "KIND")
	private String kIND;

	@Column(name = "UPDATETIME")
	private String uPDATETIME;

	@Column(name = "RCOUNT")
	private String rCOUNT;

	@Column(name = "UCOUNT")
	private String uCOUNT;

	@Column(name = "LDATE")
	private String lDATE;

	@Column(name = "LUSER")
	private String lUSER;
	
	public DtsRecord() {}

}