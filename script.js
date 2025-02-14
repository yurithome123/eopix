// public/script.js
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
    const amount = formData.get('amount');
  
    fetch('/donate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: amount })
    })
    .then(response => response.json())
    .then(data => {
      const resultDiv = document.getElementById('result');
      if(data.success) {
        resultDiv.innerHTML = `
          <p>Obrigado pela doação de R$${data.donationData.total.toFixed(2)}!</p>
          <p>Você ajudou o desenvolvedor com R$${data.donationData.developer.toFixed(2)} e a organização com R$${data.donationData.organization.toFixed(2)}!</p>
        `;
      } else {
        resultDiv.innerHTML = `<p>Ocorreu um erro: ${data.message}</p>`;
      }
    })
    .catch(err => {
      console.error('Erro:', err);
      document.getElementById('result').innerHTML = `<p>Erro ao processar a doação.</p>`;
    });
  });
  