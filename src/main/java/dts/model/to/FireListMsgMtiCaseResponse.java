package dts.model.to;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class FireListMsgMtiCaseResponse {
	
	@JsonProperty("CS_NO")
	@XmlElement(name="CS_NO")
	private String csNo;
	
	@JsonProperty("CS_KIND")
	@XmlElement(name="CS_KIND")
	private String csKind;
	
	@JsonProperty("CS_CODE")
	@XmlElement(name="CS_CODE")
	private String code;
	
	@JsonProperty("IN_TIME")
	@XmlElement(name="IN_TIME")
	private String inTime;
	
	@JsonProperty("GOV_DEPT")
	@XmlElement(name="GOV_DEPT")
	private String govDept;
	
	@JsonProperty("PRO_STA")
	@XmlElement(name="PRO_STA")
	private String proSta;
	
	@JsonProperty("ADDR")
	@XmlElement(name="ADDR")
	private String csPlace;
	
	@JsonProperty("CS_CID")
	@XmlElement(name="CS_CID")
	private String csCid;
	
	@JsonProperty("Data")
	@XmlElement(name="Data")
	private String cCount;
	
	@JsonProperty("X")
	@XmlElement(name="X")
	private String x;
	
	@JsonProperty("Y")
	@XmlElement(name="Y")
	private String y;
	
	@JsonProperty("Data")
	@XmlElement(name="Data")
	private String goT;
}
