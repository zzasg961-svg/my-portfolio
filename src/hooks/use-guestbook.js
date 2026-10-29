import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

/** 공개로 보여줄 컬럼만 조회합니다. (이름·연락처 등은 DB 권한으로도 막혀 있습니다) */
const PUBLIC_COLUMNS = 'id, message, rating, created_at';

/**
 * 방명록 목록 조회와 작성을 담당하는 훅
 *
 * @returns {{
 *   entries: Array, isLoading: boolean, error: string,
 *   isConfigured: boolean, addEntry: function
 * }}
 */
export function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [error, setError] = useState('');

  const fetchEntries = useCallback(async () => {
    if (!supabase) return;
    const { data, error: fetchError } = await supabase
      .from('guestbook')
      .select(PUBLIC_COLUMNS)
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError('방명록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
    } else {
      setEntries(data);
      setError('');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  /**
   * 새 방명록을 저장하고 목록을 다시 불러옵니다.
   * 비공개 컬럼은 조회 권한이 없으므로 insert 뒤에 .select()를 붙이지 않습니다.
   *
   * @param {object} entry - 폼 입력값
   * @returns {Promise<boolean>} 저장 성공 여부
   */
  const addEntry = async (entry) => {
    if (!supabase) return false;
    const { error: insertError } = await supabase.from('guestbook').insert(entry);
    if (insertError) return false;
    await fetchEntries();
    return true;
  };

  return { entries, isLoading, error, isConfigured: Boolean(supabase), addEntry };
}
