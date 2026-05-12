import { fetchTags } from '@/entities/tag/api/tagApi';
import type { TagsResource } from '@/entities/tag/api/types';
import { fetchTracks } from '@/entities/track/api/trackApi';
import type { TracksResource } from '@/entities/track/api/types';
import toLoadableResource from '@/shared/utils/toLoadableResource';
import { useCallback, useEffect, useState } from 'react';

export const useTracksResource = () => {
  //state

  const [tracks, setTracks] = useState<TracksResource>({
    status: 'loading',
    data: [],
  });

  const tracksToResource = toLoadableResource(
    tracks.status,
    tracks.data,
    'Трек не удалось загрузить',
  );

  // useEffect

  useEffect(() => {
    let isActual = false;

    const getTracks = async () => {
      const tracksResource = await fetchTracks();
      if (!isActual) setTracks(tracksResource);
    };

    getTracks();

    return () => {
      isActual = true;
    };
  }, []);

  // handlers

  const handleTracksReFetch = useCallback(async () => {
    setTracks({
      status: 'loading',
      data: [],
    });
    const tracksResource = await fetchTracks();
    setTracks(tracksResource);
  }, []);

  return {
    tracks: tracksToResource,
    reFetchTracks: handleTracksReFetch,
  };
};

export const useTagsResource = () => {
  //state

  const [tags, setTags] = useState<TagsResource>({
    status: 'loading',
    data: [],
  });

  const tagsToResource = toLoadableResource(
    tags.status,
    tags.data,
    'Тег не удалось загрузить',
  );

  // useEffect

  useEffect(() => {
    let isActual = false;

    const getTags = async () => {
      const tagsResource = await fetchTags();
      if (!isActual) setTags(tagsResource);
    };

    getTags();

    return () => {
      isActual = true;
    };
  }, []);

  // handlers

  const handleTagsReFetch = useCallback(async () => {
    setTags({
      status: 'loading',
      data: [],
    });
    const tagsResource = await fetchTags();
    setTags(tagsResource);
  }, []);

  return {
    tags: tagsToResource,
    reFetchTags: handleTagsReFetch,
  };
};
