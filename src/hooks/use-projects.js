import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getGithubRepoUrl, getThumbnailUrl } from '../utils/project-urls';

const PROJECT_COLUMNS = 'id, title, description, tech_stack, detail_url, thumbnail_url, sort_order';

/**
 * 게시된 프로젝트 목록을 sort_order 순으로 불러오는 훅
 * (is_published = false 인 행은 DB 권한(RLS)으로도 차단됩니다)
 *
 * @returns {{
 *   projects: Array, isLoading: boolean, error: string,
 *   isConfigured: boolean, onRetry: function
 * }}
 */
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  const [error, setError] = useState('');

  const fetchProjects = useCallback(async () => {
    if (!supabase) return;
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select(PROJECT_COLUMNS)
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (fetchError) {
      setError('프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
    } else {
      setProjects(
        data.map((project) => ({
          ...project,
          tech_stack: project.tech_stack ?? [],
          thumbnail_url: project.thumbnail_url || getThumbnailUrl(project.detail_url),
          github_url: getGithubRepoUrl(project.detail_url),
        })),
      );
      setError('');
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /** 다시 시도: 로딩 표시 후 재조회 */
  const onRetry = () => {
    setIsLoading(true);
    setError('');
    fetchProjects();
  };

  return { projects, isLoading, error, isConfigured: Boolean(supabase), onRetry };
}
