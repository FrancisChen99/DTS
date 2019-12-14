package dts.mesg.record.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dts.model.entity.DtsRecord;
import dts.repository.DtsRecordRepository;

@Service
@Transactional
public class DtsRecordsListService {

	/** Logger */
	private Logger logger = LogManager.getLogger(DtsRecordsListService.class);

	@Autowired
	private DtsRecordRepository dtsRecordRepository;

	public List<DtsRecord> findAllData() {

		long t1, t2;
		List<DtsRecord> max = new LinkedList<DtsRecord>();
		DtsRecord r1 = new DtsRecord();
		DtsRecord r2 = new DtsRecord();
		DtsRecord r3 = new DtsRecord();
		r3 = null;

		List<DtsRecord> list = dtsRecordRepository.findAll();
		// 程式名稱和時間排序
		Collections.sort(list, Comparator.comparing(DtsRecord::getKIND).thenComparing(DtsRecord::getUPDATETIME));

        // 取每個程式最新一筆資料
		for (int i = 0; i < list.size(); i++) {
			r1 = list.get(i);
			r2 = (i + 1 < list.size()) ? list.get(i + 1) : list.get(0);
			if (!r2.getKIND().matches(r1.getKIND())) {
				if (r3 != null) {
					max.add(r3);
					r3 = null;
				} else {
					max.add(r1);
				}
			} else {
				t1 = Long.parseLong(r1.getUPDATETIME());
				t2 = Long.parseLong(r2.getUPDATETIME());
				if (t2 > t1) r3 = r2;
			}
		}
		list.clear();
		// 時間排序 (近->遠)
		max.sort(Comparator.comparing(DtsRecord::getUPDATETIME).reversed());
		return max;
	}

	public List<DtsRecord> findByKindAndUpdatetime(String KIND, String UPDATETIME) {

		List<DtsRecord> _flist = new LinkedList<DtsRecord>();
		List<DtsRecord> list = dtsRecordRepository.findAll();
		for (DtsRecord r : list) {
			String date = r.getUPDATETIME().substring(0, 8);
			if (r.getKIND().matches(KIND) && date.matches(UPDATETIME))
				_flist.add(r);
		}
		list.clear();
		// 時間排序 (近->遠)
		_flist.sort(Comparator.comparing(DtsRecord::getUPDATETIME).reversed());
		return _flist;
	}

	public List<DtsRecord> findAllByKind(String KIND) {

		List<DtsRecord> list = dtsRecordRepository.findAllBykIND(KIND);
		// 時間排序 (近->遠)
		list.sort(Comparator.comparing(DtsRecord::getUPDATETIME).reversed());
		return list;
	}

	public List<DtsRecord> findByUpdatetime(String UPDATETIME) {

		List<DtsRecord> _flist = new LinkedList<DtsRecord>();
		List<DtsRecord> list = dtsRecordRepository.findAll();
		// 時間排序 (近->遠)
		list.sort(Comparator.comparing(DtsRecord::getUPDATETIME).reversed());
		for (DtsRecord r : list) {
			String date = r.getUPDATETIME().substring(0, 8);
			if (date.matches(UPDATETIME))
				_flist.add(r);
		}
		list.clear();
		return _flist;
	}
}
