package dts.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "DEPT")
public class Dept {
	@Id
	@Column(name = "DEPTNO")
	private String dEPTNO;
	
	@Column(name = "DEPTNAME")
	private String dEPTNAME;
	
	@Column(name = "GRADE")
	private String gRADE;

}
