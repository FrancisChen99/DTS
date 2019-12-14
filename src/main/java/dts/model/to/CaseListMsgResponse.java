package dts.model.to;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@XmlRootElement
//@JsonRootName("CASE")
//@XmlAccessorType(XmlAccessType.FIELD)
public class CaseListMsgResponse {
	
	@JsonProperty("CS_NO")
	private String csNo;
	
	@JsonProperty("CS_KIND")
	private String csKind;
	
	@JsonProperty("KIND")
	private String kind;
	
	@JsonProperty("CS_CODE")
	private String code;
	
	@JsonProperty("IN_TIME")
	private String inTime;
	
	@JsonProperty("COUNTRY_NAME")
	private String cname;
	
	@JsonProperty("TOWN_NAME")
	private String tname;
	
	@JsonProperty("ADDR")
	private String csPlace;
	
	@JsonProperty("DEPT_NAME")
	private String deptName;
	
	@JsonProperty("PERSION_COUNT")
	private String pcount;
	
	@JsonProperty("CAR_COUNT")
	private String ccount;
	
	@JsonProperty("STATUS")
	private String status;
	
	
}
