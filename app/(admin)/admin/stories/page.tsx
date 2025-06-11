'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/shered/store/admin';
import { Button } from '@/shered/components/ui/button';
import Link from 'next/link';

const StoriesPage = () => {
  const { stories, loading, fetchAdminData } = useAdminStore();

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (loading) {
    return <div className="text-white text-center mt-10">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-main text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Управление сторисами</h1>
        <Link href="/admin/stories/add">
          <Button variant="red">Добавить сторис</Button>
        </Link>
      </div>
      <div className="space-y-4">
        {stories.length === 0 ? (
          <p>Сторисы отсутствуют.</p>
        ) : (
          stories.map((story) => (
            <div
              key={story.id}
              className="bg-[#3A2B2B] p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              <img
                src={story.previewImageUrl}
                alt="Preview"
                className="w-20 h-20 object-cover"
              />
              <div className="flex gap-2">
                <Link href={`/admin/stories/edit/${story.id}`}>
                  <Button variant="red">Редактировать</Button>
                </Link>
                <Button
                  variant="red"
                  onClick={() => {
                    /* TODO: Implement delete */
                  }}
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
