import faq from '../data/faq';
import './Faq.css';

function Faq() {
  return (
    <div className="Faq">
      {faq.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export default Faq;
