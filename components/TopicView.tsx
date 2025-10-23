
import React, { useState } from 'react';
import type { Topic, User } from '../types.ts';
import { UserIcon, ArrowLeftIcon } from './IconComponents.tsx';

interface TopicViewProps {
  topic: Topic;
  usersMap: Map<string, User>;
  currentUser: User;
  onAddComment: (topicId: string, content: string) => void;
  setView: (view: { view: 'topic-list' }) => void;
}

const TopicView: React.FC<TopicViewProps> = ({ topic, usersMap, currentUser, onAddComment, setView }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(topic.id, newComment.trim());
      setNewComment('');
    }
  };

  const timeAgo = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div>
      <button
        onClick={() => setView({ view: 'topic-list' })}
        className="inline-flex items-center mb-6 px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2 -ml-1" />
        Back to Topics
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{topic.title}</h2>
        
        {/* Comments list */}
        <div className="space-y-6">
          {topic.comments.map((comment, index) => (
            <div key={comment.id} className="flex space-x-4">
              <div className="flex-shrink-0">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-300"/>
                 </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-gray-900 dark:text-white">{usersMap.get(comment.authorId)?.username || 'Unknown User'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{timeAgo(comment.timestamp)}</p>
                </div>
                <div className={`mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap ${index === 0 ? 'p-4 bg-gray-50 dark:bg-gray-700/50 rounded-md' : ''}`}>
                    {comment.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add comment form */}
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Post a reply</h3>
          <div>
            <label htmlFor="comment" className="sr-only">Comment</label>
            <textarea
              id="comment"
              name="comment"
              rows={5}
              className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your comment here..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post Reply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TopicView;