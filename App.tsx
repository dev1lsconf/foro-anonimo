
import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.ts';
import type { User, Topic, Comment } from './types.ts';
import Header from './components/Header.tsx';
import Login from './components/Login.tsx';
import TopicList from './components/TopicList.tsx';
import TopicView from './components/TopicView.tsx';
import NewTopicForm from './components/NewTopicForm.tsx';

type ViewState = 
  | { view: 'topic-list' }
  | { view: 'topic-view'; topicId: string }
  | { view: 'new-topic' };

function App() {
  const [users, setUsers] = useLocalStorage<User[]>('forum_users', []);
  const [topics, setTopics] = useLocalStorage<Topic[]>('forum_topics', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('forum_currentUser', null);
  const [view, setView] = useState<ViewState>({ view: 'topic-list' });
  const [loginError, setLoginError] = useState<string | null>(null);

  const usersMap = useMemo(() => {
    const map = new Map<string, User>();
    users.forEach(user => map.set(user.id, user));
    return map;
  }, [users]);
  
  const handleLogin = (username: string, password: string) => {
    setLoginError(null);
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (existingUser) {
      if (existingUser.password === password) {
        setCurrentUser(existingUser);
        setView({ view: 'topic-list' });
      } else {
        setLoginError('Incorrect password. Please try again.');
      }
    } else {
        setLoginError('User not found. Please register.');
    }
  };

  const handleRegister = (username: string, password: string) => {
    setLoginError(null);
    const existingUser = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (existingUser) {
        setLoginError('Username already exists. Please try to log in or choose a different username.');
        return;
    }
    const newUser: User = { id: `user_${Date.now()}`, username, password };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setView({ view: 'topic-list' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleCreateTopic = (title: string, content: string) => {
    if (!currentUser) return;
    const newTopic: Topic = {
      id: `topic_${Date.now()}`,
      title,
      authorId: currentUser.id,
      timestamp: Date.now(),
      comments: [
        {
          id: `comment_${Date.now()}`,
          content,
          authorId: currentUser.id,
          timestamp: Date.now(),
        }
      ]
    };
    setTopics([newTopic, ...topics]);
    setView({ view: 'topic-list' });
  };
  
  const handleAddComment = (topicId: string, content: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      content,
      authorId: currentUser.id,
      timestamp: Date.now(),
    };

    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return { ...topic, comments: [...topic.comments, newComment] };
      }
      return topic;
    });

    setTopics(updatedTopics);
  };

  const renderContent = () => {
    if (!currentUser) {
      return <Login onLogin={handleLogin} onRegister={handleRegister} error={loginError} />;
    }

    switch (view.view) {
      case 'topic-list':
        return <TopicList topics={topics} usersMap={usersMap} setView={setView} />;
      case 'topic-view':
        const topic = topics.find(t => t.id === view.topicId);
        if (!topic) {
          setView({ view: 'topic-list' });
          return null;
        }
        return <TopicView topic={topic} usersMap={usersMap} currentUser={currentUser} onAddComment={handleAddComment} setView={setView} />;
      case 'new-topic':
        return <NewTopicForm onCreateTopic={handleCreateTopic} onCancel={() => setView({ view: 'topic-list' })} />;
      default:
        return <TopicList topics={topics} usersMap={usersMap} setView={setView} />;
    }
  };

  return (
    <div className="min-h-screen text-gray-800 dark:text-gray-200">
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;