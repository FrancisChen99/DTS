package dts.model.to;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown=true)
public class Google119MsgRequest {
	
	@JsonProperty("v")
	private String version;
	
	@JsonProperty("emergency_number")
	private String emergencyNumber;
	
	@JsonProperty("source")
	private String source;
	
	@JsonProperty("thunderbird_version")
	private String thunderbirdVersion;
	
	@JsonProperty("time")
	private String callBeginTime;
	
	@JsonProperty("gt_location_latitude")
	private String groundTruthLatLoc;
	
	@JsonProperty("gt_location_longitude")
	private String groundTruthLonLoc;
	
	@JsonProperty("location_latitude")
	private String latLoc;
	
	@JsonProperty("location_longitude")
	private String lonLoc;
	
	@JsonProperty("location_time")
	private String locTime;
	
	@JsonProperty("location_altitude")
	private String locAltitude;
	
	@JsonProperty("location_floor")
	private String floorNumber;
	
	@JsonProperty("location_source")
	private String locSource;
	
	@JsonProperty("location_accuracy")
	private String locAccuracy;
	
	@JsonProperty("ation_vertical_accuracy")
	private String ationVAccuracy;
	
	@JsonProperty("location_confidence")
	private String locConfidence;
	
	@JsonProperty("location_bearing")
	private String locBear;
	
	@JsonProperty("location_speed")
	private String locSpeed;
	
	@JsonProperty("device_number")
	private String devNumber;
	
	@JsonProperty("device_model")
	private String devModel;
	
	@JsonProperty("device_imsi")
	private String devImsi;
	
	@JsonProperty("device_imei")
	private String devImei;
	
	@JsonProperty("device_iccid")
	private String devIccid;
	
	@JsonProperty("cell_home_mcc")
	private String callHomeMcc;
	
	@JsonProperty("cell_home_mnc")
	private String callHomeMnc;
	
	@JsonProperty("cell_network_mcc")
	private String callNetWorkMcc;
	
	@JsonProperty("cell_network_mnc")
	private String callNetWorkMnc;
	
}
