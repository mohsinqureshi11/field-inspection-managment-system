import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addResponse } from './formSlice';

const FormRenderer = ({ form }) => {
  const [answers, setAnswers] = useState({});
  const [files, setFiles] = useState({});
  const dispatch = useDispatch();

  const handleFileChange = (fieldId, e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => ({ ...prev, [fieldId]: newFiles }));
    setAnswers(prev => ({ ...prev, [fieldId]: newFiles.map(f => f.name) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const missingFields = form.fields
      .filter(field => field.required && !answers[field.id])
      .map(field => field.question);

    if (missingFields.length > 0) {
      alert(`Please fill all required fields:\n${missingFields.join('\n')}`);
      return;
    }

    dispatch(addResponse({
      formId: form.id,
      answers,
      files: Object.keys(files),
      submittedAt: new Date().toISOString()
    }));

    alert('Form submitted successfully!');
    setAnswers({});
    setFiles({});
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={answers[field.id] || ''}
            onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
            className="w-full p-2 border rounded"
            required={field.required}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={answers[field.id] || ''}
            onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
            className="w-full p-2 border rounded"
            rows={4}
            required={field.required}
          />
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={answers[field.id] === option}
                  onChange={() => setAnswers({...answers, [field.id]: option})}
                  className="mr-2"
                  required={field.required && idx === 0}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options.map((option, idx) => (
              <label key={idx} className="flex items-center">
                <input
                  type="checkbox"
                  checked={answers[field.id]?.includes(option) || false}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(answers[field.id] || []), option]
                      : (answers[field.id] || []).filter(v => v !== option);
                    setAnswers({...answers, [field.id]: newValue});
                  }}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'dropdown':
        return (
          <select
            value={answers[field.id] || ''}
            onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
            className="w-full p-2 border rounded"
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        );

      case 'file':
        return (
          <div>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(field.id, e)}
              accept={field.fileTypes.join(',')}
              className="w-full p-2 border rounded"
              required={field.required && !files[field.id]}
            />
            {files[field.id] && (
              <div className="mt-2 text-sm">
                <p className="font-medium">Selected files:</p>
                <ul className="list-disc pl-5">
                  {files[field.id].map((file, idx) => (
                    <li key={idx}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      case 'date':
      case 'time':
      case 'datetime-local':
        return (
          <input
            type={field.type}
            value={answers[field.id] || ''}
            onChange={(e) => setAnswers({...answers, [field.id]: e.target.value})}
            className="w-full p-2 border rounded"
            required={field.required}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{form.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {form.fields.map((field) => (
          <div key={field.id} className="bg-white p-4 rounded-lg shadow">
            <label className="block text-lg font-medium mb-2">
              {field.question}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}

        <div className="text-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-medium transition-colors"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;