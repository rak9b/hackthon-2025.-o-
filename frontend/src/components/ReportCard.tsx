import { VerifiedBadge } from './VerifiedBadge';
import { CrimeTypeTag } from './CrimeTypeTag';

export const ReportCard = ({ report }: { report: Report }) => (
  <article className="bg-white rounded-lg shadow-md p-6 mb-6">
    <div className="flex items-center mb-4">
      <img 
        src={report.user.profilePicture || '/default-avatar.png'} 
        alt={report.user.name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div>
        <h3 className="font-semibold text-lg">{report.user.name}</h3>
        <VerifiedBadge score={report.verificationScore} />
      </div>
    </div>

    <h2 className="text-xl font-bold mb-2">{report.title}</h2>
    <CrimeTypeTag type={report.type} />
    
    <p className="text-gray-600 mb-4">{report.description}</p>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      {report.mediaUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Crime scene evidence ${index + 1}`}
          className="rounded-lg object-cover h-48 w-full"
          loading="lazy"
        />
      ))}
    </div>

    <div className="flex justify-between items-center text-sm text-gray-500">
      <span>{new Date(report.createdAt).toLocaleDateString()}</span>
      <span>{report.location.district}, {report.location.division}</span>
    </div>
  </article>
);
