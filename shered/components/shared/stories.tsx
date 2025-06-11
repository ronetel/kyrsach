'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from './container';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import { Api } from '@/shered/services/api-client';
import { cn } from '@/shered/lib/utils';
import { IStory } from '@/shered/services/stories';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);
  const storiesRef = useRef<HTMLDivElement>(null);
  const [storyEnded, setStoryEnded] = useState(false);

  useEffect(() => {
    async function fetchStories() {
      try {
        const data = await Api.stories.getAll();
        setStories(data);
      } catch (error) {
        console.error('Ошибка загрузки сторисов:', error);
      }
    }
    fetchStories();
  }, []);

  useEffect(() => {
    if (storyEnded) {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prev) => prev + 1);
      } else {
        setOpen(false);
      }
      setStoryEnded(false);
    }
  }, [storyEnded, currentStoryIndex, stories.length]);

  const onClickStory = (index: number) => {
    setCurrentStoryIndex(index);
    setOpen(true);
    if (storiesRef.current) {
      const storyElement = storiesRef.current.children[index] as HTMLElement;
      storyElement?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  };

  const currentStoryItems = stories[currentStoryIndex]?.items
    ? stories[currentStoryIndex].items.map((item) => ({
        url: item.sourceUrl,
        type: 'image',
        duration: 5000,
      }))
    : [];

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
    }
  }, [currentStoryIndex, stories.length]);

  const goToPreviousStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
    }
  }, [currentStoryIndex]);

  const handleStoryEnd = useCallback(() => {
    setStoryEnded(true);
  }, []);

  return (
    <>
      <Container
        className={cn(
          'flex items-center justify-between gap-2 my-10',
          className
        )}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
            />
          ))}

        <div
          ref={storiesRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide p-2"
        >
          {stories.map((story, index) => (
            <img
              key={story.id}
              onClick={() => onClickStory(index)}
              className={cn(
                'rounded-md cursor-pointer shrink-0 transition-transform hover:scale-105',
                currentStoryIndex === index && 'border-2 border-white/50'
              )}
              height={250}
              width={200}
              src={story.previewImageUrl}
            />
          ))}
        </div>

        {open && currentStoryItems.length > 0 && (
          <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
          >
            <div
              className="relative flex items-center"
              style={{ width: 520, height: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              {currentStoryIndex > 0 && (
                <button
                  className="absolute left-[-50px] text-white/70 hover:text-white z-60"
                  onClick={goToPreviousStory}
                >
                  ◀
                </button>
              )}

              <button
                className="absolute -right-10 -top-5 z-60"
                onClick={() => setOpen(false)}
              >
                <X className="w-8 h-8 text-white/50" />
              </button>

              <ReactStories
                stories={currentStoryItems}
                defaultInterval={5000}
                width={520}
                height={'100%'}
                onAllStoriesEnd={handleStoryEnd}
                keyboardNavigation={false}
                preventDefault={true}
                storyStyles={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {currentStoryIndex < stories.length - 1 && (
                <button
                  className="absolute right-[-50px] text-white/70 hover:text-white z-60"
                  onClick={goToNextStory}
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
