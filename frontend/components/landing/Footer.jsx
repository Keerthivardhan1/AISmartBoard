import React from "react";
import { GitFork,Link2, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* Project */}
          <div className="footer-project">
            <h3>SmartBoard</h3>

            <p>
              An interactive learning workspace for turning mathematical
              expressions into interactive graphs.
            </p>
            <p>Todo: Integrating AI Chat, Speech Recognition</p>
            <p>This is a prototype for an interactive learning workspace. 
              If you are teacher/mentor and would like to use it for your educational purposes, please contact me.</p>

            <p>Currently this prototype can handle </p>
            <ul>
              
              <li>5 generate equation requests per minute.</li>
              <li>20 such requests per day.</li>

            </ul>

            <div className="footer-tech">
              <span className="footer-label">Built with</span>

              <span>Excalidraw</span>
              <span className="tech-plus">+</span>
              <span>Gemini 2.5 Flash</span>
              <span className="tech-plus">+</span>
              <span>Desmos</span>
              <span className="tech-plus">+</span>
              <span>Framer Motion</span>
            </div>
          </div>

          {/* Connect */}
          <div className="footer-connect">
            <h3>Connect</h3>

            <div className="footer-links">

              <a
                href="https://www.linkedin.com/in/keerthi-vardhan-tekulapelli-7064a6245/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Link2 size={18} />
                <span>Linkedin</span>
              </a>

              <a
                href="https://github.com/Keerthivardhan1/AISmartBoard/tree/dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitFork size={18} />
                <span>GitFork</span>
              </a>

              <a href="mailto:keerthivardhantekulapelli@gmail.com">
                <Mail size={18} />
                <span>Email: keerthivardhantekulapelli@gmail.com</span>
              </a>

            </div>
          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <span>© 2026 SmartBoard</span>

          <span className="footer-made">
            Built for interactive learning
          </span>
        </div>

      </div>
    </footer>
  );
}

export default Footer;