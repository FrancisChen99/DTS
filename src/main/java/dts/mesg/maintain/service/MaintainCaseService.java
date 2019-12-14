package dts.mesg.maintain.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dts.model.entity.Dept;
import dts.model.entity.MaintainCase;
import dts.repository.DeptRepository;
import dts.repository.MaintainCaseRepository;


@Service
@Transactional
public class MaintainCaseService {

  /** Logger */
  private Logger logger = LogManager.getLogger(MaintainCaseService.class);

  @Autowired
  private MaintainCaseRepository maintaincaseRepository;
  @Autowired
  private DeptRepository deptRepository;

  public List<MaintainCase> findAllByDate(String find_date) {

    List<MaintainCase> _list = new LinkedList<MaintainCase>();
    List<MaintainCase> list = maintaincaseRepository.findAll();
    for (MaintainCase r : list) {
      String date = r.fetchSerial().substring(2, 10);
      if (date.matches(find_date))
        _list.add(r);
    }
    list.clear();
    _list.sort(Comparator.comparing(MaintainCase::getSERIAL).reversed());
    return _list;
  }

  public List<MaintainCase> findAllByDate(List<MaintainCase> list, String find_date) {

    List<MaintainCase> _list = new LinkedList<MaintainCase>();
    for (MaintainCase r : list) {
      String date = r.fetchSerial().substring(2, 10);
      if (date.matches(find_date))
        _list.add(r);
    }
    _list.sort(Comparator.comparing(MaintainCase::getSERIAL).reversed());
    return _list;
  }

  public List<MaintainCase> findAllByUnit(String unit) {

    List<MaintainCase> _list = new LinkedList<MaintainCase>();
    List<MaintainCase> list = maintaincaseRepository.findAll();
    for (MaintainCase r : list) {
      if (r.fetchUnit().matches(unit))
        _list.add(r);
    }
    list.clear();
    _list.sort(Comparator.comparing(MaintainCase::getSERIAL).reversed());
    return _list;
  }

  public List<MaintainCase> findAllByUnit(List<MaintainCase> list, String unit) {

    List<MaintainCase> _list = new LinkedList<MaintainCase>();
    for (MaintainCase r : list) {
      if (r.fetchUnit().matches(unit))
        _list.add(r);
    }
    _list.sort(Comparator.comparing(MaintainCase::getSERIAL).reversed());
    return _list;
  }

  public List<MaintainCase> findAllBysERIAL(String SERIAL){
    List<MaintainCase> list = maintaincaseRepository.findAllBysERIAL(SERIAL);
    Collections.sort(list, Comparator.comparing(MaintainCase::getSERIAL));
    return list;
  }

  public List<MaintainCase> findAllBysERIAL(List<MaintainCase> list, String SERIAL){

    List<MaintainCase> _list = new LinkedList<MaintainCase>();
    for (MaintainCase r : list) {
      if (r.fetchSerial().matches(SERIAL))
        _list.add(r);
    }
    _list.sort(Comparator.comparing(MaintainCase::getSERIAL).reversed());
    return _list;
  }

  public List<MaintainCase> findAllBysERIALuNITdATE(String SERIAL, String UNIT, String DATE) {

    List<MaintainCase> list = new LinkedList<MaintainCase>();
    // filter
    if(!SERIAL.isEmpty()) {
    	list=maintaincaseRepository.findAllBysERIAL(SERIAL);
    	if(!UNIT.isEmpty())
    		list=findAllByUnit(list, UNIT);
    	if(!DATE.isEmpty())
            list=findAllByDate(list, DATE);
    } else if(!UNIT.isEmpty()) {
    	list=maintaincaseRepository.findAll();
    	list=findAllByUnit(list, UNIT);
        if(!DATE.isEmpty())
          list=findAllByDate(list, DATE);
    } else if(!DATE.isEmpty()) {
      list=findAllByDate(DATE);
    } else {
      list = maintaincaseRepository.findAll();
    }
    list.sort(Comparator.comparing(MaintainCase::getSERIAL).reversed());
    return list;
  }

  public void save(MaintainCase mCase) {
    maintaincaseRepository.save(mCase);
  }

  public List<Dept> findAllBygRADE(String GRADE) {
    List<Dept> list = deptRepository.findAllBygRADE(GRADE);
    Collections.sort(list, Comparator.comparing(Dept::getDEPTNO));
    return list;
  }
}
