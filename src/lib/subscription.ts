import { api } from '../lib/axios'

interface FormData {
  name: string;
  email: string;
}

export default async function createNewSubscribed(formData: FormData) {
  try {
    const response = await api.post('', formData);
    console.log(response)
    
    alert(`
      Parabéns ${formData.name} você está inscrito em nosso evento online!
    `);

    return { success: true };

  } catch(error: any) {
    const status = error.response.status;

    if (status === 409) {
      alert('E-mail já cadastrado em nosso evento.');
    } else {
      alert('Algo inesperado aconteceu, tente novamente!');
    }
    
    return { success: false };
  }
}
