import Link from 'next/link';

interface Course {
  title: string;
  description: string;
  difficulty: string;
  topics: number;
  problems: number;
  progress: number;
  tier: 'free' | 'pro';
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/50',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return (
    <Link href={`/course/${course.title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="glass rounded-2xl p-6 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {course.title}
            </h3>
            <p className="text-gray-400 text-sm">{course.description}</p>
          </div>
          {course.tier === 'pro' && (
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold rounded">
              PRO
            </span>
          )}
        </div>

        {/* Difficulty Badge */}
        <div className="mb-4">
          <span
            className={`px-3 py-1 border rounded-full text-xs font-semibold ${
              difficultyColors[course.difficulty as keyof typeof difficultyColors]
            }`}
          >
            {course.difficulty}
          </span>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mb-4 text-sm">
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span>{course.topics} topics</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>{course.problems} problems</span>
          </div>
        </div>

        {/* Progress Bar */}
        {course.progress > 0 ? (
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div className="text-center py-2 px-4 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm font-semibold group-hover:bg-blue-600/30 transition-colors">
            Start Learning →
          </div>
        )}
      </div>
    </Link>
  );
}
