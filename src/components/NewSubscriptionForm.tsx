import { ChangeEvent, FormEvent, useState } from 'react'
import createNewSubscribed from '../lib/subscription'

interface FormData {
  name: string;
  email: string;
}

interface MessageData {
  message: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function NewSubscriptionForm() {

  const [formData, setFormData] = useState<FormData>({ 
    name: '', email: '' 
  });

  const [emailError, setEmailError] = useState<MessageData>({ 
    message: '' 
  });

  async function handleSubmitNewSubscription(event: FormEvent) {
    event.preventDefault()

    if (!emailRegex.test(formData.email)) {
      alert(emailError.message)
      return;
    }

    const result = await createNewSubscribed(formData);

    if (result.success) {
      setFormData({ name: '', email: '' });
    }

  }

  return (
    <form onSubmit={handleSubmitNewSubscription}>
        <input 
          type="text"
          required
          placeholder="Nome completo"
          value={formData.name}
          onChange={
            (event) => setFormData({ 
              ...formData, 
              name: event.target.value
            })
          }
        />

        <input 
          type="text"
          required
          placeholder="E-mail"
          value={formData.email}
          onChange={handleEmailChange}
        />
        
        <button type="submit">Inscreva-se</button>
      </form>
  )

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setEmailError({message: 'Por favor, insira um e-mail válido.'});
    setFormData({ ...formData, email: value });
  }
}