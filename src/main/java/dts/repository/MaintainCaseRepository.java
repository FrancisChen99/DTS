package dts.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import dts.model.entity.MaintainCase;

//@Repository
public interface MaintainCaseRepository extends CrudRepository<dts.model.entity.MaintainCase, String> {

	public List<MaintainCase> findAll();
	
	public List<MaintainCase> findAllBysERIAL(String SERIAL);
	
	@SuppressWarnings("unchecked")
	public MaintainCase save(MaintainCase mCase);

}
