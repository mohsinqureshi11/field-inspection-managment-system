import { useSelector } from 'react-redux';
import { selectForms } from '../features/form/formSlice';
import { Link } from 'react-router-dom';

const FormList = () => {
  const forms = useSelector(selectForms);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Forms</h2>
      
      {forms.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No forms created yet</p>
          <Link to="/create-form" className="text-blue-500 hover:underline mt-2 inline-block">
            Create your first form
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map(form => (
            <div key={form.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold">{form.title}</h3>
              <p className="text-gray-500 mt-2">
                {form.fields.length} question{form.fields.length !== 1 ? 's' : ''}
              </p>
              <div className="mt-4 flex space-x-2">
                <Link
                  to={`/forms/${form.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  View Form
                </Link>
                <Link
                  to={`/responses/${form.id}`}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                >
                  View Responses
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormList;