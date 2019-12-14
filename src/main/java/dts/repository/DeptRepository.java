package dts.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import dts.model.entity.Dept;


//@NoRepositoryBean
public interface DeptRepository extends CrudRepository<dts.model.entity.Dept, String> {

	public List<Dept> findAllBygRADE(String GRADE);
}
