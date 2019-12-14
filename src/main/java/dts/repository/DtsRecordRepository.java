package dts.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;

import dts.model.entity.DtsRecord;

//@Repository
public interface DtsRecordRepository extends CrudRepository<dts.model.entity.DtsRecord, String> {

	public List<DtsRecord> findAll();
	
	public List<DtsRecord> findAllBykIND(String KIND);
	
	public List<DtsRecord> findByuPDATETIME(String UPDATETIME);
	
	@SuppressWarnings("unchecked")
	public DtsRecord save(DtsRecord record);

}
