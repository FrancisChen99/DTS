package dts.model.to;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
//@XmlRootElement
@JsonRootName("Data")
//@XmlAccessorType(XmlAccessType.FIELD)
public class DroneListMsgResponseHolder {
	
	//@JsonProperty("CASE")
	@JacksonXmlProperty(localName = "case")
	@JacksonXmlElementWrapper(useWrapping=false)
	private List<DroneListMsgResponse> Case;
	
	
}
