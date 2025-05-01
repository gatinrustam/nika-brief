import { toast } from 'react-toastify';

export async function handleApiResponse(response) {
  const data = await response.json().catch(() => ({}));
  const isError = !response.ok || data.status === 'error';

  if (isError) {
    const validationDetails = data?.error?.details;

    let errorMessage = data?.message || 'Ошибка';

    if (validationDetails && typeof validationDetails === 'object') {
      const detailsStr = Object.entries(validationDetails)
        .map(([field, messages]) => {
          const label = field.charAt(0).toUpperCase() + field.slice(1);
          return `${label}: ${messages.join(', ')}`;
        })
        .join('. ');

      errorMessage += `. ${detailsStr}`;
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }

  return data;
}