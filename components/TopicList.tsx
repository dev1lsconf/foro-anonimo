
import React from 'react';
import type { Topic, User } from '../types.ts';
import { UserIcon, CommentIcon, PlusIcon } from './IconComponents.tsx';

interface TopicListProps {
  topics: Topic[];
  usersMap: Map<string, User>;
  setView: (view: { view: 'topic-view'; topicId: string } | { view: 'new-topic' }) => void;
}

const TopicList: React.FC<TopicListProps> = ({ topics, usersMap, setView }) => {
  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((new Date().getTime() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Topics</h2>
        <button
          onClick={() => setView({ view: 'new-topic' })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="w-5 h-5 mr-2 -ml-1" />
          Create New Topic
        </button>
      </div>

      {topics.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No topics yet!</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Be the first to create one.</p>
        </div>
      ) : (
        <ul className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {topics.map((topic, index) => (
            <li key={topic.id} className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${index !== topics.length -1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  <CommentIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <button onClick={() => setView({ view: 'topic-view', topicId: topic.id })} className="text-left">
                    <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{topic.title}</p>
                  </button>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 space-x-4">
                    <div className="flex items-center space-x-1">
                      <UserIcon className="w-4 h-4" />
                      <span>{usersMap.get(topic.authorId)?.username || 'Unknown User'}</span>
                    </div>
                    <span>•</span>
                    <span>{timeAgo(topic.timestamp)}</span>
                    <span>•</span>
                    <span>{topic.comments.length - 1} replies</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopicList;