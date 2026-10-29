import { useContent } from '../content';
import './Faq.css';

function Faq() {
  const faq = useContent('faq');

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
