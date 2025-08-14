// FormRendererWrapper.jsx
import { useSelector } from 'react-redux';
import { selectForms } from './formSlice';
import FormRenderer from './FormRenderer';
import { useParams } from 'react-router-dom';

const FormRendererWrapper = () => {
  const { formId } = useParams();
  const forms = useSelector(selectForms);
  const form = forms.find(f => f.id === formId);

  if (!form) {
    return <div className="p-6">Form not found</div>;
  }

  return <FormRenderer form={form} />;
};

export default FormRendererWrapper;