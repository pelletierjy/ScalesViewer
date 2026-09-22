const _f = ':root,:host{--color-bg: #f5f7fb;--color-surface: #ffffff;--color-primary: #4f46e5;--color-primary-dark: #4338ca;--color-text: #1f2333;--color-muted: #6b7280;--color-border: #e2e5ec;--color-student: #4f46e5;--color-assistant: #eef0f6;--color-error: #dc2626;--color-success: #16a34a;--radius: 10px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}[data-theme=dark],:host([data-theme="dark"]){--color-bg: #0f1117;--color-surface: #1a1d27;--color-primary: #6366f1;--color-primary-dark: #4f46e5;--color-text: #e2e5ec;--color-muted: #9ca3af;--color-border: #2d3142;--color-student: #6366f1;--color-assistant: #252a3a}:host{display:block;height:100%;overflow:hidden;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--color-bg);color:var(--color-text)}:host #app{height:100%;min-height:0}*{box-sizing:border-box}body{margin:0;background:var(--color-bg);color:var(--color-text)}#app{max-width:720px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;padding:16px}h1,h2,h3{margin:0 0 8px}button{cursor:pointer;border:none;border-radius:var(--radius);padding:10px 16px;background:var(--color-primary);color:#fff;font-size:.95rem}button:hover{background:var(--color-primary-dark)}button:disabled{opacity:.6;cursor:not-allowed}input,select,textarea{width:100%;padding:8px 10px;border:1px solid var(--color-border);border-radius:var(--radius);font-size:.95rem;background:var(--color-surface);color:var(--color-text)}label{display:flex;flex-direction:column;gap:4px;margin-bottom:12px;font-size:.9rem;color:var(--color-muted)}.selector-form{background:var(--color-surface);border-radius:var(--radius);padding:24px;margin-top:40px;box-shadow:0 2px 8px #0000000f}.chat-view{display:flex;flex-direction:column;flex:1;min-height:0}.chat-header{padding:12px 0;font-weight:600;border-bottom:1px solid var(--color-border)}.message-list{flex:1;overflow-y:auto;padding:16px 0;display:flex;flex-direction:column;gap:10px}.message{display:flex}.message-bubble{max-width:80%;padding:10px 14px;border-radius:var(--radius);white-space:pre-wrap;word-break:break-word}.message-student{justify-content:flex-end}.message-student .message-bubble{background:var(--color-student);color:#fff}.message-assistant .message-bubble{background:var(--color-assistant)}.chat-status{min-height:1.2em;font-size:.85rem;color:var(--color-muted)}.input-bar{display:flex;gap:8px;padding:12px 0;border-top:1px solid var(--color-border)}.input-bar input{flex:1}.admin-shell,.admin-home{padding-top:24px}.admin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.admin-login-form,.entry-editor{background:var(--color-surface);border-radius:var(--radius);padding:20px;margin-bottom:20px;box-shadow:0 2px 8px #0000000f}.admin-login-error{color:var(--color-error);min-height:1.2em}.admin-error{color:var(--color-error);padding:16px}.entry-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px}.entry-list-item{display:flex;justify-content:space-between;align-items:center;background:var(--color-surface);border-radius:var(--radius);padding:12px 16px;box-shadow:0 1px 4px #0000000d}.entry-list-item span{display:block;color:var(--color-muted);font-size:.85rem}.entry-list-actions{display:flex;gap:8px}.entry-list-actions button[data-action=delete]{background:var(--color-error)}.entry-editor-actions{display:flex;gap:8px}.entry-editor-actions button[data-action=cancel]{background:var(--color-muted)}.entry-editor-status{min-height:1.2em;font-size:.85rem;color:var(--color-muted)}.toast-container{position:fixed;bottom:16px;right:16px;display:flex;flex-direction:column;gap:8px;z-index:1000}.toast{padding:10px 16px;border-radius:var(--radius);color:#fff;background:var(--color-text);box-shadow:0 2px 8px #00000026;font-size:.9rem}.toast-success{background:var(--color-success)}.toast-error{background:var(--color-error)}@media(max-width:480px){#app{padding:12px}.message-bubble{max-width:90%}}', yf = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science"
], If = Array.from({ length: 20 }, (r, e) => e + 1);
function wf(r) {
  const { subject: e, gradeLevel: t, difficulty: n, knowledgeContext: s, language: i } = r;
  return [
    `You are a patient, encouraging homework tutor for a grade ${t} student studying ${e}.`,
    `The student's current difficulty level is "${n}".`,
    "Stay strictly focused on this subject and homework help. If the student asks about anything unrelated (games, movies, other off-topic chat), politely decline and redirect them back to their homework.",
    "When asked for homework, generate one grade-appropriate question at the current difficulty. When the student answers, evaluate correctness, explain why, and offer a hint or the solution if they are stuck.",
    "Keep responses concise and encouraging.",
    `Always respond in ${i}.`,
    s ? `Use the following curriculum reference material to ground your response when relevant:
${s}` : ""
  ].filter(Boolean).join(`
`);
}
const Tf = [
  "video game",
  "video games",
  "movie",
  "movies",
  "celebrity",
  "tiktok",
  "instagram",
  "youtube video",
  "football score",
  "song lyrics"
], Af = ["en", "fr", "es"], vf = {
  en: "English",
  fr: "French",
  es: "Spanish"
};
let Ec = "en";
function Dc() {
  return Ec;
}
function lu(r) {
  Ec = _c(r) ? r : "en";
}
function _c(r) {
  return Af.includes(r);
}
const Rf = {
  common: { grade: "Grade" },
  selector: {
    title: "AI Homework Chatbot",
    subtitle: "Select your grade level and subject to start a homework session.",
    gradeLevelLabel: "Grade Level",
    subjectLabel: "Subject",
    subjectForcedLabel: "Subject:",
    subjectOtherOption: "Other...",
    subjectPlaceholder: "Enter subject",
    startButton: "Start Session"
  },
  chat: {
    thinking: "Thinking...",
    inputPlaceholder: "Type your message...",
    sendButton: "Send",
    errorNotConfigured: "The AI service is not configured. Please contact an administrator.",
    errorRateLimited: "We're a bit busy right now. Please try again in about a minute.",
    errorUnavailable: "The AI service is temporarily unavailable. Please try again shortly.",
    errorNetwork: "Connection problem. Check your internet and try again.",
    errorGeneric: "Something went wrong. Please try again."
  },
  guardrails: {
    redirectMessage: "Let's stay focused on your {subject} homework — that question is outside what I can help with here. Want another practice problem?"
  },
  admin: {
    firebaseNotConfiguredTitle: "Firebase is not configured",
    firebaseNotConfiguredDescription: "The shared knowledge base requires a Firebase project.",
    firebaseStep1: 'Create a project at <a href="https://console.firebase.google.com" target="_blank">Firebase Console</a>',
    firebaseStep2: "Enable Cloud Firestore (Native mode)",
    firebaseStep3: "Copy your web app config into <code>.env</code> (see the placeholder variables)",
    firebaseStep4: "Restart the dev server (<code>npm run dev</code>)",
    dbErrorTitle: "Unable to reach the shared database.",
    dbErrorDescription: "Check your connection, Firestore security rules, and browser console for details.",
    knowledgeBaseTitle: "Knowledge Base",
    addEntryButton: "Add Entry"
  },
  login: {
    setupTitle: "Set Admin PIN",
    loginTitle: "Admin Login",
    setupDescription: "No PIN has been configured yet. Choose one to protect the admin area.",
    loginDescription: "Enter the admin PIN to continue.",
    pinPlaceholder: "PIN",
    savePinButton: "Save PIN",
    loginButton: "Log In",
    pinTooShortError: "PIN must be at least 4 characters.",
    incorrectPinError: "Incorrect PIN."
  },
  entryEditor: {
    editTitle: "Edit Entry",
    addTitle: "Add Entry",
    subjectLabel: "Subject",
    gradeLevelLabel: "Grade Level",
    titleLabel: "Title",
    contentLabel: "Content",
    pedagogicalNotesLabel: "Pedagogical Notes",
    attachmentLabel: "Attachment (optional image, max 1MB)",
    saveButton: "Save",
    cancelButton: "Cancel",
    contentTooShortError: "Content must be at least 10 characters.",
    savingStatus: "Saving...",
    imageTooLargeError: "Image is too large (max 1MB).",
    entrySavedToast: "Entry saved.",
    saveFailedError: "Failed to save entry.",
    saveFailedToast: "Failed to save entry."
  },
  entryList: {
    loading: "Loading knowledge entries...",
    loadError: "Unable to load knowledge entries.",
    empty: "No knowledge entries yet.",
    editButton: "Edit",
    deleteButton: "Delete",
    deleteConfirm: 'Delete "{title}"?',
    deletedToast: "Entry deleted.",
    deleteFailedToast: "Failed to delete entry."
  }
}, bf = {
  common: { grade: "Année" },
  selector: {
    title: "Chatbot d'aide aux devoirs IA",
    subtitle: "Sélectionnez votre niveau scolaire et votre matière pour commencer une session de devoirs.",
    gradeLevelLabel: "Niveau scolaire",
    subjectLabel: "Matière",
    subjectForcedLabel: "Matière :",
    subjectOtherOption: "Autre...",
    subjectPlaceholder: "Entrez la matière",
    startButton: "Commencer la session"
  },
  chat: {
    thinking: "Réflexion en cours...",
    inputPlaceholder: "Tapez votre message...",
    sendButton: "Envoyer",
    errorNotConfigured: "Le service IA n'est pas configuré. Veuillez contacter un administrateur.",
    errorRateLimited: "Nous sommes un peu occupés en ce moment. Veuillez réessayer dans environ une minute.",
    errorUnavailable: "Le service IA est temporairement indisponible. Veuillez réessayer sous peu.",
    errorNetwork: "Problème de connexion. Vérifiez votre connexion Internet et réessayez.",
    errorGeneric: "Une erreur s'est produite. Veuillez réessayer."
  },
  guardrails: {
    redirectMessage: "Restons concentrés sur vos devoirs de {subject} — cette question sort du cadre de ce que je peux vous aider ici. Voulez-vous un autre exercice ?"
  },
  admin: {
    firebaseNotConfiguredTitle: "Firebase n'est pas configuré",
    firebaseNotConfiguredDescription: "La base de connaissances partagée nécessite un projet Firebase.",
    firebaseStep1: 'Créez un projet sur <a href="https://console.firebase.google.com" target="_blank">Firebase Console</a>',
    firebaseStep2: "Activez Cloud Firestore (mode natif)",
    firebaseStep3: "Copiez la configuration de votre application web dans <code>.env</code> (voir les variables d'espace réservé)",
    firebaseStep4: "Redémarrez le serveur de développement (<code>npm run dev</code>)",
    dbErrorTitle: "Impossible d'accéder à la base de données partagée.",
    dbErrorDescription: "Vérifiez votre connexion, les règles de sécurité Firestore et la console du navigateur pour plus de détails.",
    knowledgeBaseTitle: "Base de connaissances",
    addEntryButton: "Ajouter une entrée"
  },
  login: {
    setupTitle: "Définir le NIP administrateur",
    loginTitle: "Connexion administrateur",
    setupDescription: "Aucun NIP n'a encore été configuré. Choisissez-en un pour protéger la zone d'administration.",
    loginDescription: "Entrez le NIP administrateur pour continuer.",
    pinPlaceholder: "NIP",
    savePinButton: "Enregistrer le NIP",
    loginButton: "Connexion",
    pinTooShortError: "Le NIP doit contenir au moins 4 caractères.",
    incorrectPinError: "NIP incorrect."
  },
  entryEditor: {
    editTitle: "Modifier l'entrée",
    addTitle: "Ajouter une entrée",
    subjectLabel: "Matière",
    gradeLevelLabel: "Niveau scolaire",
    titleLabel: "Titre",
    contentLabel: "Contenu",
    pedagogicalNotesLabel: "Notes pédagogiques",
    attachmentLabel: "Pièce jointe (image facultative, max 1 Mo)",
    saveButton: "Enregistrer",
    cancelButton: "Annuler",
    contentTooShortError: "Le contenu doit comporter au moins 10 caractères.",
    savingStatus: "Enregistrement en cours...",
    imageTooLargeError: "L'image est trop volumineuse (max 1 Mo).",
    entrySavedToast: "Entrée enregistrée.",
    saveFailedError: "Échec de l'enregistrement de l'entrée.",
    saveFailedToast: "Échec de l'enregistrement de l'entrée."
  },
  entryList: {
    loading: "Chargement des entrées de la base de connaissances...",
    loadError: "Impossible de charger les entrées de la base de connaissances.",
    empty: "Aucune entrée dans la base de connaissances.",
    editButton: "Modifier",
    deleteButton: "Supprimer",
    deleteConfirm: "Supprimer « {title} » ?",
    deletedToast: "Entrée supprimée.",
    deleteFailedToast: "Échec de la suppression de l'entrée."
  }
}, Of = {
  common: { grade: "Grado" },
  selector: {
    title: "Chatbot de ayuda con tareas con IA",
    subtitle: "Selecciona tu nivel de grado y materia para comenzar una sesión de tareas.",
    gradeLevelLabel: "Nivel de grado",
    subjectLabel: "Materia",
    subjectForcedLabel: "Materia:",
    subjectOtherOption: "Otra...",
    subjectPlaceholder: "Ingresa la materia",
    startButton: "Iniciar sesión"
  },
  chat: {
    thinking: "Pensando...",
    inputPlaceholder: "Escribe tu mensaje...",
    sendButton: "Enviar",
    errorNotConfigured: "El servicio de IA no está configurado. Por favor, contacta a un administrador.",
    errorRateLimited: "Estamos un poco ocupados en este momento. Inténtalo de nuevo en aproximadamente un minuto.",
    errorUnavailable: "El servicio de IA no está disponible temporalmente. Inténtalo de nuevo en breve.",
    errorNetwork: "Problema de conexión. Revisa tu conexión a Internet e inténtalo de nuevo.",
    errorGeneric: "Algo salió mal. Inténtalo de nuevo."
  },
  guardrails: {
    redirectMessage: "Mantengámonos enfocados en tu tarea de {subject}; esa pregunta está fuera de lo que puedo ayudarte aquí. ¿Quieres otro problema de práctica?"
  },
  admin: {
    firebaseNotConfiguredTitle: "Firebase no está configurado",
    firebaseNotConfiguredDescription: "La base de conocimientos compartida requiere un proyecto de Firebase.",
    firebaseStep1: 'Crea un proyecto en <a href="https://console.firebase.google.com" target="_blank">Firebase Console</a>',
    firebaseStep2: "Habilita Cloud Firestore (modo nativo)",
    firebaseStep3: "Copia la configuración de tu aplicación web en <code>.env</code> (consulta las variables de marcador de posición)",
    firebaseStep4: "Reinicia el servidor de desarrollo (<code>npm run dev</code>)",
    dbErrorTitle: "No se puede acceder a la base de datos compartida.",
    dbErrorDescription: "Revisa tu conexión, las reglas de seguridad de Firestore y la consola del navegador para más detalles.",
    knowledgeBaseTitle: "Base de conocimientos",
    addEntryButton: "Agregar entrada"
  },
  login: {
    setupTitle: "Establecer PIN de administrador",
    loginTitle: "Inicio de sesión de administrador",
    setupDescription: "Aún no se ha configurado un PIN. Elige uno para proteger el área de administración.",
    loginDescription: "Ingresa el PIN de administrador para continuar.",
    pinPlaceholder: "PIN",
    savePinButton: "Guardar PIN",
    loginButton: "Iniciar sesión",
    pinTooShortError: "El PIN debe tener al menos 4 caracteres.",
    incorrectPinError: "PIN incorrecto."
  },
  entryEditor: {
    editTitle: "Editar entrada",
    addTitle: "Agregar entrada",
    subjectLabel: "Materia",
    gradeLevelLabel: "Nivel de grado",
    titleLabel: "Título",
    contentLabel: "Contenido",
    pedagogicalNotesLabel: "Notas pedagógicas",
    attachmentLabel: "Archivo adjunto (imagen opcional, máx. 1 MB)",
    saveButton: "Guardar",
    cancelButton: "Cancelar",
    contentTooShortError: "El contenido debe tener al menos 10 caracteres.",
    savingStatus: "Guardando...",
    imageTooLargeError: "La imagen es demasiado grande (máx. 1 MB).",
    entrySavedToast: "Entrada guardada.",
    saveFailedError: "No se pudo guardar la entrada.",
    saveFailedToast: "No se pudo guardar la entrada."
  },
  entryList: {
    loading: "Cargando entradas de la base de conocimientos...",
    loadError: "No se pudieron cargar las entradas de la base de conocimientos.",
    empty: "Aún no hay entradas en la base de conocimientos.",
    editButton: "Editar",
    deleteButton: "Eliminar",
    deleteConfirm: '¿Eliminar "{title}"?',
    deletedToast: "Entrada eliminada.",
    deleteFailedToast: "No se pudo eliminar la entrada."
  }
}, Sf = { en: Rf, fr: bf, es: Of };
function be(r, e) {
  const [t, n] = r.split(".");
  let i = Sf[Dc()][t][n] ?? r;
  if (e)
    for (const [o, B] of Object.entries(e))
      i = i.replaceAll(`{${o}}`, String(B));
  return i;
}
function Nf(r, e, t = {}) {
  const n = t.subjects ?? [], s = !!t.lastSubject && !n.includes(t.lastSubject), i = t.forcedSubject, o = i ? `<input type="hidden" name="subject" value="${i}" />
       <div class="selector-forced-subject"><strong>${be("selector.subjectForcedLabel")}</strong> ${i}</div>` : `<label>${be("selector.subjectLabel")}
         <select name="subject">
           ${n.map(
    (u) => `<option value="${u}" ${u === t.lastSubject ? "selected" : ""}>${u}</option>`
  ).join("")}
           <option value="__custom__" ${s ? "selected" : ""}>${be("selector.subjectOtherOption")}</option>
         </select>
       </label>
       <input
         type="text"
         name="customSubject"
         placeholder="${be("selector.subjectPlaceholder")}"
         value="${s ? t.lastSubject : ""}"
         style="display:${s ? "block" : "none"}"
       />`;
  r.innerHTML = `
    <form class="selector-form">
      <h1>${be("selector.title")}</h1>
      <p>${be("selector.subtitle")}</p>
      <label>${be("selector.gradeLevelLabel")}
        <select name="gradeLevel">
          ${If.map(
    (u) => `<option value="${u}" ${u === t.lastGradeLevel ? "selected" : ""}>${u}</option>`
  ).join("")}
        </select>
      </label>
      ${o}
      <button type="submit">${be("selector.startButton")}</button>
    </form>
  `;
  const B = r.querySelector("form");
  if (!i) {
    const u = B.querySelector('select[name="subject"]'), c = B.querySelector('input[name="customSubject"]');
    u.addEventListener("change", () => {
      c.style.display = u.value === "__custom__" ? "block" : "none";
    });
  }
  B.addEventListener("submit", (u) => {
    u.preventDefault();
    const c = Number(B.querySelector('select[name="gradeLevel"]').value), C = i || (B.querySelector('select[name="subject"]').value === "__custom__" ? B.querySelector('input[name="customSubject"]').value.trim() : B.querySelector('select[name="subject"]').value);
    C && e({ gradeLevel: c, subject: C });
  });
}
function uo(r, e) {
  r.innerHTML = e.map(
    (t) => `<div class="message message-${t.role}"><div class="message-bubble">${Ff(t.content)}</div></div>`
  ).join(""), r.scrollTop = r.scrollHeight;
}
function Ff(r) {
  const e = document.createElement("div");
  return e.textContent = r, e.innerHTML;
}
function Pf(r, e) {
  r.innerHTML = `
    <form class="input-bar">
      <input type="text" name="message" placeholder="${be("chat.inputPlaceholder")}" autocomplete="off" />
      <button type="submit">${be("chat.sendButton")}</button>
    </form>
  `;
  const t = r.querySelector("form"), n = t.querySelector("input");
  t.addEventListener("submit", (s) => {
    s.preventDefault();
    const i = n.value.trim();
    i && (n.value = "", e(i));
  });
}
function cu(r, e) {
  r.querySelectorAll("input, button").forEach((t) => {
    t.disabled = e;
  });
}
const No = (r, e) => e.some((t) => r instanceof t);
let hu, Cu;
function Lf() {
  return hu || (hu = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function xf() {
  return Cu || (Cu = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Fo = /* @__PURE__ */ new WeakMap(), lo = /* @__PURE__ */ new WeakMap(), pi = /* @__PURE__ */ new WeakMap();
function Vf(r) {
  const e = new Promise((t, n) => {
    const s = () => {
      r.removeEventListener("success", i), r.removeEventListener("error", o);
    }, i = () => {
      t(_n(r.result)), s();
    }, o = () => {
      n(r.error), s();
    };
    r.addEventListener("success", i), r.addEventListener("error", o);
  });
  return pi.set(e, r), e;
}
function Mf(r) {
  if (Fo.has(r))
    return;
  const e = new Promise((t, n) => {
    const s = () => {
      r.removeEventListener("complete", i), r.removeEventListener("error", o), r.removeEventListener("abort", o);
    }, i = () => {
      t(), s();
    }, o = () => {
      n(r.error || new DOMException("AbortError", "AbortError")), s();
    };
    r.addEventListener("complete", i), r.addEventListener("error", o), r.addEventListener("abort", o);
  });
  Fo.set(r, e);
}
let Po = {
  get(r, e, t) {
    if (r instanceof IDBTransaction) {
      if (e === "done")
        return Fo.get(r);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return _n(r[e]);
  },
  set(r, e, t) {
    return r[e] = t, !0;
  },
  has(r, e) {
    return r instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in r;
  }
};
function yc(r) {
  Po = r(Po);
}
function Gf(r) {
  return xf().includes(r) ? function(...e) {
    return r.apply(Lo(this), e), _n(this.request);
  } : function(...e) {
    return _n(r.apply(Lo(this), e));
  };
}
function kf(r) {
  return typeof r == "function" ? Gf(r) : (r instanceof IDBTransaction && Mf(r), No(r, Lf()) ? new Proxy(r, Po) : r);
}
function _n(r) {
  if (r instanceof IDBRequest)
    return Vf(r);
  if (lo.has(r))
    return lo.get(r);
  const e = kf(r);
  return e !== r && (lo.set(r, e), pi.set(e, r)), e;
}
const Lo = (r) => pi.get(r);
function Hf(r, e, { blocked: t, upgrade: n, blocking: s, terminated: i } = {}) {
  const o = indexedDB.open(r, e), B = _n(o);
  return n && o.addEventListener("upgradeneeded", (u) => {
    n(_n(o.result), u.oldVersion, u.newVersion, _n(o.transaction), u);
  }), t && o.addEventListener("blocked", (u) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    u.oldVersion,
    u.newVersion,
    u
  )), B.then((u) => {
    i && u.addEventListener("close", () => i()), s && u.addEventListener("versionchange", (c) => s(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), B;
}
const Uf = ["get", "getKey", "getAll", "getAllKeys", "count"], jf = ["put", "add", "delete", "clear"], co = /* @__PURE__ */ new Map();
function fu(r, e) {
  if (!(r instanceof IDBDatabase && !(e in r) && typeof e == "string"))
    return;
  if (co.get(e))
    return co.get(e);
  const t = e.replace(/FromIndex$/, ""), n = e !== t, s = jf.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (n ? IDBIndex : IDBObjectStore).prototype) || !(s || Uf.includes(t))
  )
    return;
  const i = async function(o, ...B) {
    const u = this.transaction(o, s ? "readwrite" : "readonly");
    let c = u.store;
    return n && (c = c.index(B.shift())), (await Promise.all([
      c[t](...B),
      s && u.done
    ]))[0];
  };
  return co.set(e, i), i;
}
yc((r) => ({
  ...r,
  get: (e, t, n) => fu(e, t) || r.get(e, t, n),
  has: (e, t) => !!fu(e, t) || r.has(e, t)
}));
const Jf = ["continue", "continuePrimaryKey", "advance"], du = {}, xo = /* @__PURE__ */ new WeakMap(), Ic = /* @__PURE__ */ new WeakMap(), qf = {
  get(r, e) {
    if (!Jf.includes(e))
      return r[e];
    let t = du[e];
    return t || (t = du[e] = function(...n) {
      xo.set(this, Ic.get(this)[e](...n));
    }), t;
  }
};
async function* Kf(...r) {
  let e = this;
  if (e instanceof IDBCursor || (e = await e.openCursor(...r)), !e)
    return;
  e = e;
  const t = new Proxy(e, qf);
  for (Ic.set(t, e), pi.set(t, Lo(e)); e; )
    yield t, e = await (xo.get(t) || e.continue()), xo.delete(t);
}
function gu(r, e) {
  return e === Symbol.asyncIterator && No(r, [IDBIndex, IDBObjectStore, IDBCursor]) || e === "iterate" && No(r, [IDBIndex, IDBObjectStore]);
}
yc((r) => ({
  ...r,
  get(e, t, n) {
    return gu(e, t) ? Kf : r.get(e, t, n);
  },
  has(e, t) {
    return gu(e, t) || r.has(e, t);
  }
}));
const Qf = "ai-homework-chatbot", zf = 1;
let ho = null;
function nr() {
  return ho || (ho = Hf(Qf, zf, {
    upgrade(r) {
      r.createObjectStore("studentSessions", { keyPath: "id" }).createIndex("startedAt", "startedAt");
      const t = r.createObjectStore("chatMessages", { keyPath: "id" });
      t.createIndex("sessionId", "sessionId"), t.createIndex("timestamp", "timestamp"), r.createObjectStore("appState", { keyPath: "key" });
    }
  })), ho;
}
async function Vo(r) {
  return (await (await nr()).get("appState", r))?.value;
}
async function Mo(r, e) {
  await (await nr()).put("appState", { key: r, value: e });
}
function wc(r, e) {
  return `knowledgeCache:${r}:${e}`;
}
async function $f(r, e) {
  return (await Vo(wc(r, e)))?.entries ?? [];
}
async function Yf(r, e, t) {
  await Mo(wc(r, e), { entries: t, cachedAt: Date.now() });
}
async function Wf(r) {
  await (await nr()).put("studentSessions", r);
}
async function Xf(r) {
  await (await nr()).put("studentSessions", r);
}
async function pu(r) {
  await (await nr()).put("chatMessages", r);
}
async function Zf(r) {
  return (await (await nr()).getAllFromIndex("chatMessages", "sessionId", r)).sort((n, s) => n.timestamp - s.timestamp);
}
var mu;
(function(r) {
  r.STRING = "string", r.NUMBER = "number", r.INTEGER = "integer", r.BOOLEAN = "boolean", r.ARRAY = "array", r.OBJECT = "object";
})(mu || (mu = {}));
var Eu;
(function(r) {
  r.LANGUAGE_UNSPECIFIED = "language_unspecified", r.PYTHON = "python";
})(Eu || (Eu = {}));
var Du;
(function(r) {
  r.OUTCOME_UNSPECIFIED = "outcome_unspecified", r.OUTCOME_OK = "outcome_ok", r.OUTCOME_FAILED = "outcome_failed", r.OUTCOME_DEADLINE_EXCEEDED = "outcome_deadline_exceeded";
})(Du || (Du = {}));
const _u = ["user", "model", "function", "system"];
var yu;
(function(r) {
  r.HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED", r.HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH", r.HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT", r.HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT", r.HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT", r.HARM_CATEGORY_CIVIC_INTEGRITY = "HARM_CATEGORY_CIVIC_INTEGRITY";
})(yu || (yu = {}));
var Iu;
(function(r) {
  r.HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED", r.BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE", r.BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE", r.BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH", r.BLOCK_NONE = "BLOCK_NONE";
})(Iu || (Iu = {}));
var wu;
(function(r) {
  r.HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED", r.NEGLIGIBLE = "NEGLIGIBLE", r.LOW = "LOW", r.MEDIUM = "MEDIUM", r.HIGH = "HIGH";
})(wu || (wu = {}));
var Tu;
(function(r) {
  r.BLOCKED_REASON_UNSPECIFIED = "BLOCKED_REASON_UNSPECIFIED", r.SAFETY = "SAFETY", r.OTHER = "OTHER";
})(Tu || (Tu = {}));
var xr;
(function(r) {
  r.FINISH_REASON_UNSPECIFIED = "FINISH_REASON_UNSPECIFIED", r.STOP = "STOP", r.MAX_TOKENS = "MAX_TOKENS", r.SAFETY = "SAFETY", r.RECITATION = "RECITATION", r.LANGUAGE = "LANGUAGE", r.BLOCKLIST = "BLOCKLIST", r.PROHIBITED_CONTENT = "PROHIBITED_CONTENT", r.SPII = "SPII", r.MALFORMED_FUNCTION_CALL = "MALFORMED_FUNCTION_CALL", r.OTHER = "OTHER";
})(xr || (xr = {}));
var Go;
(function(r) {
  r.TASK_TYPE_UNSPECIFIED = "TASK_TYPE_UNSPECIFIED", r.RETRIEVAL_QUERY = "RETRIEVAL_QUERY", r.RETRIEVAL_DOCUMENT = "RETRIEVAL_DOCUMENT", r.SEMANTIC_SIMILARITY = "SEMANTIC_SIMILARITY", r.CLASSIFICATION = "CLASSIFICATION", r.CLUSTERING = "CLUSTERING";
})(Go || (Go = {}));
var Au;
(function(r) {
  r.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", r.AUTO = "AUTO", r.ANY = "ANY", r.NONE = "NONE";
})(Au || (Au = {}));
var vu;
(function(r) {
  r.MODE_UNSPECIFIED = "MODE_UNSPECIFIED", r.MODE_DYNAMIC = "MODE_DYNAMIC";
})(vu || (vu = {}));
class He extends Error {
  constructor(e) {
    super(`[GoogleGenerativeAI Error]: ${e}`);
  }
}
class Pn extends He {
  constructor(e, t) {
    super(e), this.response = t;
  }
}
class Tc extends He {
  constructor(e, t, n, s) {
    super(e), this.status = t, this.statusText = n, this.errorDetails = s;
  }
}
class Qt extends He {
}
class Ac extends He {
}
const ed = "https://generativelanguage.googleapis.com", td = "v1beta", nd = "0.24.1", rd = "genai-js";
var Tn;
(function(r) {
  r.GENERATE_CONTENT = "generateContent", r.STREAM_GENERATE_CONTENT = "streamGenerateContent", r.COUNT_TOKENS = "countTokens", r.EMBED_CONTENT = "embedContent", r.BATCH_EMBED_CONTENTS = "batchEmbedContents";
})(Tn || (Tn = {}));
class sd {
  constructor(e, t, n, s, i) {
    this.model = e, this.task = t, this.apiKey = n, this.stream = s, this.requestOptions = i;
  }
  toString() {
    var e, t;
    const n = ((e = this.requestOptions) === null || e === void 0 ? void 0 : e.apiVersion) || td;
    let i = `${((t = this.requestOptions) === null || t === void 0 ? void 0 : t.baseUrl) || ed}/${n}/${this.model}:${this.task}`;
    return this.stream && (i += "?alt=sse"), i;
  }
}
function id(r) {
  const e = [];
  return r?.apiClient && e.push(r.apiClient), e.push(`${rd}/${nd}`), e.join(" ");
}
async function od(r) {
  var e;
  const t = new Headers();
  t.append("Content-Type", "application/json"), t.append("x-goog-api-client", id(r.requestOptions)), t.append("x-goog-api-key", r.apiKey);
  let n = (e = r.requestOptions) === null || e === void 0 ? void 0 : e.customHeaders;
  if (n) {
    if (!(n instanceof Headers))
      try {
        n = new Headers(n);
      } catch (s) {
        throw new Qt(`unable to convert customHeaders value ${JSON.stringify(n)} to Headers: ${s.message}`);
      }
    for (const [s, i] of n.entries()) {
      if (s === "x-goog-api-key")
        throw new Qt(`Cannot set reserved header name ${s}`);
      if (s === "x-goog-api-client")
        throw new Qt(`Header name ${s} can only be set using the apiClient field`);
      t.append(s, i);
    }
  }
  return t;
}
async function ad(r, e, t, n, s, i) {
  const o = new sd(r, e, t, n, i);
  return {
    url: o.toString(),
    fetchOptions: Object.assign(Object.assign({}, cd(i)), { method: "POST", headers: await od(o), body: s })
  };
}
async function us(r, e, t, n, s, i = {}, o = fetch) {
  const { url: B, fetchOptions: u } = await ad(r, e, t, n, s, i);
  return Bd(B, u, o);
}
async function Bd(r, e, t = fetch) {
  let n;
  try {
    n = await t(r, e);
  } catch (s) {
    ud(s, r);
  }
  return n.ok || await ld(n, r), n;
}
function ud(r, e) {
  let t = r;
  throw t.name === "AbortError" ? (t = new Ac(`Request aborted when fetching ${e.toString()}: ${r.message}`), t.stack = r.stack) : r instanceof Tc || r instanceof Qt || (t = new He(`Error fetching from ${e.toString()}: ${r.message}`), t.stack = r.stack), t;
}
async function ld(r, e) {
  let t = "", n;
  try {
    const s = await r.json();
    t = s.error.message, s.error.details && (t += ` ${JSON.stringify(s.error.details)}`, n = s.error.details);
  } catch {
  }
  throw new Tc(`Error fetching from ${e.toString()}: [${r.status} ${r.statusText}] ${t}`, r.status, r.statusText, n);
}
function cd(r) {
  const e = {};
  if (r?.signal !== void 0 || r?.timeout >= 0) {
    const t = new AbortController();
    r?.timeout >= 0 && setTimeout(() => t.abort(), r.timeout), r?.signal && r.signal.addEventListener("abort", () => {
      t.abort();
    }), e.signal = t.signal;
  }
  return e;
}
function pa(r) {
  return r.text = () => {
    if (r.candidates && r.candidates.length > 0) {
      if (r.candidates.length > 1 && console.warn(`This response had ${r.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`), Qs(r.candidates[0]))
        throw new Pn(`${jt(r)}`, r);
      return hd(r);
    } else if (r.promptFeedback)
      throw new Pn(`Text not available. ${jt(r)}`, r);
    return "";
  }, r.functionCall = () => {
    if (r.candidates && r.candidates.length > 0) {
      if (r.candidates.length > 1 && console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`), Qs(r.candidates[0]))
        throw new Pn(`${jt(r)}`, r);
      return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."), Ru(r)[0];
    } else if (r.promptFeedback)
      throw new Pn(`Function call not available. ${jt(r)}`, r);
  }, r.functionCalls = () => {
    if (r.candidates && r.candidates.length > 0) {
      if (r.candidates.length > 1 && console.warn(`This response had ${r.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`), Qs(r.candidates[0]))
        throw new Pn(`${jt(r)}`, r);
      return Ru(r);
    } else if (r.promptFeedback)
      throw new Pn(`Function call not available. ${jt(r)}`, r);
  }, r;
}
function hd(r) {
  var e, t, n, s;
  const i = [];
  if (!((t = (e = r.candidates) === null || e === void 0 ? void 0 : e[0].content) === null || t === void 0) && t.parts)
    for (const o of (s = (n = r.candidates) === null || n === void 0 ? void 0 : n[0].content) === null || s === void 0 ? void 0 : s.parts)
      o.text && i.push(o.text), o.executableCode && i.push("\n```" + o.executableCode.language + `
` + o.executableCode.code + "\n```\n"), o.codeExecutionResult && i.push("\n```\n" + o.codeExecutionResult.output + "\n```\n");
  return i.length > 0 ? i.join("") : "";
}
function Ru(r) {
  var e, t, n, s;
  const i = [];
  if (!((t = (e = r.candidates) === null || e === void 0 ? void 0 : e[0].content) === null || t === void 0) && t.parts)
    for (const o of (s = (n = r.candidates) === null || n === void 0 ? void 0 : n[0].content) === null || s === void 0 ? void 0 : s.parts)
      o.functionCall && i.push(o.functionCall);
  if (i.length > 0)
    return i;
}
const Cd = [
  xr.RECITATION,
  xr.SAFETY,
  xr.LANGUAGE
];
function Qs(r) {
  return !!r.finishReason && Cd.includes(r.finishReason);
}
function jt(r) {
  var e, t, n;
  let s = "";
  if ((!r.candidates || r.candidates.length === 0) && r.promptFeedback)
    s += "Response was blocked", !((e = r.promptFeedback) === null || e === void 0) && e.blockReason && (s += ` due to ${r.promptFeedback.blockReason}`), !((t = r.promptFeedback) === null || t === void 0) && t.blockReasonMessage && (s += `: ${r.promptFeedback.blockReasonMessage}`);
  else if (!((n = r.candidates) === null || n === void 0) && n[0]) {
    const i = r.candidates[0];
    Qs(i) && (s += `Candidate was blocked due to ${i.finishReason}`, i.finishMessage && (s += `: ${i.finishMessage}`));
  }
  return s;
}
function Kr(r) {
  return this instanceof Kr ? (this.v = r, this) : new Kr(r);
}
function fd(r, e, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = t.apply(r, e || []), s, i = [];
  return s = {}, o("next"), o("throw"), o("return"), s[Symbol.asyncIterator] = function() {
    return this;
  }, s;
  function o(m) {
    n[m] && (s[m] = function(y) {
      return new Promise(function(b, V) {
        i.push([m, y, b, V]) > 1 || B(m, y);
      });
    });
  }
  function B(m, y) {
    try {
      u(n[m](y));
    } catch (b) {
      f(i[0][3], b);
    }
  }
  function u(m) {
    m.value instanceof Kr ? Promise.resolve(m.value.v).then(c, C) : f(i[0][2], m);
  }
  function c(m) {
    B("next", m);
  }
  function C(m) {
    B("throw", m);
  }
  function f(m, y) {
    m(y), i.shift(), i.length && B(i[0][0], i[0][1]);
  }
}
const bu = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;
function dd(r) {
  const e = r.body.pipeThrough(new TextDecoderStream("utf8", { fatal: !0 })), t = md(e), [n, s] = t.tee();
  return {
    stream: pd(n),
    response: gd(s)
  };
}
async function gd(r) {
  const e = [], t = r.getReader();
  for (; ; ) {
    const { done: n, value: s } = await t.read();
    if (n)
      return pa(Ed(e));
    e.push(s);
  }
}
function pd(r) {
  return fd(this, arguments, function* () {
    const t = r.getReader();
    for (; ; ) {
      const { value: n, done: s } = yield Kr(t.read());
      if (s)
        break;
      yield yield Kr(pa(n));
    }
  });
}
function md(r) {
  const e = r.getReader();
  return new ReadableStream({
    start(n) {
      let s = "";
      return i();
      function i() {
        return e.read().then(({ value: o, done: B }) => {
          if (B) {
            if (s.trim()) {
              n.error(new He("Failed to parse stream"));
              return;
            }
            n.close();
            return;
          }
          s += o;
          let u = s.match(bu), c;
          for (; u; ) {
            try {
              c = JSON.parse(u[1]);
            } catch {
              n.error(new He(`Error parsing JSON response: "${u[1]}"`));
              return;
            }
            n.enqueue(c), s = s.substring(u[0].length), u = s.match(bu);
          }
          return i();
        }).catch((o) => {
          let B = o;
          throw B.stack = o.stack, B.name === "AbortError" ? B = new Ac("Request aborted when reading from the stream") : B = new He("Error reading from the stream"), B;
        });
      }
    }
  });
}
function Ed(r) {
  const e = r[r.length - 1], t = {
    promptFeedback: e?.promptFeedback
  };
  for (const n of r) {
    if (n.candidates) {
      let s = 0;
      for (const i of n.candidates)
        if (t.candidates || (t.candidates = []), t.candidates[s] || (t.candidates[s] = {
          index: s
        }), t.candidates[s].citationMetadata = i.citationMetadata, t.candidates[s].groundingMetadata = i.groundingMetadata, t.candidates[s].finishReason = i.finishReason, t.candidates[s].finishMessage = i.finishMessage, t.candidates[s].safetyRatings = i.safetyRatings, i.content && i.content.parts) {
          t.candidates[s].content || (t.candidates[s].content = {
            role: i.content.role || "user",
            parts: []
          });
          const o = {};
          for (const B of i.content.parts)
            B.text && (o.text = B.text), B.functionCall && (o.functionCall = B.functionCall), B.executableCode && (o.executableCode = B.executableCode), B.codeExecutionResult && (o.codeExecutionResult = B.codeExecutionResult), Object.keys(o).length === 0 && (o.text = ""), t.candidates[s].content.parts.push(o);
        }
      s++;
    }
    n.usageMetadata && (t.usageMetadata = n.usageMetadata);
  }
  return t;
}
async function vc(r, e, t, n) {
  const s = await us(
    e,
    Tn.STREAM_GENERATE_CONTENT,
    r,
    /* stream */
    !0,
    JSON.stringify(t),
    n
  );
  return dd(s);
}
async function Rc(r, e, t, n) {
  const i = await (await us(
    e,
    Tn.GENERATE_CONTENT,
    r,
    /* stream */
    !1,
    JSON.stringify(t),
    n
  )).json();
  return {
    response: pa(i)
  };
}
function bc(r) {
  if (r != null) {
    if (typeof r == "string")
      return { role: "system", parts: [{ text: r }] };
    if (r.text)
      return { role: "system", parts: [r] };
    if (r.parts)
      return r.role ? r : { role: "system", parts: r.parts };
  }
}
function Qr(r) {
  let e = [];
  if (typeof r == "string")
    e = [{ text: r }];
  else
    for (const t of r)
      typeof t == "string" ? e.push({ text: t }) : e.push(t);
  return Dd(e);
}
function Dd(r) {
  const e = { role: "user", parts: [] }, t = { role: "function", parts: [] };
  let n = !1, s = !1;
  for (const i of r)
    "functionResponse" in i ? (t.parts.push(i), s = !0) : (e.parts.push(i), n = !0);
  if (n && s)
    throw new He("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");
  if (!n && !s)
    throw new He("No content is provided for sending chat message.");
  return n ? e : t;
}
function _d(r, e) {
  var t;
  let n = {
    model: e?.model,
    generationConfig: e?.generationConfig,
    safetySettings: e?.safetySettings,
    tools: e?.tools,
    toolConfig: e?.toolConfig,
    systemInstruction: e?.systemInstruction,
    cachedContent: (t = e?.cachedContent) === null || t === void 0 ? void 0 : t.name,
    contents: []
  };
  const s = r.generateContentRequest != null;
  if (r.contents) {
    if (s)
      throw new Qt("CountTokensRequest must have one of contents or generateContentRequest, not both.");
    n.contents = r.contents;
  } else if (s)
    n = Object.assign(Object.assign({}, n), r.generateContentRequest);
  else {
    const i = Qr(r);
    n.contents = [i];
  }
  return { generateContentRequest: n };
}
function Ou(r) {
  let e;
  return r.contents ? e = r : e = { contents: [Qr(r)] }, r.systemInstruction && (e.systemInstruction = bc(r.systemInstruction)), e;
}
function yd(r) {
  return typeof r == "string" || Array.isArray(r) ? { content: Qr(r) } : r;
}
const Su = [
  "text",
  "inlineData",
  "functionCall",
  "functionResponse",
  "executableCode",
  "codeExecutionResult"
], Id = {
  user: ["text", "inlineData"],
  function: ["functionResponse"],
  model: ["text", "functionCall", "executableCode", "codeExecutionResult"],
  // System instructions shouldn't be in history anyway.
  system: ["text"]
};
function wd(r) {
  let e = !1;
  for (const t of r) {
    const { role: n, parts: s } = t;
    if (!e && n !== "user")
      throw new He(`First content should be with role 'user', got ${n}`);
    if (!_u.includes(n))
      throw new He(`Each item should include role field. Got ${n} but valid roles are: ${JSON.stringify(_u)}`);
    if (!Array.isArray(s))
      throw new He("Content should have 'parts' property with an array of Parts");
    if (s.length === 0)
      throw new He("Each Content should have at least one part");
    const i = {
      text: 0,
      inlineData: 0,
      functionCall: 0,
      functionResponse: 0,
      fileData: 0,
      executableCode: 0,
      codeExecutionResult: 0
    };
    for (const B of s)
      for (const u of Su)
        u in B && (i[u] += 1);
    const o = Id[n];
    for (const B of Su)
      if (!o.includes(B) && i[B] > 0)
        throw new He(`Content with role '${n}' can't contain '${B}' part`);
    e = !0;
  }
}
function Nu(r) {
  var e;
  if (r.candidates === void 0 || r.candidates.length === 0)
    return !1;
  const t = (e = r.candidates[0]) === null || e === void 0 ? void 0 : e.content;
  if (t === void 0 || t.parts === void 0 || t.parts.length === 0)
    return !1;
  for (const n of t.parts)
    if (n === void 0 || Object.keys(n).length === 0 || n.text !== void 0 && n.text === "")
      return !1;
  return !0;
}
const Fu = "SILENT_ERROR";
class Td {
  constructor(e, t, n, s = {}) {
    this.model = t, this.params = n, this._requestOptions = s, this._history = [], this._sendPromise = Promise.resolve(), this._apiKey = e, n?.history && (wd(n.history), this._history = n.history);
  }
  /**
   * Gets the chat history so far. Blocked prompts are not added to history.
   * Blocked candidates are not added to history, nor are the prompts that
   * generated them.
   */
  async getHistory() {
    return await this._sendPromise, this._history;
  }
  /**
   * Sends a chat message and receives a non-streaming
   * {@link GenerateContentResult}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessage(e, t = {}) {
    var n, s, i, o, B, u;
    await this._sendPromise;
    const c = Qr(e), C = {
      safetySettings: (n = this.params) === null || n === void 0 ? void 0 : n.safetySettings,
      generationConfig: (s = this.params) === null || s === void 0 ? void 0 : s.generationConfig,
      tools: (i = this.params) === null || i === void 0 ? void 0 : i.tools,
      toolConfig: (o = this.params) === null || o === void 0 ? void 0 : o.toolConfig,
      systemInstruction: (B = this.params) === null || B === void 0 ? void 0 : B.systemInstruction,
      cachedContent: (u = this.params) === null || u === void 0 ? void 0 : u.cachedContent,
      contents: [...this._history, c]
    }, f = Object.assign(Object.assign({}, this._requestOptions), t);
    let m;
    return this._sendPromise = this._sendPromise.then(() => Rc(this._apiKey, this.model, C, f)).then((y) => {
      var b;
      if (Nu(y.response)) {
        this._history.push(c);
        const V = Object.assign({
          parts: [],
          // Response seems to come back without a role set.
          role: "model"
        }, (b = y.response.candidates) === null || b === void 0 ? void 0 : b[0].content);
        this._history.push(V);
      } else {
        const V = jt(y.response);
        V && console.warn(`sendMessage() was unsuccessful. ${V}. Inspect response object for details.`);
      }
      m = y;
    }).catch((y) => {
      throw this._sendPromise = Promise.resolve(), y;
    }), await this._sendPromise, m;
  }
  /**
   * Sends a chat message and receives the response as a
   * {@link GenerateContentStreamResult} containing an iterable stream
   * and a response promise.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async sendMessageStream(e, t = {}) {
    var n, s, i, o, B, u;
    await this._sendPromise;
    const c = Qr(e), C = {
      safetySettings: (n = this.params) === null || n === void 0 ? void 0 : n.safetySettings,
      generationConfig: (s = this.params) === null || s === void 0 ? void 0 : s.generationConfig,
      tools: (i = this.params) === null || i === void 0 ? void 0 : i.tools,
      toolConfig: (o = this.params) === null || o === void 0 ? void 0 : o.toolConfig,
      systemInstruction: (B = this.params) === null || B === void 0 ? void 0 : B.systemInstruction,
      cachedContent: (u = this.params) === null || u === void 0 ? void 0 : u.cachedContent,
      contents: [...this._history, c]
    }, f = Object.assign(Object.assign({}, this._requestOptions), t), m = vc(this._apiKey, this.model, C, f);
    return this._sendPromise = this._sendPromise.then(() => m).catch((y) => {
      throw new Error(Fu);
    }).then((y) => y.response).then((y) => {
      if (Nu(y)) {
        this._history.push(c);
        const b = Object.assign({}, y.candidates[0].content);
        b.role || (b.role = "model"), this._history.push(b);
      } else {
        const b = jt(y);
        b && console.warn(`sendMessageStream() was unsuccessful. ${b}. Inspect response object for details.`);
      }
    }).catch((y) => {
      y.message !== Fu && console.error(y);
    }), m;
  }
}
async function Ad(r, e, t, n) {
  return (await us(e, Tn.COUNT_TOKENS, r, !1, JSON.stringify(t), n)).json();
}
async function vd(r, e, t, n) {
  return (await us(e, Tn.EMBED_CONTENT, r, !1, JSON.stringify(t), n)).json();
}
async function Rd(r, e, t, n) {
  const s = t.requests.map((o) => Object.assign(Object.assign({}, o), { model: e }));
  return (await us(e, Tn.BATCH_EMBED_CONTENTS, r, !1, JSON.stringify({ requests: s }), n)).json();
}
class Pu {
  constructor(e, t, n = {}) {
    this.apiKey = e, this._requestOptions = n, t.model.includes("/") ? this.model = t.model : this.model = `models/${t.model}`, this.generationConfig = t.generationConfig || {}, this.safetySettings = t.safetySettings || [], this.tools = t.tools, this.toolConfig = t.toolConfig, this.systemInstruction = bc(t.systemInstruction), this.cachedContent = t.cachedContent;
  }
  /**
   * Makes a single non-streaming call to the model
   * and returns an object containing a single {@link GenerateContentResponse}.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContent(e, t = {}) {
    var n;
    const s = Ou(e), i = Object.assign(Object.assign({}, this._requestOptions), t);
    return Rc(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (n = this.cachedContent) === null || n === void 0 ? void 0 : n.name }, s), i);
  }
  /**
   * Makes a single streaming call to the model and returns an object
   * containing an iterable stream that iterates over all chunks in the
   * streaming response as well as a promise that returns the final
   * aggregated response.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async generateContentStream(e, t = {}) {
    var n;
    const s = Ou(e), i = Object.assign(Object.assign({}, this._requestOptions), t);
    return vc(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (n = this.cachedContent) === null || n === void 0 ? void 0 : n.name }, s), i);
  }
  /**
   * Gets a new {@link ChatSession} instance which can be used for
   * multi-turn chats.
   */
  startChat(e) {
    var t;
    return new Td(this.apiKey, this.model, Object.assign({ generationConfig: this.generationConfig, safetySettings: this.safetySettings, tools: this.tools, toolConfig: this.toolConfig, systemInstruction: this.systemInstruction, cachedContent: (t = this.cachedContent) === null || t === void 0 ? void 0 : t.name }, e), this._requestOptions);
  }
  /**
   * Counts the tokens in the provided request.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async countTokens(e, t = {}) {
    const n = _d(e, {
      model: this.model,
      generationConfig: this.generationConfig,
      safetySettings: this.safetySettings,
      tools: this.tools,
      toolConfig: this.toolConfig,
      systemInstruction: this.systemInstruction,
      cachedContent: this.cachedContent
    }), s = Object.assign(Object.assign({}, this._requestOptions), t);
    return Ad(this.apiKey, this.model, n, s);
  }
  /**
   * Embeds the provided content.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async embedContent(e, t = {}) {
    const n = yd(e), s = Object.assign(Object.assign({}, this._requestOptions), t);
    return vd(this.apiKey, this.model, n, s);
  }
  /**
   * Embeds an array of {@link EmbedContentRequest}s.
   *
   * Fields set in the optional {@link SingleRequestOptions} parameter will
   * take precedence over the {@link RequestOptions} values provided to
   * {@link GoogleGenerativeAI.getGenerativeModel }.
   */
  async batchEmbedContents(e, t = {}) {
    const n = Object.assign(Object.assign({}, this._requestOptions), t);
    return Rd(this.apiKey, this.model, e, n);
  }
}
class bd {
  constructor(e) {
    this.apiKey = e;
  }
  /**
   * Gets a {@link GenerativeModel} instance for the provided model name.
   */
  getGenerativeModel(e, t) {
    if (!e.model)
      throw new He("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");
    return new Pu(this.apiKey, e, t);
  }
  /**
   * Creates a {@link GenerativeModel} instance from provided content cache.
   */
  getGenerativeModelFromCachedContent(e, t, n) {
    if (!e.name)
      throw new Qt("Cached content must contain a `name` field.");
    if (!e.model)
      throw new Qt("Cached content must contain a `model` field.");
    const s = ["model", "systemInstruction"];
    for (const o of s)
      if (t?.[o] && e[o] && t?.[o] !== e[o]) {
        if (o === "model") {
          const B = t.model.startsWith("models/") ? t.model.replace("models/", "") : t.model, u = e.model.startsWith("models/") ? e.model.replace("models/", "") : e.model;
          if (B === u)
            continue;
        }
        throw new Qt(`Different value for "${o}" specified in modelParams (${t[o]}) and cachedContent (${e[o]})`);
      }
    const i = Object.assign(Object.assign({}, t), { model: e.model, tools: e.tools, toolConfig: e.toolConfig, systemInstruction: e.systemInstruction, cachedContent: e });
    return new Pu(this.apiKey, i, n);
  }
}
const Oc = "AQ.Ab8RN6KhAZ1npo3nW6gp7G7Ybw-x097ZhHf_-r20fQSjp1TweQ", Od = "gemini-flash-latest", Sd = "gemini-embedding-001", Nd = 2048, Fd = 0.7, ko = {
  apiKey: "AIzaSyBQcg-52a8ry94h27FqZ8y7JJJ437ZBpfY",
  authDomain: "need-homework.firebaseapp.com",
  projectId: "need-homework",
  storageBucket: "need-homework.firebasestorage.app",
  messagingSenderId: "538094084506",
  appId: "1:538094084506:web:ef9d97b4e7f7b681e25a23"
};
function Pd() {
  return !!Oc;
}
function Ld() {
  return !!(ko.apiKey && ko.projectId);
}
class Jt extends Error {
  constructor(e, t) {
    super(t), this.kind = e, this.name = "GeminiError";
  }
  kind;
}
let Co = null;
function Sc() {
  if (!Pd())
    throw new Jt("not_configured", "Gemini API key is not configured.");
  return Co || (Co = new bd(Oc)), Co;
}
function Lu(r) {
  if (r instanceof Jt) return r;
  const e = r instanceof Error ? r.message : String(r);
  return /429/.test(e) ? new Jt("rate_limited", e) : /5\d\d/.test(e) ? new Jt("unavailable", e) : /network|timeout|fetch failed/i.test(e) ? new Jt("network", e) : new Jt("unknown", e);
}
const xd = 2e4, Vd = 3e3;
function Md(r) {
  return new Promise((e) => setTimeout(e, r));
}
function xu(r) {
  return Promise.race([
    r,
    new Promise(
      (e, t) => setTimeout(() => t(new Jt("network", "Request timed out.")), xd)
    )
  ]);
}
async function Nc(r) {
  try {
    return await xu(r());
  } catch (e) {
    const t = Lu(e);
    if (t.kind === "rate_limited") {
      await Md(Vd);
      try {
        return await xu(r());
      } catch (n) {
        throw Lu(n);
      }
    }
    throw t;
  }
}
async function Gd(r, e) {
  return Nc(async () => {
    const t = Sc().getGenerativeModel({
      model: Od,
      systemInstruction: r,
      generationConfig: {
        temperature: Fd,
        maxOutputTokens: Nd
      }
    }), n = e.map((i) => ({
      role: i.role === "student" ? "user" : "model",
      parts: [{ text: i.content }]
    }));
    return (await t.generateContent({ contents: n })).response.text();
  });
}
async function kd(r, e) {
  return Nc(async () => (await Sc().getGenerativeModel({ model: Sd }).embedContent({
    content: { role: "user", parts: [{ text: r }] },
    taskType: Go.RETRIEVAL_QUERY
  })).embedding.values);
}
function Hd(r) {
  const e = r.toLowerCase();
  return Tf.some((t) => e.includes(t));
}
function Ud(r) {
  return be("guardrails.redirectMessage", { subject: r });
}
const jd = () => {
};
const Fc = function(r) {
  const e = [];
  let t = 0;
  for (let n = 0; n < r.length; n++) {
    let s = r.charCodeAt(n);
    s < 128 ? e[t++] = s : s < 2048 ? (e[t++] = s >> 6 | 192, e[t++] = s & 63 | 128) : (s & 64512) === 55296 && n + 1 < r.length && (r.charCodeAt(n + 1) & 64512) === 56320 ? (s = 65536 + ((s & 1023) << 10) + (r.charCodeAt(++n) & 1023), e[t++] = s >> 18 | 240, e[t++] = s >> 12 & 63 | 128, e[t++] = s >> 6 & 63 | 128, e[t++] = s & 63 | 128) : (e[t++] = s >> 12 | 224, e[t++] = s >> 6 & 63 | 128, e[t++] = s & 63 | 128);
  }
  return e;
}, Jd = function(r) {
  const e = [];
  let t = 0, n = 0;
  for (; t < r.length; ) {
    const s = r[t++];
    if (s < 128)
      e[n++] = String.fromCharCode(s);
    else if (s > 191 && s < 224) {
      const i = r[t++];
      e[n++] = String.fromCharCode((s & 31) << 6 | i & 63);
    } else if (s > 239 && s < 365) {
      const i = r[t++], o = r[t++], B = r[t++], u = ((s & 7) << 18 | (i & 63) << 12 | (o & 63) << 6 | B & 63) - 65536;
      e[n++] = String.fromCharCode(55296 + (u >> 10)), e[n++] = String.fromCharCode(56320 + (u & 1023));
    } else {
      const i = r[t++], o = r[t++];
      e[n++] = String.fromCharCode((s & 15) << 12 | (i & 63) << 6 | o & 63);
    }
  }
  return e.join("");
}, Pc = {
  /**
   * Maps bytes to characters.
   */
  byteToCharMap_: null,
  /**
   * Maps characters to bytes.
   */
  charToByteMap_: null,
  /**
   * Maps bytes to websafe characters.
   * @private
   */
  byteToCharMapWebSafe_: null,
  /**
   * Maps websafe characters to bytes.
   * @private
   */
  charToByteMapWebSafe_: null,
  /**
   * Our default alphabet, shared between
   * ENCODED_VALS and ENCODED_VALS_WEBSAFE
   */
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  /**
   * Our default alphabet. Value 64 (=) is special; it means "nothing."
   */
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  /**
   * Our websafe alphabet.
   */
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  /**
   * Whether this browser supports the atob and btoa functions. This extension
   * started at Mozilla but is now implemented by many browsers. We use the
   * ASSUME_* variables to avoid pulling in the full useragent detection library
   * but still allowing the standard per-browser compilations.
   *
   */
  HAS_NATIVE_SUPPORT: typeof atob == "function",
  /**
   * Base64-encode an array of bytes.
   *
   * @param input An array of bytes (numbers with
   *     value in [0, 255]) to encode.
   * @param webSafe Boolean indicating we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeByteArray(r, e) {
    if (!Array.isArray(r))
      throw Error("encodeByteArray takes an array as a parameter");
    this.init_();
    const t = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_, n = [];
    for (let s = 0; s < r.length; s += 3) {
      const i = r[s], o = s + 1 < r.length, B = o ? r[s + 1] : 0, u = s + 2 < r.length, c = u ? r[s + 2] : 0, C = i >> 2, f = (i & 3) << 4 | B >> 4;
      let m = (B & 15) << 2 | c >> 6, y = c & 63;
      u || (y = 64, o || (m = 64)), n.push(t[C], t[f], t[m], t[y]);
    }
    return n.join("");
  },
  /**
   * Base64-encode a string.
   *
   * @param input A string to encode.
   * @param webSafe If true, we should use the
   *     alternative alphabet.
   * @return The base64 encoded string.
   */
  encodeString(r, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? btoa(r) : this.encodeByteArray(Fc(r), e);
  },
  /**
   * Base64-decode a string.
   *
   * @param input to decode.
   * @param webSafe True if we should use the
   *     alternative alphabet.
   * @return string representing the decoded value.
   */
  decodeString(r, e) {
    return this.HAS_NATIVE_SUPPORT && !e ? atob(r) : Jd(this.decodeStringToByteArray(r, e));
  },
  /**
   * Base64-decode a string.
   *
   * In base-64 decoding, groups of four characters are converted into three
   * bytes.  If the encoder did not apply padding, the input length may not
   * be a multiple of 4.
   *
   * In this case, the last group will have fewer than 4 characters, and
   * padding will be inferred.  If the group has one or two characters, it decodes
   * to one byte.  If the group has three characters, it decodes to two bytes.
   *
   * @param input Input to decode.
   * @param webSafe True if we should use the web-safe alphabet.
   * @return bytes representing the decoded value.
   */
  decodeStringToByteArray(r, e) {
    this.init_();
    const t = e ? this.charToByteMapWebSafe_ : this.charToByteMap_, n = [];
    for (let s = 0; s < r.length; ) {
      const i = t[r.charAt(s++)], B = s < r.length ? t[r.charAt(s)] : 0;
      ++s;
      const c = s < r.length ? t[r.charAt(s)] : 64;
      ++s;
      const f = s < r.length ? t[r.charAt(s)] : 64;
      if (++s, i == null || B == null || c == null || f == null)
        throw new qd();
      const m = i << 2 | B >> 4;
      if (n.push(m), c !== 64) {
        const y = B << 4 & 240 | c >> 2;
        if (n.push(y), f !== 64) {
          const b = c << 6 & 192 | f;
          n.push(b);
        }
      }
    }
    return n;
  },
  /**
   * Lazy static initialization function. Called before
   * accessing any of the static map variables.
   * @private
   */
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
      for (let r = 0; r < this.ENCODED_VALS.length; r++)
        this.byteToCharMap_[r] = this.ENCODED_VALS.charAt(r), this.charToByteMap_[this.byteToCharMap_[r]] = r, this.byteToCharMapWebSafe_[r] = this.ENCODED_VALS_WEBSAFE.charAt(r), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]] = r, r >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)] = r, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)] = r);
    }
  }
};
class qd extends Error {
  constructor() {
    super(...arguments), this.name = "DecodeBase64StringError";
  }
}
const Kd = function(r) {
  const e = Fc(r);
  return Pc.encodeByteArray(e, !0);
}, ei = function(r) {
  return Kd(r).replace(/\./g, "");
}, Qd = function(r) {
  try {
    return Pc.decodeString(r, !0);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
function zd() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("Unable to locate global object.");
}
const $d = () => zd().__FIREBASE_DEFAULTS__, Yd = () => {
  if (typeof process > "u" || typeof process.env > "u")
    return;
  const r = process.env.__FIREBASE_DEFAULTS__;
  if (r)
    return JSON.parse(r);
}, Wd = () => {
  if (typeof document > "u")
    return;
  let r;
  try {
    r = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch {
    return;
  }
  const e = r && Qd(r[1]);
  return e && JSON.parse(e);
}, ma = () => {
  try {
    return jd() || $d() || Yd() || Wd();
  } catch (r) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);
    return;
  }
}, Xd = (r) => ma()?.emulatorHosts?.[r], Zd = (r) => {
  const e = Xd(r);
  if (!e)
    return;
  const t = e.lastIndexOf(":");
  if (t <= 0 || t + 1 === e.length)
    throw new Error(`Invalid host ${e} with no separate hostname and port!`);
  const n = parseInt(e.substring(t + 1), 10);
  return e[0] === "[" ? [e.substring(1, t - 1), n] : [e.substring(0, t), n];
}, Lc = () => ma()?.config;
class eg {
  constructor() {
    this.reject = () => {
    }, this.resolve = () => {
    }, this.promise = new Promise((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
  /**
   * Our API internals are not promisified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */
  wrapCallback(e) {
    return (t, n) => {
      t ? this.reject(t) : this.resolve(n), typeof e == "function" && (this.promise.catch(() => {
      }), e.length === 1 ? e(t) : e(t, n));
    };
  }
}
function tg(r, e) {
  if (r.uid)
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  const t = {
    alg: "none",
    type: "JWT"
  }, n = e || "demo-project", s = r.iat || 0, i = r.sub || r.user_id;
  if (!i)
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  const o = {
    // Set all required fields to decent defaults
    iss: `https://securetoken.google.com/${n}`,
    aud: n,
    iat: s,
    exp: s + 3600,
    auth_time: s,
    sub: i,
    user_id: i,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    },
    // Override with user options
    ...r
  };
  return [
    ei(JSON.stringify(t)),
    ei(JSON.stringify(o)),
    ""
  ].join(".");
}
function ng() {
  return typeof navigator < "u" && typeof navigator.userAgent == "string" ? navigator.userAgent : "";
}
function rg() {
  const r = ma()?.forceEnvironment;
  if (r === "node")
    return !0;
  if (r === "browser")
    return !1;
  try {
    return Object.prototype.toString.call(global.process) === "[object process]";
  } catch {
    return !1;
  }
}
function sg() {
  return !rg() && !!navigator.userAgent && navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
}
function ig() {
  try {
    return typeof indexedDB == "object";
  } catch {
    return !1;
  }
}
function og() {
  return new Promise((r, e) => {
    try {
      let t = !0;
      const n = "validate-browser-context-for-indexeddb-analytics-module", s = self.indexedDB.open(n);
      s.onsuccess = () => {
        s.result.close(), t || self.indexedDB.deleteDatabase(n), r(!0);
      }, s.onupgradeneeded = () => {
        t = !1;
      }, s.onerror = () => {
        e(s.error?.message || "");
      };
    } catch (t) {
      e(t);
    }
  });
}
const ag = "FirebaseError";
class rr extends Error {
  constructor(e, t, n) {
    super(t), this.code = e, this.customData = n, this.name = ag, Object.setPrototypeOf(this, rr.prototype), Error.captureStackTrace && Error.captureStackTrace(this, xc.prototype.create);
  }
}
class xc {
  constructor(e, t, n) {
    this.service = e, this.serviceName = t, this.errors = n;
  }
  create(e, ...t) {
    const n = t[0] || {}, s = `${this.service}/${e}`, i = this.errors[e], o = i ? Bg(i, n) : "Error", B = `${this.serviceName}: ${o} (${s}).`;
    return new rr(s, B, n);
  }
}
function Bg(r, e) {
  try {
    let t = 0, n = "";
    for (; t < r.length; ) {
      const s = r.indexOf("{$", t);
      if (s === -1) {
        n += r.substring(t);
        break;
      }
      const i = r.indexOf("}", s + 2);
      if (i === -1) {
        n += r.substring(t);
        break;
      }
      const o = r.substring(s + 2, i), B = e[o];
      n += r.substring(t, s) + (B != null ? String(B) : `<${o}?>`), t = i + 1;
    }
    return n;
  } catch {
    return r;
  }
}
function ti(r, e) {
  if (r === e)
    return !0;
  const t = Object.keys(r), n = Object.keys(e);
  for (const s of t) {
    if (!n.includes(s))
      return !1;
    const i = r[s], o = e[s];
    if (Vu(i) && Vu(o)) {
      if (!ti(i, o))
        return !1;
    } else if (i !== o)
      return !1;
  }
  for (const s of n)
    if (!t.includes(s))
      return !1;
  return !0;
}
function Vu(r) {
  return r !== null && typeof r == "object";
}
function zn(r) {
  return r && r._delegate ? r._delegate : r;
}
function Vc(r) {
  try {
    return (r.startsWith("http://") || r.startsWith("https://") ? new URL(r).hostname : r).endsWith(".cloudworkstations.dev");
  } catch {
    return !1;
  }
}
async function ug(r) {
  return (await fetch(r, {
    credentials: "include"
  })).ok;
}
class zr {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  constructor(e, t, n) {
    this.name = e, this.instanceFactory = t, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null;
  }
  setInstantiationMode(e) {
    return this.instantiationMode = e, this;
  }
  setMultipleInstances(e) {
    return this.multipleInstances = e, this;
  }
  setServiceProps(e) {
    return this.serviceProps = e, this;
  }
  setInstanceCreatedCallback(e) {
    return this.onInstanceCreated = e, this;
  }
}
const dn = "[DEFAULT]";
class lg {
  constructor(e, t) {
    this.name = e, this.container = t, this.component = null, this.instances = /* @__PURE__ */ new Map(), this.instancesDeferred = /* @__PURE__ */ new Map(), this.instancesOptions = /* @__PURE__ */ new Map(), this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * @param identifier A provider can provide multiple instances of a service
   * if this.component.multipleInstances is true.
   */
  get(e) {
    const t = this.normalizeInstanceIdentifier(e);
    if (!this.instancesDeferred.has(t)) {
      const n = new eg();
      if (this.instancesDeferred.set(t, n), this.isInitialized(t) || this.shouldAutoInitialize())
        try {
          const s = this.getOrInitializeService({
            instanceIdentifier: t
          });
          s && n.resolve(s);
        } catch {
        }
    }
    return this.instancesDeferred.get(t).promise;
  }
  getImmediate(e) {
    const t = this.normalizeInstanceIdentifier(e?.identifier), n = e?.optional ?? !1;
    if (this.isInitialized(t) || this.shouldAutoInitialize())
      try {
        return this.getOrInitializeService({
          instanceIdentifier: t
        });
      } catch (s) {
        if (n)
          return null;
        throw s;
      }
    else {
      if (n)
        return null;
      throw Error(`Service ${this.name} is not available`);
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(e) {
    if (e.name !== this.name)
      throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);
    if (this.component)
      throw Error(`Component for ${this.name} has already been provided`);
    if (this.component = e, !!this.shouldAutoInitialize()) {
      if (hg(e))
        try {
          this.getOrInitializeService({ instanceIdentifier: dn });
        } catch {
        }
      for (const [t, n] of this.instancesDeferred.entries()) {
        const s = this.normalizeInstanceIdentifier(t);
        try {
          const i = this.getOrInitializeService({
            instanceIdentifier: s
          });
          n.resolve(i);
        } catch {
        }
      }
    }
  }
  clearInstance(e = dn) {
    this.instancesDeferred.delete(e), this.instancesOptions.delete(e), this.instances.delete(e);
  }
  // app.delete() will call this method on every provider to delete the services
  // TODO: should we mark the provider as deleted?
  async delete() {
    const e = Array.from(this.instances.values());
    await Promise.all([
      ...e.filter((t) => "INTERNAL" in t).map((t) => t.INTERNAL.delete()),
      ...e.filter((t) => "_delete" in t).map((t) => t._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(e = dn) {
    return this.instances.has(e);
  }
  getOptions(e = dn) {
    return this.instancesOptions.get(e) || {};
  }
  initialize(e = {}) {
    const { options: t = {} } = e, n = this.normalizeInstanceIdentifier(e.instanceIdentifier);
    if (this.isInitialized(n))
      throw Error(`${this.name}(${n}) has already been initialized`);
    if (!this.isComponentSet())
      throw Error(`Component ${this.name} has not been registered yet`);
    const s = this.getOrInitializeService({
      instanceIdentifier: n,
      options: t
    });
    for (const [i, o] of this.instancesDeferred.entries()) {
      const B = this.normalizeInstanceIdentifier(i);
      n === B && o.resolve(s);
    }
    return s;
  }
  /**
   *
   * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
   * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
   *
   * @param identifier An optional instance identifier
   * @returns a function to unregister the callback
   */
  onInit(e, t) {
    const n = this.normalizeInstanceIdentifier(t), s = this.onInitCallbacks.get(n) ?? /* @__PURE__ */ new Set();
    s.add(e), this.onInitCallbacks.set(n, s);
    const i = this.instances.get(n);
    return i && e(i, n), () => {
      s.delete(e);
    };
  }
  /**
   * Invoke onInit callbacks synchronously
   * @param instance the service instance`
   */
  invokeOnInitCallbacks(e, t) {
    const n = this.onInitCallbacks.get(t);
    if (n)
      for (const s of n)
        try {
          s(e, t);
        } catch {
        }
  }
  getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
    let n = this.instances.get(e);
    if (!n && this.component && (n = this.component.instanceFactory(this.container, {
      instanceIdentifier: cg(e),
      options: t
    }), this.instances.set(e, n), this.instancesOptions.set(e, t), this.invokeOnInitCallbacks(n, e), this.component.onInstanceCreated))
      try {
        this.component.onInstanceCreated(this.container, e, n);
      } catch {
      }
    return n || null;
  }
  normalizeInstanceIdentifier(e = dn) {
    return this.component ? this.component.multipleInstances ? e : dn : e;
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function cg(r) {
  return r === dn ? void 0 : r;
}
function hg(r) {
  return r.instantiationMode === "EAGER";
}
class Cg {
  constructor(e) {
    this.name = e, this.providers = /* @__PURE__ */ new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */
  addComponent(e) {
    const t = this.getProvider(e.name);
    if (t.isComponentSet())
      throw new Error(`Component ${e.name} has already been registered with ${this.name}`);
    t.setComponent(e);
  }
  addOrOverwriteComponent(e) {
    this.getProvider(e.name).isComponentSet() && this.providers.delete(e.name), this.addComponent(e);
  }
  /**
   * getProvider provides a type safe interface where it can only be called with a field name
   * present in NameServiceMapping interface.
   *
   * Firebase SDKs providing services should extend NameServiceMapping interface to register
   * themselves.
   */
  getProvider(e) {
    if (this.providers.has(e))
      return this.providers.get(e);
    const t = new lg(e, this);
    return this.providers.set(e, t), t;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
var ie;
(function(r) {
  r[r.DEBUG = 0] = "DEBUG", r[r.VERBOSE = 1] = "VERBOSE", r[r.INFO = 2] = "INFO", r[r.WARN = 3] = "WARN", r[r.ERROR = 4] = "ERROR", r[r.SILENT = 5] = "SILENT";
})(ie || (ie = {}));
const fg = {
  debug: ie.DEBUG,
  verbose: ie.VERBOSE,
  info: ie.INFO,
  warn: ie.WARN,
  error: ie.ERROR,
  silent: ie.SILENT
}, dg = ie.INFO, gg = {
  [ie.DEBUG]: "log",
  [ie.VERBOSE]: "log",
  [ie.INFO]: "info",
  [ie.WARN]: "warn",
  [ie.ERROR]: "error"
}, pg = (r, e, ...t) => {
  if (e < r.logLevel)
    return;
  const n = (/* @__PURE__ */ new Date()).toISOString(), s = gg[e];
  if (s)
    console[s](`[${n}]  ${r.name}:`, ...t);
  else
    throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
};
class Mc {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  constructor(e) {
    this.name = e, this._logLevel = dg, this._logHandler = pg, this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(e) {
    if (!(e in ie))
      throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
    this._logLevel = e;
  }
  // Workaround for setter/getter having to be the same type.
  setLogLevel(e) {
    this._logLevel = typeof e == "string" ? fg[e] : e;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(e) {
    if (typeof e != "function")
      throw new TypeError("Value assigned to `logHandler` must be a function");
    this._logHandler = e;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(e) {
    this._userLogHandler = e;
  }
  /**
   * The functions below are all based on the `console` interface
   */
  debug(...e) {
    this._userLogHandler && this._userLogHandler(this, ie.DEBUG, ...e), this._logHandler(this, ie.DEBUG, ...e);
  }
  log(...e) {
    this._userLogHandler && this._userLogHandler(this, ie.VERBOSE, ...e), this._logHandler(this, ie.VERBOSE, ...e);
  }
  info(...e) {
    this._userLogHandler && this._userLogHandler(this, ie.INFO, ...e), this._logHandler(this, ie.INFO, ...e);
  }
  warn(...e) {
    this._userLogHandler && this._userLogHandler(this, ie.WARN, ...e), this._logHandler(this, ie.WARN, ...e);
  }
  error(...e) {
    this._userLogHandler && this._userLogHandler(this, ie.ERROR, ...e), this._logHandler(this, ie.ERROR, ...e);
  }
}
const mg = (r, e) => e.some((t) => r instanceof t);
let Mu, Gu;
function Eg() {
  return Mu || (Mu = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function Dg() {
  return Gu || (Gu = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const Gc = /* @__PURE__ */ new WeakMap(), Ho = /* @__PURE__ */ new WeakMap(), kc = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), Ea = /* @__PURE__ */ new WeakMap();
function _g(r) {
  const e = new Promise((t, n) => {
    const s = () => {
      r.removeEventListener("success", i), r.removeEventListener("error", o);
    }, i = () => {
      t(zt(r.result)), s();
    }, o = () => {
      n(r.error), s();
    };
    r.addEventListener("success", i), r.addEventListener("error", o);
  });
  return e.then((t) => {
    t instanceof IDBCursor && Gc.set(t, r);
  }).catch(() => {
  }), Ea.set(e, r), e;
}
function yg(r) {
  if (Ho.has(r))
    return;
  const e = new Promise((t, n) => {
    const s = () => {
      r.removeEventListener("complete", i), r.removeEventListener("error", o), r.removeEventListener("abort", o);
    }, i = () => {
      t(), s();
    }, o = () => {
      n(r.error || new DOMException("AbortError", "AbortError")), s();
    };
    r.addEventListener("complete", i), r.addEventListener("error", o), r.addEventListener("abort", o);
  });
  Ho.set(r, e);
}
let Uo = {
  get(r, e, t) {
    if (r instanceof IDBTransaction) {
      if (e === "done")
        return Ho.get(r);
      if (e === "objectStoreNames")
        return r.objectStoreNames || kc.get(r);
      if (e === "store")
        return t.objectStoreNames[1] ? void 0 : t.objectStore(t.objectStoreNames[0]);
    }
    return zt(r[e]);
  },
  set(r, e, t) {
    return r[e] = t, !0;
  },
  has(r, e) {
    return r instanceof IDBTransaction && (e === "done" || e === "store") ? !0 : e in r;
  }
};
function Ig(r) {
  Uo = r(Uo);
}
function wg(r) {
  return r === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype) ? function(e, ...t) {
    const n = r.call(go(this), e, ...t);
    return kc.set(n, e.sort ? e.sort() : [e]), zt(n);
  } : Dg().includes(r) ? function(...e) {
    return r.apply(go(this), e), zt(Gc.get(this));
  } : function(...e) {
    return zt(r.apply(go(this), e));
  };
}
function Tg(r) {
  return typeof r == "function" ? wg(r) : (r instanceof IDBTransaction && yg(r), mg(r, Eg()) ? new Proxy(r, Uo) : r);
}
function zt(r) {
  if (r instanceof IDBRequest)
    return _g(r);
  if (fo.has(r))
    return fo.get(r);
  const e = Tg(r);
  return e !== r && (fo.set(r, e), Ea.set(e, r)), e;
}
const go = (r) => Ea.get(r);
function Ag(r, e, { blocked: t, upgrade: n, blocking: s, terminated: i } = {}) {
  const o = indexedDB.open(r, e), B = zt(o);
  return n && o.addEventListener("upgradeneeded", (u) => {
    n(zt(o.result), u.oldVersion, u.newVersion, zt(o.transaction), u);
  }), t && o.addEventListener("blocked", (u) => t(
    // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
    u.oldVersion,
    u.newVersion,
    u
  )), B.then((u) => {
    i && u.addEventListener("close", () => i()), s && u.addEventListener("versionchange", (c) => s(c.oldVersion, c.newVersion, c));
  }).catch(() => {
  }), B;
}
const vg = ["get", "getKey", "getAll", "getAllKeys", "count"], Rg = ["put", "add", "delete", "clear"], po = /* @__PURE__ */ new Map();
function ku(r, e) {
  if (!(r instanceof IDBDatabase && !(e in r) && typeof e == "string"))
    return;
  if (po.get(e))
    return po.get(e);
  const t = e.replace(/FromIndex$/, ""), n = e !== t, s = Rg.includes(t);
  if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(t in (n ? IDBIndex : IDBObjectStore).prototype) || !(s || vg.includes(t))
  )
    return;
  const i = async function(o, ...B) {
    const u = this.transaction(o, s ? "readwrite" : "readonly");
    let c = u.store;
    return n && (c = c.index(B.shift())), (await Promise.all([
      c[t](...B),
      s && u.done
    ]))[0];
  };
  return po.set(e, i), i;
}
Ig((r) => ({
  ...r,
  get: (e, t, n) => ku(e, t) || r.get(e, t, n),
  has: (e, t) => !!ku(e, t) || r.has(e, t)
}));
class bg {
  constructor(e) {
    this.container = e;
  }
  // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.
  getPlatformInfoString() {
    return this.container.getProviders().map((t) => {
      if (Og(t)) {
        const n = t.getImmediate();
        return `${n.library}/${n.version}`;
      } else
        return null;
    }).filter((t) => t).join(" ");
  }
}
function Og(r) {
  return r.getComponent()?.type === "VERSION";
}
const jo = "@firebase/app", Hu = "0.16.2";
const St = new Mc("@firebase/app"), Sg = "@firebase/app-compat", Ng = "@firebase/analytics-compat", Fg = "@firebase/analytics", Pg = "@firebase/app-check-compat", Lg = "@firebase/app-check", xg = "@firebase/auth", Vg = "@firebase/auth-compat", Mg = "@firebase/database", Gg = "@firebase/data-connect", kg = "@firebase/database-compat", Hg = "@firebase/functions", Ug = "@firebase/functions-compat", jg = "@firebase/installations", Jg = "@firebase/installations-compat", qg = "@firebase/messaging", Kg = "@firebase/messaging-compat", Qg = "@firebase/performance", zg = "@firebase/performance-compat", $g = "@firebase/remote-config", Yg = "@firebase/remote-config-compat", Wg = "@firebase/storage", Xg = "@firebase/storage-compat", Zg = "@firebase/firestore", ep = "@firebase/ai", tp = "@firebase/firestore-compat", np = "firebase", rp = "12.19.0";
const Jo = "[DEFAULT]", sp = {
  [jo]: "fire-core",
  [Sg]: "fire-core-compat",
  [Fg]: "fire-analytics",
  [Ng]: "fire-analytics-compat",
  [Lg]: "fire-app-check",
  [Pg]: "fire-app-check-compat",
  [xg]: "fire-auth",
  [Vg]: "fire-auth-compat",
  [Mg]: "fire-rtdb",
  [Gg]: "fire-data-connect",
  [kg]: "fire-rtdb-compat",
  [Hg]: "fire-fn",
  [Ug]: "fire-fn-compat",
  [jg]: "fire-iid",
  [Jg]: "fire-iid-compat",
  [qg]: "fire-fcm",
  [Kg]: "fire-fcm-compat",
  [Qg]: "fire-perf",
  [zg]: "fire-perf-compat",
  [$g]: "fire-rc",
  [Yg]: "fire-rc-compat",
  [Wg]: "fire-gcs",
  [Xg]: "fire-gcs-compat",
  [Zg]: "fire-fst",
  [tp]: "fire-fst-compat",
  [ep]: "fire-vertex",
  "fire-js": "fire-js",
  // Platform identifier for JS SDK.
  [np]: "fire-js-all"
};
const ni = /* @__PURE__ */ new Map(), ip = /* @__PURE__ */ new Map(), qo = /* @__PURE__ */ new Map();
function Uu(r, e) {
  try {
    r.container.addComponent(e);
  } catch (t) {
    St.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`, t);
  }
}
function ri(r) {
  const e = r.name;
  if (qo.has(e))
    return St.debug(`There were multiple attempts to register component ${e}.`), !1;
  qo.set(e, r);
  for (const t of ni.values())
    Uu(t, r);
  for (const t of ip.values())
    Uu(t, r);
  return !0;
}
function op(r, e) {
  const t = r.container.getProvider("heartbeat").getImmediate({ optional: !0 });
  return t && t.triggerHeartbeat(), r.container.getProvider(e);
}
function ap(r) {
  return r == null ? !1 : r.settings !== void 0;
}
const Bp = {
  "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
  "bad-app-name": "Illegal App name: '{$appName}'",
  "duplicate-app": "Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.",
  "app-deleted": "Firebase App named '{$appName}' already deleted",
  "server-app-deleted": "Firebase Server App has been deleted",
  "no-options": "Need to provide options, when not being deployed to hosting via source.",
  "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  "invalid-log-argument": "First argument to `onLog` must be null or a function.",
  "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
  "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
  "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
}, vt = new xc("app", "Firebase", Bp);
class up {
  constructor(e, t, n) {
    this._isDeleted = !1, this._options = { ...e }, this._config = { ...t }, this._name = t.name, this._automaticDataCollectionEnabled = t.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new zr(
      "app",
      () => this,
      "PUBLIC"
      /* ComponentType.PUBLIC */
    ));
  }
  get automaticDataCollectionEnabled() {
    return this.checkDestroyed(), this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(e) {
    this.checkDestroyed(), this._automaticDataCollectionEnabled = e;
  }
  get name() {
    return this.checkDestroyed(), this._name;
  }
  get options() {
    return this.checkDestroyed(), this._options;
  }
  get config() {
    return this.checkDestroyed(), this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(e) {
    this._isDeleted = e;
  }
  /**
   * This function will throw an Error if the App has already been deleted -
   * use before performing API actions on the App.
   */
  checkDestroyed() {
    if (this.isDeleted)
      throw vt.create("app-deleted", { appName: this._name });
  }
}
const lp = rp;
function Hc(r, e = {}) {
  let t = r;
  typeof e != "object" && (e = { name: e });
  const n = {
    name: Jo,
    automaticDataCollectionEnabled: !0,
    ...e
  }, s = n.name;
  if (typeof s != "string" || !s)
    throw vt.create("bad-app-name", {
      appName: String(s)
    });
  if (t || (t = Lc()), !t)
    throw vt.create(
      "no-options"
      /* AppError.NO_OPTIONS */
    );
  const i = ni.get(s);
  if (i)
    if (ti(t, i.options)) {
      if (ti(n, i.config))
        return i;
      throw vt.create("duplicate-app", {
        appName: s,
        mismatchedParam: "config",
        oldValue: JSON.stringify(i.config),
        newValue: JSON.stringify(n)
      });
    } else throw vt.create("duplicate-app", {
      appName: s,
      mismatchedParam: "options",
      oldValue: JSON.stringify(i.options),
      newValue: JSON.stringify(t)
    });
  const o = new Cg(s);
  for (const u of qo.values())
    o.addComponent(u);
  const B = new up(t, n, o);
  return ni.set(s, B), B;
}
function cp(r = Jo) {
  const e = ni.get(r);
  if (!e && r === Jo && Lc())
    return Hc();
  if (!e)
    throw vt.create("no-app", { appName: r });
  return e;
}
function jn(r, e, t) {
  let n = sp[r] ?? r;
  t && (n += `-${t}`);
  const s = n.match(/\s|\//), i = e.match(/\s|\//);
  if (s || i) {
    const o = [
      `Unable to register library "${n}" with version "${e}":`
    ];
    s && o.push(`library name "${n}" contains illegal characters (whitespace or "/")`), s && i && o.push("and"), i && o.push(`version name "${e}" contains illegal characters (whitespace or "/")`), St.warn(o.join(" "));
    return;
  }
  ri(new zr(
    `${n}-version`,
    () => ({ library: n, version: e }),
    "VERSION"
    /* ComponentType.VERSION */
  ));
}
const hp = "firebase-heartbeat-database", Cp = 1, $r = "firebase-heartbeat-store";
let mo = null;
function Uc() {
  return mo || (mo = Ag(hp, Cp, {
    upgrade: (r, e) => {
      switch (e) {
        case 0:
          try {
            r.createObjectStore($r);
          } catch (t) {
            console.warn(t);
          }
      }
    }
  }).catch((r) => {
    throw vt.create("idb-open", {
      originalErrorMessage: r.message
    });
  })), mo;
}
async function fp(r) {
  try {
    const t = (await Uc()).transaction($r), n = await t.objectStore($r).get(jc(r));
    return await t.done, n;
  } catch (e) {
    if (e instanceof rr)
      St.warn(e.message);
    else {
      const t = vt.create("idb-get", {
        originalErrorMessage: e?.message
      });
      St.warn(t.message);
    }
  }
}
async function ju(r, e) {
  try {
    const n = (await Uc()).transaction($r, "readwrite");
    await n.objectStore($r).put(e, jc(r)), await n.done;
  } catch (t) {
    if (t instanceof rr)
      St.warn(t.message);
    else {
      const n = vt.create("idb-set", {
        originalErrorMessage: t?.message
      });
      St.warn(n.message);
    }
  }
}
function jc(r) {
  return `${r.name}!${r.options.appId}`;
}
const dp = 1024, gp = 30;
class pp {
  constructor(e) {
    this.container = e, this._heartbeatsCache = null;
    const t = this.container.getProvider("app").getImmediate();
    this._storage = new Ep(t), this._heartbeatsCachePromise = this._storage.read().then((n) => (this._heartbeatsCache = n, n));
  }
  /**
   * Called to report a heartbeat. The function will generate
   * a HeartbeatsByUserAgent object, update heartbeatsCache, and persist it
   * to IndexedDB.
   * Note that we only store one heartbeat per day. So if a heartbeat for today is
   * already logged, subsequent calls to this function in the same day will be ignored.
   */
  async triggerHeartbeat() {
    try {
      const t = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(), n = Ju();
      if (this._heartbeatsCache?.heartbeats == null && (this._heartbeatsCache = await this._heartbeatsCachePromise, this._heartbeatsCache?.heartbeats == null) || this._heartbeatsCache.lastSentHeartbeatDate === n || this._heartbeatsCache.heartbeats.some((s) => s.date === n))
        return;
      if (this._heartbeatsCache.heartbeats.push({ date: n, agent: t }), this._heartbeatsCache.heartbeats.length > gp) {
        const s = Dp(this._heartbeatsCache.heartbeats);
        this._heartbeatsCache.heartbeats.splice(s, 1);
      }
      return this._storage.overwrite(this._heartbeatsCache);
    } catch (e) {
      St.warn(e);
    }
  }
  /**
   * Returns a base64 encoded string which can be attached to the heartbeat-specific header directly.
   * It also clears all heartbeats from memory as well as in IndexedDB.
   *
   * NOTE: Consuming product SDKs should not send the header if this method
   * returns an empty string.
   */
  async getHeartbeatsHeader() {
    try {
      if (this._heartbeatsCache === null && await this._heartbeatsCachePromise, this._heartbeatsCache?.heartbeats == null || this._heartbeatsCache.heartbeats.length === 0)
        return "";
      const e = Ju(), { heartbeatsToSend: t, unsentEntries: n } = mp(this._heartbeatsCache.heartbeats), s = ei(JSON.stringify({ version: 2, heartbeats: t }));
      return this._heartbeatsCache.lastSentHeartbeatDate = e, n.length > 0 ? (this._heartbeatsCache.heartbeats = n, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), s;
    } catch (e) {
      return St.warn(e), "";
    }
  }
}
function Ju() {
  return (/* @__PURE__ */ new Date()).toISOString().substring(0, 10);
}
function mp(r, e = dp) {
  const t = [];
  let n = r.slice();
  for (const s of r) {
    const i = t.find((o) => o.agent === s.agent);
    if (i) {
      if (i.dates.push(s.date), qu(t) > e) {
        i.dates.pop();
        break;
      }
    } else if (t.push({
      agent: s.agent,
      dates: [s.date]
    }), qu(t) > e) {
      t.pop();
      break;
    }
    n = n.slice(1);
  }
  return {
    heartbeatsToSend: t,
    unsentEntries: n
  };
}
class Ep {
  constructor(e) {
    this.app = e, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    return ig() ? og().then(() => !0).catch(() => !1) : !1;
  }
  /**
   * Read all heartbeats.
   */
  async read() {
    if (await this._canUseIndexedDBPromise) {
      const t = await fp(this.app);
      return t?.heartbeats ? t : { heartbeats: [] };
    } else
      return { heartbeats: [] };
  }
  // overwrite the storage with the provided heartbeats
  async overwrite(e) {
    if (await this._canUseIndexedDBPromise) {
      const n = await this.read();
      return ju(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? n.lastSentHeartbeatDate,
        heartbeats: e.heartbeats
      });
    } else
      return;
  }
  // add heartbeats
  async add(e) {
    if (await this._canUseIndexedDBPromise) {
      const n = await this.read();
      return ju(this.app, {
        lastSentHeartbeatDate: e.lastSentHeartbeatDate ?? n.lastSentHeartbeatDate,
        heartbeats: [
          ...n.heartbeats,
          ...e.heartbeats
        ]
      });
    } else
      return;
  }
}
function qu(r) {
  return ei(
    // heartbeatsCache wrapper properties
    JSON.stringify({ version: 2, heartbeats: r })
  ).length;
}
function Dp(r) {
  if (r.length === 0)
    return -1;
  let e = 0, t = r[0].date;
  for (let n = 1; n < r.length; n++)
    r[n].date < t && (t = r[n].date, e = n);
  return e;
}
function _p(r) {
  ri(new zr(
    "platform-logger",
    (e) => new bg(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), ri(new zr(
    "heartbeat",
    (e) => new pp(e),
    "PRIVATE"
    /* ComponentType.PRIVATE */
  )), jn(jo, Hu, r), jn(jo, Hu, "esm2020"), jn("fire-js", "");
}
_p("");
var Ku = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var $t, Jc;
(function() {
  var r;
  function e(A, E) {
    function _() {
    }
    _.prototype = E.prototype, A.F = E.prototype, A.prototype = new _(), A.prototype.constructor = A, A.D = function(v, T, O) {
      for (var D = Array(arguments.length - 2), Qe = 2; Qe < arguments.length; Qe++) D[Qe - 2] = arguments[Qe];
      return E.prototype[T].apply(v, D);
    };
  }
  function t() {
    this.blockSize = -1;
  }
  function n() {
    this.blockSize = -1, this.blockSize = 64, this.g = Array(4), this.C = Array(this.blockSize), this.o = this.h = 0, this.u();
  }
  e(n, t), n.prototype.u = function() {
    this.g[0] = 1732584193, this.g[1] = 4023233417, this.g[2] = 2562383102, this.g[3] = 271733878, this.o = this.h = 0;
  };
  function s(A, E, _) {
    _ || (_ = 0);
    const v = Array(16);
    if (typeof E == "string") for (var T = 0; T < 16; ++T) v[T] = E.charCodeAt(_++) | E.charCodeAt(_++) << 8 | E.charCodeAt(_++) << 16 | E.charCodeAt(_++) << 24;
    else for (T = 0; T < 16; ++T) v[T] = E[_++] | E[_++] << 8 | E[_++] << 16 | E[_++] << 24;
    E = A.g[0], _ = A.g[1], T = A.g[2];
    let O = A.g[3], D;
    D = E + (O ^ _ & (T ^ O)) + v[0] + 3614090360 & 4294967295, E = _ + (D << 7 & 4294967295 | D >>> 25), D = O + (T ^ E & (_ ^ T)) + v[1] + 3905402710 & 4294967295, O = E + (D << 12 & 4294967295 | D >>> 20), D = T + (_ ^ O & (E ^ _)) + v[2] + 606105819 & 4294967295, T = O + (D << 17 & 4294967295 | D >>> 15), D = _ + (E ^ T & (O ^ E)) + v[3] + 3250441966 & 4294967295, _ = T + (D << 22 & 4294967295 | D >>> 10), D = E + (O ^ _ & (T ^ O)) + v[4] + 4118548399 & 4294967295, E = _ + (D << 7 & 4294967295 | D >>> 25), D = O + (T ^ E & (_ ^ T)) + v[5] + 1200080426 & 4294967295, O = E + (D << 12 & 4294967295 | D >>> 20), D = T + (_ ^ O & (E ^ _)) + v[6] + 2821735955 & 4294967295, T = O + (D << 17 & 4294967295 | D >>> 15), D = _ + (E ^ T & (O ^ E)) + v[7] + 4249261313 & 4294967295, _ = T + (D << 22 & 4294967295 | D >>> 10), D = E + (O ^ _ & (T ^ O)) + v[8] + 1770035416 & 4294967295, E = _ + (D << 7 & 4294967295 | D >>> 25), D = O + (T ^ E & (_ ^ T)) + v[9] + 2336552879 & 4294967295, O = E + (D << 12 & 4294967295 | D >>> 20), D = T + (_ ^ O & (E ^ _)) + v[10] + 4294925233 & 4294967295, T = O + (D << 17 & 4294967295 | D >>> 15), D = _ + (E ^ T & (O ^ E)) + v[11] + 2304563134 & 4294967295, _ = T + (D << 22 & 4294967295 | D >>> 10), D = E + (O ^ _ & (T ^ O)) + v[12] + 1804603682 & 4294967295, E = _ + (D << 7 & 4294967295 | D >>> 25), D = O + (T ^ E & (_ ^ T)) + v[13] + 4254626195 & 4294967295, O = E + (D << 12 & 4294967295 | D >>> 20), D = T + (_ ^ O & (E ^ _)) + v[14] + 2792965006 & 4294967295, T = O + (D << 17 & 4294967295 | D >>> 15), D = _ + (E ^ T & (O ^ E)) + v[15] + 1236535329 & 4294967295, _ = T + (D << 22 & 4294967295 | D >>> 10), D = E + (T ^ O & (_ ^ T)) + v[1] + 4129170786 & 4294967295, E = _ + (D << 5 & 4294967295 | D >>> 27), D = O + (_ ^ T & (E ^ _)) + v[6] + 3225465664 & 4294967295, O = E + (D << 9 & 4294967295 | D >>> 23), D = T + (E ^ _ & (O ^ E)) + v[11] + 643717713 & 4294967295, T = O + (D << 14 & 4294967295 | D >>> 18), D = _ + (O ^ E & (T ^ O)) + v[0] + 3921069994 & 4294967295, _ = T + (D << 20 & 4294967295 | D >>> 12), D = E + (T ^ O & (_ ^ T)) + v[5] + 3593408605 & 4294967295, E = _ + (D << 5 & 4294967295 | D >>> 27), D = O + (_ ^ T & (E ^ _)) + v[10] + 38016083 & 4294967295, O = E + (D << 9 & 4294967295 | D >>> 23), D = T + (E ^ _ & (O ^ E)) + v[15] + 3634488961 & 4294967295, T = O + (D << 14 & 4294967295 | D >>> 18), D = _ + (O ^ E & (T ^ O)) + v[4] + 3889429448 & 4294967295, _ = T + (D << 20 & 4294967295 | D >>> 12), D = E + (T ^ O & (_ ^ T)) + v[9] + 568446438 & 4294967295, E = _ + (D << 5 & 4294967295 | D >>> 27), D = O + (_ ^ T & (E ^ _)) + v[14] + 3275163606 & 4294967295, O = E + (D << 9 & 4294967295 | D >>> 23), D = T + (E ^ _ & (O ^ E)) + v[3] + 4107603335 & 4294967295, T = O + (D << 14 & 4294967295 | D >>> 18), D = _ + (O ^ E & (T ^ O)) + v[8] + 1163531501 & 4294967295, _ = T + (D << 20 & 4294967295 | D >>> 12), D = E + (T ^ O & (_ ^ T)) + v[13] + 2850285829 & 4294967295, E = _ + (D << 5 & 4294967295 | D >>> 27), D = O + (_ ^ T & (E ^ _)) + v[2] + 4243563512 & 4294967295, O = E + (D << 9 & 4294967295 | D >>> 23), D = T + (E ^ _ & (O ^ E)) + v[7] + 1735328473 & 4294967295, T = O + (D << 14 & 4294967295 | D >>> 18), D = _ + (O ^ E & (T ^ O)) + v[12] + 2368359562 & 4294967295, _ = T + (D << 20 & 4294967295 | D >>> 12), D = E + (_ ^ T ^ O) + v[5] + 4294588738 & 4294967295, E = _ + (D << 4 & 4294967295 | D >>> 28), D = O + (E ^ _ ^ T) + v[8] + 2272392833 & 4294967295, O = E + (D << 11 & 4294967295 | D >>> 21), D = T + (O ^ E ^ _) + v[11] + 1839030562 & 4294967295, T = O + (D << 16 & 4294967295 | D >>> 16), D = _ + (T ^ O ^ E) + v[14] + 4259657740 & 4294967295, _ = T + (D << 23 & 4294967295 | D >>> 9), D = E + (_ ^ T ^ O) + v[1] + 2763975236 & 4294967295, E = _ + (D << 4 & 4294967295 | D >>> 28), D = O + (E ^ _ ^ T) + v[4] + 1272893353 & 4294967295, O = E + (D << 11 & 4294967295 | D >>> 21), D = T + (O ^ E ^ _) + v[7] + 4139469664 & 4294967295, T = O + (D << 16 & 4294967295 | D >>> 16), D = _ + (T ^ O ^ E) + v[10] + 3200236656 & 4294967295, _ = T + (D << 23 & 4294967295 | D >>> 9), D = E + (_ ^ T ^ O) + v[13] + 681279174 & 4294967295, E = _ + (D << 4 & 4294967295 | D >>> 28), D = O + (E ^ _ ^ T) + v[0] + 3936430074 & 4294967295, O = E + (D << 11 & 4294967295 | D >>> 21), D = T + (O ^ E ^ _) + v[3] + 3572445317 & 4294967295, T = O + (D << 16 & 4294967295 | D >>> 16), D = _ + (T ^ O ^ E) + v[6] + 76029189 & 4294967295, _ = T + (D << 23 & 4294967295 | D >>> 9), D = E + (_ ^ T ^ O) + v[9] + 3654602809 & 4294967295, E = _ + (D << 4 & 4294967295 | D >>> 28), D = O + (E ^ _ ^ T) + v[12] + 3873151461 & 4294967295, O = E + (D << 11 & 4294967295 | D >>> 21), D = T + (O ^ E ^ _) + v[15] + 530742520 & 4294967295, T = O + (D << 16 & 4294967295 | D >>> 16), D = _ + (T ^ O ^ E) + v[2] + 3299628645 & 4294967295, _ = T + (D << 23 & 4294967295 | D >>> 9), D = E + (T ^ (_ | ~O)) + v[0] + 4096336452 & 4294967295, E = _ + (D << 6 & 4294967295 | D >>> 26), D = O + (_ ^ (E | ~T)) + v[7] + 1126891415 & 4294967295, O = E + (D << 10 & 4294967295 | D >>> 22), D = T + (E ^ (O | ~_)) + v[14] + 2878612391 & 4294967295, T = O + (D << 15 & 4294967295 | D >>> 17), D = _ + (O ^ (T | ~E)) + v[5] + 4237533241 & 4294967295, _ = T + (D << 21 & 4294967295 | D >>> 11), D = E + (T ^ (_ | ~O)) + v[12] + 1700485571 & 4294967295, E = _ + (D << 6 & 4294967295 | D >>> 26), D = O + (_ ^ (E | ~T)) + v[3] + 2399980690 & 4294967295, O = E + (D << 10 & 4294967295 | D >>> 22), D = T + (E ^ (O | ~_)) + v[10] + 4293915773 & 4294967295, T = O + (D << 15 & 4294967295 | D >>> 17), D = _ + (O ^ (T | ~E)) + v[1] + 2240044497 & 4294967295, _ = T + (D << 21 & 4294967295 | D >>> 11), D = E + (T ^ (_ | ~O)) + v[8] + 1873313359 & 4294967295, E = _ + (D << 6 & 4294967295 | D >>> 26), D = O + (_ ^ (E | ~T)) + v[15] + 4264355552 & 4294967295, O = E + (D << 10 & 4294967295 | D >>> 22), D = T + (E ^ (O | ~_)) + v[6] + 2734768916 & 4294967295, T = O + (D << 15 & 4294967295 | D >>> 17), D = _ + (O ^ (T | ~E)) + v[13] + 1309151649 & 4294967295, _ = T + (D << 21 & 4294967295 | D >>> 11), D = E + (T ^ (_ | ~O)) + v[4] + 4149444226 & 4294967295, E = _ + (D << 6 & 4294967295 | D >>> 26), D = O + (_ ^ (E | ~T)) + v[11] + 3174756917 & 4294967295, O = E + (D << 10 & 4294967295 | D >>> 22), D = T + (E ^ (O | ~_)) + v[2] + 718787259 & 4294967295, T = O + (D << 15 & 4294967295 | D >>> 17), D = _ + (O ^ (T | ~E)) + v[9] + 3951481745 & 4294967295, A.g[0] = A.g[0] + E & 4294967295, A.g[1] = A.g[1] + (T + (D << 21 & 4294967295 | D >>> 11)) & 4294967295, A.g[2] = A.g[2] + T & 4294967295, A.g[3] = A.g[3] + O & 4294967295;
  }
  n.prototype.v = function(A, E) {
    E === void 0 && (E = A.length);
    const _ = E - this.blockSize, v = this.C;
    let T = this.h, O = 0;
    for (; O < E; ) {
      if (T == 0) for (; O <= _; ) s(this, A, O), O += this.blockSize;
      if (typeof A == "string") {
        for (; O < E; )
          if (v[T++] = A.charCodeAt(O++), T == this.blockSize) {
            s(this, v), T = 0;
            break;
          }
      } else for (; O < E; ) if (v[T++] = A[O++], T == this.blockSize) {
        s(this, v), T = 0;
        break;
      }
    }
    this.h = T, this.o += E;
  }, n.prototype.A = function() {
    var A = Array((this.h < 56 ? this.blockSize : this.blockSize * 2) - this.h);
    A[0] = 128;
    for (var E = 1; E < A.length - 8; ++E) A[E] = 0;
    E = this.o * 8;
    for (var _ = A.length - 8; _ < A.length; ++_) A[_] = E & 255, E /= 256;
    for (this.v(A), A = Array(16), E = 0, _ = 0; _ < 4; ++_) for (let v = 0; v < 32; v += 8) A[E++] = this.g[_] >>> v & 255;
    return A;
  };
  function i(A, E) {
    var _ = B;
    return Object.prototype.hasOwnProperty.call(_, A) ? _[A] : _[A] = E(A);
  }
  function o(A, E) {
    this.h = E;
    const _ = [];
    let v = !0;
    for (let T = A.length - 1; T >= 0; T--) {
      const O = A[T] | 0;
      v && O == E || (_[T] = O, v = !1);
    }
    this.g = _;
  }
  var B = {};
  function u(A) {
    return -128 <= A && A < 128 ? i(A, function(E) {
      return new o([E | 0], E < 0 ? -1 : 0);
    }) : new o([A | 0], A < 0 ? -1 : 0);
  }
  function c(A) {
    if (isNaN(A) || !isFinite(A)) return f;
    if (A < 0) return j(c(-A));
    const E = [];
    let _ = 1;
    for (let v = 0; A >= _; v++) E[v] = A / _ | 0, _ *= 4294967296;
    return new o(E, 0);
  }
  function C(A, E) {
    if (A.length == 0) throw Error("number format error: empty string");
    if (E = E || 10, E < 2 || 36 < E) throw Error("radix out of range: " + E);
    if (A.charAt(0) == "-") return j(C(A.substring(1), E));
    if (A.indexOf("-") >= 0) throw Error('number format error: interior "-" character');
    const _ = c(Math.pow(E, 8));
    let v = f;
    for (let O = 0; O < A.length; O += 8) {
      var T = Math.min(8, A.length - O);
      const D = parseInt(A.substring(O, O + T), E);
      T < 8 ? (T = c(Math.pow(E, T)), v = v.j(T).add(c(D))) : (v = v.j(_), v = v.add(c(D)));
    }
    return v;
  }
  var f = u(0), m = u(1), y = u(16777216);
  r = o.prototype, r.m = function() {
    if (V(this)) return -j(this).m();
    let A = 0, E = 1;
    for (let _ = 0; _ < this.g.length; _++) {
      const v = this.i(_);
      A += (v >= 0 ? v : 4294967296 + v) * E, E *= 4294967296;
    }
    return A;
  }, r.toString = function(A) {
    if (A = A || 10, A < 2 || 36 < A) throw Error("radix out of range: " + A);
    if (b(this)) return "0";
    if (V(this)) return "-" + j(this).toString(A);
    const E = c(Math.pow(A, 6));
    var _ = this;
    let v = "";
    for (; ; ) {
      const T = De(_, E).g;
      _ = z(_, T.j(E));
      let O = ((_.g.length > 0 ? _.g[0] : _.h) >>> 0).toString(A);
      if (_ = T, b(_)) return O + v;
      for (; O.length < 6; ) O = "0" + O;
      v = O + v;
    }
  }, r.i = function(A) {
    return A < 0 ? 0 : A < this.g.length ? this.g[A] : this.h;
  };
  function b(A) {
    if (A.h != 0) return !1;
    for (let E = 0; E < A.g.length; E++) if (A.g[E] != 0) return !1;
    return !0;
  }
  function V(A) {
    return A.h == -1;
  }
  r.l = function(A) {
    return A = z(this, A), V(A) ? -1 : b(A) ? 0 : 1;
  };
  function j(A) {
    const E = A.g.length, _ = [];
    for (let v = 0; v < E; v++) _[v] = ~A.g[v];
    return new o(_, ~A.h).add(m);
  }
  r.abs = function() {
    return V(this) ? j(this) : this;
  }, r.add = function(A) {
    const E = Math.max(this.g.length, A.g.length), _ = [];
    let v = 0;
    for (let T = 0; T <= E; T++) {
      let O = v + (this.i(T) & 65535) + (A.i(T) & 65535), D = (O >>> 16) + (this.i(T) >>> 16) + (A.i(T) >>> 16);
      v = D >>> 16, O &= 65535, D &= 65535, _[T] = D << 16 | O;
    }
    return new o(_, _[_.length - 1] & -2147483648 ? -1 : 0);
  };
  function z(A, E) {
    return A.add(j(E));
  }
  r.j = function(A) {
    if (b(this) || b(A)) return f;
    if (V(this)) return V(A) ? j(this).j(j(A)) : j(j(this).j(A));
    if (V(A)) return j(this.j(j(A)));
    if (this.l(y) < 0 && A.l(y) < 0) return c(this.m() * A.m());
    const E = this.g.length + A.g.length, _ = [];
    for (var v = 0; v < 2 * E; v++) _[v] = 0;
    for (v = 0; v < this.g.length; v++) for (let T = 0; T < A.g.length; T++) {
      const O = this.i(v) >>> 16, D = this.i(v) & 65535, Qe = A.i(T) >>> 16, un = A.i(T) & 65535;
      _[2 * v + 2 * T] += D * un, ue(_, 2 * v + 2 * T), _[2 * v + 2 * T + 1] += O * un, ue(_, 2 * v + 2 * T + 1), _[2 * v + 2 * T + 1] += D * Qe, ue(_, 2 * v + 2 * T + 1), _[2 * v + 2 * T + 2] += O * Qe, ue(_, 2 * v + 2 * T + 2);
    }
    for (A = 0; A < E; A++) _[A] = _[2 * A + 1] << 16 | _[2 * A];
    for (A = E; A < 2 * E; A++) _[A] = 0;
    return new o(_, 0);
  };
  function ue(A, E) {
    for (; (A[E] & 65535) != A[E]; ) A[E + 1] += A[E] >>> 16, A[E] &= 65535, E++;
  }
  function Ee(A, E) {
    this.g = A, this.h = E;
  }
  function De(A, E) {
    if (b(E)) throw Error("division by zero");
    if (b(A)) return new Ee(f, f);
    if (V(A)) return E = De(j(A), E), new Ee(j(E.g), j(E.h));
    if (V(E)) return E = De(A, j(E)), new Ee(j(E.g), E.h);
    if (A.g.length > 30) {
      if (V(A) || V(E)) throw Error("slowDivide_ only works with positive integers.");
      for (var _ = m, v = E; v.l(A) <= 0; ) _ = tt(_), v = tt(v);
      var T = de(_, 1), O = de(v, 1);
      for (v = de(v, 2), _ = de(_, 2); !b(v); ) {
        var D = O.add(v);
        D.l(A) <= 0 && (T = T.add(_), O = D), v = de(v, 1), _ = de(_, 1);
      }
      return E = z(A, T.j(E)), new Ee(T, E);
    }
    for (T = f; A.l(E) >= 0; ) {
      for (_ = Math.max(1, Math.floor(A.m() / E.m())), v = Math.ceil(Math.log(_) / Math.LN2), v = v <= 48 ? 1 : Math.pow(2, v - 48), O = c(_), D = O.j(E); V(D) || D.l(A) > 0; ) _ -= v, O = c(_), D = O.j(E);
      b(O) && (O = m), T = T.add(O), A = z(A, D);
    }
    return new Ee(T, A);
  }
  r.B = function(A) {
    return De(this, A).h;
  }, r.and = function(A) {
    const E = Math.max(this.g.length, A.g.length), _ = [];
    for (let v = 0; v < E; v++) _[v] = this.i(v) & A.i(v);
    return new o(_, this.h & A.h);
  }, r.or = function(A) {
    const E = Math.max(this.g.length, A.g.length), _ = [];
    for (let v = 0; v < E; v++) _[v] = this.i(v) | A.i(v);
    return new o(_, this.h | A.h);
  }, r.xor = function(A) {
    const E = Math.max(this.g.length, A.g.length), _ = [];
    for (let v = 0; v < E; v++) _[v] = this.i(v) ^ A.i(v);
    return new o(_, this.h ^ A.h);
  };
  function tt(A) {
    const E = A.g.length + 1, _ = [];
    for (let v = 0; v < E; v++) _[v] = A.i(v) << 1 | A.i(v - 1) >>> 31;
    return new o(_, A.h);
  }
  function de(A, E) {
    const _ = E >> 5;
    E %= 32;
    const v = A.g.length - _, T = [];
    for (let O = 0; O < v; O++) T[O] = E > 0 ? A.i(O + _) >>> E | A.i(O + _ + 1) << 32 - E : A.i(O + _);
    return new o(T, A.h);
  }
  n.prototype.digest = n.prototype.A, n.prototype.reset = n.prototype.u, n.prototype.update = n.prototype.v, Jc = n, o.prototype.add = o.prototype.add, o.prototype.multiply = o.prototype.j, o.prototype.modulo = o.prototype.B, o.prototype.compare = o.prototype.l, o.prototype.toNumber = o.prototype.m, o.prototype.toString = o.prototype.toString, o.prototype.getBits = o.prototype.i, o.fromNumber = c, o.fromString = C, $t = o;
}).apply(typeof Ku < "u" ? Ku : typeof self < "u" ? self : typeof window < "u" ? window : {});
var Ls = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
var qc, Sr, Kc, zs, Ko, Qc, zc, $c;
(function() {
  var r, e = Object.defineProperty;
  function t(a) {
    a = [typeof globalThis == "object" && globalThis, a, typeof window == "object" && window, typeof self == "object" && self, typeof Ls == "object" && Ls];
    for (var l = 0; l < a.length; ++l) {
      var h = a[l];
      if (h && h.Math == Math) return h;
    }
    throw Error("Cannot find global object");
  }
  var n = t(this);
  function s(a, l) {
    if (l) e: {
      var h = n;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var R = a[d];
        if (!(R in h)) break e;
        h = h[R];
      }
      a = a[a.length - 1], d = h[a], l = l(d), l != d && l != null && e(h, a, { configurable: !0, writable: !0, value: l });
    }
  }
  s("Symbol.dispose", function(a) {
    return a || /* @__PURE__ */ Symbol("Symbol.dispose");
  }), s("Array.prototype.values", function(a) {
    return a || function() {
      return this[Symbol.iterator]();
    };
  }), s("Object.entries", function(a) {
    return a || function(l) {
      var h = [], d;
      for (d in l) Object.prototype.hasOwnProperty.call(l, d) && h.push([d, l[d]]);
      return h;
    };
  });
  var i = i || {}, o = this || self;
  function B(a) {
    var l = typeof a;
    return l == "object" && a != null || l == "function";
  }
  function u(a, l, h) {
    return a.call.apply(a.bind, arguments);
  }
  function c(a, l, h) {
    return c = u, c.apply(null, arguments);
  }
  function C(a, l) {
    var h = Array.prototype.slice.call(arguments, 1);
    return function() {
      var d = h.slice();
      return d.push.apply(d, arguments), a.apply(this, d);
    };
  }
  function f(a, l) {
    function h() {
    }
    h.prototype = l.prototype, a.Z = l.prototype, a.prototype = new h(), a.prototype.constructor = a, a.Ob = function(d, R, S) {
      for (var k = Array(arguments.length - 2), ee = 2; ee < arguments.length; ee++) k[ee - 2] = arguments[ee];
      return l.prototype[R].apply(d, k);
    };
  }
  var m = typeof AsyncContext < "u" && typeof AsyncContext.Snapshot == "function" ? (a) => a && AsyncContext.Snapshot.wrap(a) : (a) => a;
  function y(a) {
    const l = a.length;
    if (l > 0) {
      const h = Array(l);
      for (let d = 0; d < l; d++) h[d] = a[d];
      return h;
    }
    return [];
  }
  function b(a, l) {
    for (let d = 1; d < arguments.length; d++) {
      const R = arguments[d];
      var h = typeof R;
      if (h = h != "object" ? h : R ? Array.isArray(R) ? "array" : h : "null", h == "array" || h == "object" && typeof R.length == "number") {
        h = a.length || 0;
        const S = R.length || 0;
        a.length = h + S;
        for (let k = 0; k < S; k++) a[h + k] = R[k];
      } else a.push(R);
    }
  }
  class V {
    constructor(l, h) {
      this.i = l, this.j = h, this.h = 0, this.g = null;
    }
    get() {
      let l;
      return this.h > 0 ? (this.h--, l = this.g, this.g = l.next, l.next = null) : l = this.i(), l;
    }
  }
  function j(a) {
    o.setTimeout(() => {
      throw a;
    }, 0);
  }
  function z() {
    var a = A;
    let l = null;
    return a.g && (l = a.g, a.g = a.g.next, a.g || (a.h = null), l.next = null), l;
  }
  class ue {
    constructor() {
      this.h = this.g = null;
    }
    add(l, h) {
      const d = Ee.get();
      d.set(l, h), this.h ? this.h.next = d : this.g = d, this.h = d;
    }
  }
  var Ee = new V(() => new De(), (a) => a.reset());
  class De {
    constructor() {
      this.next = this.g = this.h = null;
    }
    set(l, h) {
      this.h = l, this.g = h, this.next = null;
    }
    reset() {
      this.next = this.g = this.h = null;
    }
  }
  let tt, de = !1, A = new ue(), E = () => {
    const a = Promise.resolve(void 0);
    tt = () => {
      a.then(_);
    };
  };
  function _() {
    for (var a; a = z(); ) {
      try {
        a.h.call(a.g);
      } catch (h) {
        j(h);
      }
      var l = Ee;
      l.j(a), l.h < 100 && (l.h++, a.next = l.g, l.g = a);
    }
    de = !1;
  }
  function v() {
    this.u = this.u, this.C = this.C;
  }
  v.prototype.u = !1, v.prototype.dispose = function() {
    this.u || (this.u = !0, this.N());
  }, v.prototype[Symbol.dispose] = function() {
    this.dispose();
  }, v.prototype.N = function() {
    if (this.C) for (; this.C.length; ) this.C.shift()();
  };
  function T(a, l) {
    this.type = a, this.g = this.target = l, this.defaultPrevented = !1;
  }
  T.prototype.h = function() {
    this.defaultPrevented = !0;
  };
  var O = (function() {
    if (!o.addEventListener || !Object.defineProperty) return !1;
    var a = !1, l = Object.defineProperty({}, "passive", { get: function() {
      a = !0;
    } });
    try {
      const h = () => {
      };
      o.addEventListener("test", h, l), o.removeEventListener("test", h, l);
    } catch {
    }
    return a;
  })();
  function D(a) {
    return /^[\s\xa0]*$/.test(a);
  }
  function Qe(a, l) {
    T.call(this, a ? a.type : ""), this.relatedTarget = this.g = this.target = null, this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0, this.key = "", this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1, this.state = null, this.pointerId = 0, this.pointerType = "", this.i = null, a && this.init(a, l);
  }
  f(Qe, T), Qe.prototype.init = function(a, l) {
    const h = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement, this.g = l, l = a.relatedTarget, l || (h == "mouseover" ? l = a.fromElement : h == "mouseout" && (l = a.toElement)), this.relatedTarget = l, d ? (this.clientX = d.clientX !== void 0 ? d.clientX : d.pageX, this.clientY = d.clientY !== void 0 ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = a.clientX !== void 0 ? a.clientX : a.pageX, this.clientY = a.clientY !== void 0 ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0), this.button = a.button, this.key = a.key || "", this.ctrlKey = a.ctrlKey, this.altKey = a.altKey, this.shiftKey = a.shiftKey, this.metaKey = a.metaKey, this.pointerId = a.pointerId || 0, this.pointerType = a.pointerType, this.state = a.state, this.i = a, a.defaultPrevented && Qe.Z.h.call(this);
  }, Qe.prototype.h = function() {
    Qe.Z.h.call(this);
    const a = this.i;
    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
  };
  var un = "closure_listenable_" + (Math.random() * 1e6 | 0), UC = 0;
  function jC(a, l, h, d, R) {
    this.listener = a, this.proxy = null, this.src = l, this.type = h, this.capture = !!d, this.ha = R, this.key = ++UC, this.da = this.fa = !1;
  }
  function Ds(a) {
    a.da = !0, a.listener = null, a.proxy = null, a.src = null, a.ha = null;
  }
  function _s(a, l, h) {
    for (const d in a) l.call(h, a[d], d, a);
  }
  function JC(a, l) {
    for (const h in a) l.call(void 0, a[h], h, a);
  }
  function uB(a) {
    const l = {};
    for (const h in a) l[h] = a[h];
    return l;
  }
  const lB = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
  function cB(a, l) {
    let h, d;
    for (let R = 1; R < arguments.length; R++) {
      d = arguments[R];
      for (h in d) a[h] = d[h];
      for (let S = 0; S < lB.length; S++) h = lB[S], Object.prototype.hasOwnProperty.call(d, h) && (a[h] = d[h]);
    }
  }
  function ys(a) {
    this.src = a, this.g = {}, this.h = 0;
  }
  ys.prototype.add = function(a, l, h, d, R) {
    const S = a.toString();
    a = this.g[S], a || (a = this.g[S] = [], this.h++);
    const k = ki(a, l, d, R);
    return k > -1 ? (l = a[k], h || (l.fa = !1)) : (l = new jC(l, this.src, S, !!d, R), l.fa = h, a.push(l)), l;
  };
  function Gi(a, l) {
    const h = l.type;
    if (h in a.g) {
      var d = a.g[h], R = Array.prototype.indexOf.call(d, l, void 0), S;
      (S = R >= 0) && Array.prototype.splice.call(d, R, 1), S && (Ds(l), a.g[h].length == 0 && (delete a.g[h], a.h--));
    }
  }
  function ki(a, l, h, d) {
    for (let R = 0; R < a.length; ++R) {
      const S = a[R];
      if (!S.da && S.listener == l && S.capture == !!h && S.ha == d) return R;
    }
    return -1;
  }
  var Hi = "closure_lm_" + (Math.random() * 1e6 | 0), Ui = {};
  function hB(a, l, h, d, R) {
    if (Array.isArray(l)) {
      for (let S = 0; S < l.length; S++) hB(a, l[S], h, d, R);
      return null;
    }
    return h = dB(h), a && a[un] ? a.J(l, h, B(d) ? !!d.capture : !1, R) : qC(a, l, h, !1, d, R);
  }
  function qC(a, l, h, d, R, S) {
    if (!l) throw Error("Invalid event type");
    const k = B(R) ? !!R.capture : !!R;
    let ee = Ji(a);
    if (ee || (a[Hi] = ee = new ys(a)), h = ee.add(l, h, d, k, S), h.proxy) return h;
    if (d = KC(), h.proxy = d, d.src = a, d.listener = h, a.addEventListener) O || (R = k), R === void 0 && (R = !1), a.addEventListener(l.toString(), d, R);
    else if (a.attachEvent) a.attachEvent(fB(l.toString()), d);
    else if (a.addListener && a.removeListener) a.addListener(d);
    else throw Error("addEventListener and attachEvent are unavailable.");
    return h;
  }
  function KC() {
    function a(h) {
      return l.call(a.src, a.listener, h);
    }
    const l = QC;
    return a;
  }
  function CB(a, l, h, d, R) {
    if (Array.isArray(l)) for (var S = 0; S < l.length; S++) CB(a, l[S], h, d, R);
    else d = B(d) ? !!d.capture : !!d, h = dB(h), a && a[un] ? (a = a.i, S = String(l).toString(), S in a.g && (l = a.g[S], h = ki(l, h, d, R), h > -1 && (Ds(l[h]), Array.prototype.splice.call(l, h, 1), l.length == 0 && (delete a.g[S], a.h--)))) : a && (a = Ji(a)) && (l = a.g[l.toString()], a = -1, l && (a = ki(l, h, d, R)), (h = a > -1 ? l[a] : null) && ji(h));
  }
  function ji(a) {
    if (typeof a != "number" && a && !a.da) {
      var l = a.src;
      if (l && l[un]) Gi(l.i, a);
      else {
        var h = a.type, d = a.proxy;
        l.removeEventListener ? l.removeEventListener(h, d, a.capture) : l.detachEvent ? l.detachEvent(fB(h), d) : l.addListener && l.removeListener && l.removeListener(d), (h = Ji(l)) ? (Gi(h, a), h.h == 0 && (h.src = null, l[Hi] = null)) : Ds(a);
      }
    }
  }
  function fB(a) {
    return a in Ui ? Ui[a] : Ui[a] = "on" + a;
  }
  function QC(a, l) {
    if (a.da) a = !0;
    else {
      l = new Qe(l, this);
      const h = a.listener, d = a.ha || a.src;
      a.fa && ji(a), a = h.call(d, l);
    }
    return a;
  }
  function Ji(a) {
    return a = a[Hi], a instanceof ys ? a : null;
  }
  var qi = "__closure_events_fn_" + (Math.random() * 1e9 >>> 0);
  function dB(a) {
    return typeof a == "function" ? a : (a[qi] || (a[qi] = function(l) {
      return a.handleEvent(l);
    }), a[qi]);
  }
  function Ve() {
    v.call(this), this.i = new ys(this), this.M = this, this.G = null;
  }
  f(Ve, v), Ve.prototype[un] = !0, Ve.prototype.removeEventListener = function(a, l, h, d) {
    CB(this, a, l, h, d);
  };
  function je(a, l) {
    var h, d = a.G;
    if (d) for (h = []; d; d = d.G) h.push(d);
    if (a = a.M, d = l.type || l, typeof l == "string") l = new T(l, a);
    else if (l instanceof T) l.target = l.target || a;
    else {
      var R = l;
      l = new T(d, a), cB(l, R);
    }
    R = !0;
    let S, k;
    if (h) for (k = h.length - 1; k >= 0; k--) S = l.g = h[k], R = Is(S, d, !0, l) && R;
    if (S = l.g = a, R = Is(S, d, !0, l) && R, R = Is(S, d, !1, l) && R, h) for (k = 0; k < h.length; k++) S = l.g = h[k], R = Is(S, d, !1, l) && R;
  }
  Ve.prototype.N = function() {
    if (Ve.Z.N.call(this), this.i) {
      var a = this.i;
      for (const l in a.g) {
        const h = a.g[l];
        for (let d = 0; d < h.length; d++) Ds(h[d]);
        delete a.g[l], a.h--;
      }
    }
    this.G = null;
  }, Ve.prototype.J = function(a, l, h, d) {
    return this.i.add(String(a), l, !1, h, d);
  }, Ve.prototype.K = function(a, l, h, d) {
    return this.i.add(String(a), l, !0, h, d);
  };
  function Is(a, l, h, d) {
    if (l = a.i.g[String(l)], !l) return !0;
    l = l.concat();
    let R = !0;
    for (let S = 0; S < l.length; ++S) {
      const k = l[S];
      if (k && !k.da && k.capture == h) {
        const ee = k.listener, Re = k.ha || k.src;
        k.fa && Gi(a.i, k), R = ee.call(Re, d) !== !1 && R;
      }
    }
    return R && !d.defaultPrevented;
  }
  function zC(a, l) {
    if (typeof a != "function") if (a && typeof a.handleEvent == "function") a = c(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return Number(l) > 2147483647 ? -1 : o.setTimeout(a, l || 0);
  }
  function gB(a) {
    a.g = zC(() => {
      a.g = null, a.i && (a.i = !1, gB(a));
    }, a.l);
    const l = a.h;
    a.h = null, a.m.apply(null, l);
  }
  class $C extends v {
    constructor(l, h) {
      super(), this.m = l, this.l = h, this.h = null, this.i = !1, this.g = null;
    }
    j(l) {
      this.h = arguments, this.g ? this.i = !0 : gB(this);
    }
    N() {
      super.N(), this.g && (o.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null);
    }
  }
  function Cr(a) {
    v.call(this), this.h = a, this.g = {};
  }
  f(Cr, v);
  var pB = [];
  function mB(a) {
    _s(a.g, function(l, h) {
      this.g.hasOwnProperty(h) && ji(l);
    }, a), a.g = {};
  }
  Cr.prototype.N = function() {
    Cr.Z.N.call(this), mB(this);
  }, Cr.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var Ki = o.JSON.stringify, YC = o.JSON.parse, WC = class {
    stringify(a) {
      return o.JSON.stringify(a, void 0);
    }
    parse(a) {
      return o.JSON.parse(a, void 0);
    }
  };
  function EB() {
  }
  function DB() {
  }
  var fr = { OPEN: "a", hb: "b", ERROR: "c", tb: "d" };
  function Qi() {
    T.call(this, "d");
  }
  f(Qi, T);
  function zi() {
    T.call(this, "c");
  }
  f(zi, T);
  var ln = {}, _B = null;
  function ws() {
    return _B = _B || new Ve();
  }
  ln.Ia = "serverreachability";
  function yB(a) {
    T.call(this, ln.Ia, a);
  }
  f(yB, T);
  function dr(a) {
    const l = ws();
    je(l, new yB(l));
  }
  ln.STAT_EVENT = "statevent";
  function IB(a, l) {
    T.call(this, ln.STAT_EVENT, a), this.stat = l;
  }
  f(IB, T);
  function Je(a) {
    const l = ws();
    je(l, new IB(l, a));
  }
  ln.Ja = "timingevent";
  function wB(a, l) {
    T.call(this, ln.Ja, a), this.size = l;
  }
  f(wB, T);
  function gr(a, l) {
    if (typeof a != "function") throw Error("Fn must not be null and must be a function");
    return o.setTimeout(function() {
      a();
    }, l);
  }
  function pr() {
    this.g = !0;
  }
  pr.prototype.ua = function() {
    this.g = !1;
  };
  function XC(a, l, h, d, R, S) {
    a.info(function() {
      if (a.g) if (S) {
        var k = "", ee = S.split("&");
        for (let ce = 0; ce < ee.length; ce++) {
          var Re = ee[ce].split("=");
          if (Re.length > 1) {
            const Se = Re[0];
            Re = Re[1];
            const mt = Se.split("_");
            k = mt.length >= 2 && mt[1] == "type" ? k + (Se + "=" + Re + "&") : k + (Se + "=redacted&");
          }
        }
      } else k = null;
      else k = S;
      return "XMLHTTP REQ (" + d + ") [attempt " + R + "]: " + l + `
` + h + `
` + k;
    });
  }
  function ZC(a, l, h, d, R, S, k) {
    a.info(function() {
      return "XMLHTTP RESP (" + d + ") [ attempt " + R + "]: " + l + `
` + h + `
` + S + " " + k;
    });
  }
  function Sn(a, l, h, d) {
    a.info(function() {
      return "XMLHTTP TEXT (" + l + "): " + tf(a, h) + (d ? " " + d : "");
    });
  }
  function ef(a, l) {
    a.info(function() {
      return "TIMEOUT: " + l;
    });
  }
  pr.prototype.info = function() {
  };
  function tf(a, l) {
    if (!a.g) return l;
    if (!l) return null;
    try {
      const S = JSON.parse(l);
      if (S) {
        for (a = 0; a < S.length; a++) if (Array.isArray(S[a])) {
          var h = S[a];
          if (!(h.length < 2)) {
            var d = h[1];
            if (Array.isArray(d) && !(d.length < 1)) {
              var R = d[0];
              if (R != "noop" && R != "stop" && R != "close") for (let k = 1; k < d.length; k++) d[k] = "";
            }
          }
        }
      }
      return Ki(S);
    } catch {
      return l;
    }
  }
  var Ts = { NO_ERROR: 0, cb: 1, qb: 2, pb: 3, kb: 4, ob: 5, rb: 6, Ga: 7, TIMEOUT: 8, ub: 9 }, TB = { ib: "complete", Fb: "success", ERROR: "error", Ga: "abort", xb: "ready", yb: "readystatechange", TIMEOUT: "timeout", sb: "incrementaldata", wb: "progress", lb: "downloadprogress", Nb: "uploadprogress" }, AB;
  function $i() {
  }
  f($i, EB), $i.prototype.g = function() {
    return new XMLHttpRequest();
  }, AB = new $i();
  function mr(a) {
    return encodeURIComponent(String(a));
  }
  function nf(a) {
    var l = 1;
    a = a.split(":");
    const h = [];
    for (; l > 0 && a.length; ) h.push(a.shift()), l--;
    return a.length && h.push(a.join(":")), h;
  }
  function Lt(a, l, h, d) {
    this.j = a, this.i = l, this.l = h, this.S = d || 1, this.V = new Cr(this), this.H = 45e3, this.J = null, this.o = !1, this.u = this.B = this.A = this.M = this.F = this.T = this.D = null, this.G = [], this.g = null, this.C = 0, this.m = this.v = null, this.X = -1, this.K = !1, this.P = 0, this.O = null, this.W = this.L = this.U = this.R = !1, this.h = new vB();
  }
  function vB() {
    this.i = null, this.g = "", this.h = !1;
  }
  var RB = {}, Yi = {};
  function Wi(a, l, h) {
    a.M = 1, a.A = vs(pt(l)), a.u = h, a.R = !0, bB(a, null);
  }
  function bB(a, l) {
    a.F = Date.now(), As(a), a.B = pt(a.A);
    var h = a.B, d = a.S;
    Array.isArray(d) || (d = [String(d)]), UB(h.i, "t", d), a.C = 0, h = a.j.L, a.h = new vB(), a.g = ou(a.j, h ? l : null, !a.u), a.P > 0 && (a.O = new $C(c(a.Y, a, a.g), a.P)), l = a.V, h = a.g, d = a.ba;
    var R = "readystatechange";
    Array.isArray(R) || (R && (pB[0] = R.toString()), R = pB);
    for (let S = 0; S < R.length; S++) {
      const k = hB(h, R[S], d || l.handleEvent, !1, l.h || l);
      if (!k) break;
      l.g[k.key] = k;
    }
    l = a.J ? uB(a.J) : {}, a.u ? (a.v || (a.v = "POST"), l["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(
      a.B,
      a.v,
      a.u,
      l
    )) : (a.v = "GET", a.g.ea(a.B, a.v, null, l)), dr(), XC(a.i, a.v, a.B, a.l, a.S, a.u);
  }
  Lt.prototype.ba = function(a) {
    a = a.target;
    const l = this.O;
    l && Mt(a) == 3 ? l.j() : this.Y(a);
  }, Lt.prototype.Y = function(a) {
    try {
      if (a == this.g) e: {
        const ee = Mt(this.g), Re = this.g.ya(), ce = this.g.ca();
        if (!(ee < 3) && (ee != 3 || this.g && (this.h.h || this.g.la() || $B(this.g)))) {
          this.K || ee != 4 || Re == 7 || (Re == 8 || ce <= 0 ? dr(3) : dr(2)), Xi(this);
          var l = this.g.ca();
          this.X = l;
          var h = rf(this);
          if (this.o = l == 200, ZC(this.i, this.v, this.B, this.l, this.S, ee, l), this.o) {
            if (this.U && !this.L) {
              t: {
                if (this.g) {
                  var d, R = this.g;
                  if ((d = R.g ? R.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !D(d)) {
                    var S = d;
                    break t;
                  }
                }
                S = null;
              }
              if (a = S) Sn(this.i, this.l, a, "Initial handshake response via X-HTTP-Initial-Response"), this.L = !0, Zi(this, a);
              else {
                this.o = !1, this.m = 3, Je(12), cn(this), Er(this);
                break e;
              }
            }
            if (this.R) {
              a = !0;
              let Se;
              for (; !this.K && this.C < h.length; ) if (Se = sf(this, h), Se == Yi) {
                ee == 4 && (this.m = 4, Je(14), a = !1), Sn(this.i, this.l, null, "[Incomplete Response]");
                break;
              } else if (Se == RB) {
                this.m = 4, Je(15), Sn(this.i, this.l, h, "[Invalid Chunk]"), a = !1;
                break;
              } else Sn(this.i, this.l, Se, null), Zi(this, Se);
              if (OB(this) && this.C != 0 && (this.h.g = this.h.g.slice(this.C), this.C = 0), ee != 4 || h.length != 0 || this.h.h || (this.m = 1, Je(16), a = !1), this.o = this.o && a, !a) Sn(
                this.i,
                this.l,
                h,
                "[Invalid Chunked Response]"
              ), cn(this), Er(this);
              else if (h.length > 0 && !this.W) {
                this.W = !0;
                var k = this.j;
                k.g == this && k.aa && !k.P && (k.j.info("Great, no buffering proxy detected. Bytes received: " + h.length), ao(k), k.P = !0, Je(11));
              }
            } else Sn(this.i, this.l, h, null), Zi(this, h);
            ee == 4 && cn(this), this.o && !this.K && (ee == 4 ? nu(this.j, this) : (this.o = !1, As(this)));
          } else Ef(this.g), l == 400 && h.indexOf("Unknown SID") > 0 ? (this.m = 3, Je(12)) : (this.m = 0, Je(13)), cn(this), Er(this);
        }
      }
    } catch {
    }
  };
  function rf(a) {
    if (!OB(a)) return a.g.la();
    const l = $B(a.g);
    if (l === "") return "";
    let h = "";
    const d = l.length, R = Mt(a.g) == 4;
    if (!a.h.i) {
      if (typeof TextDecoder > "u") return cn(a), Er(a), "";
      a.h.i = new o.TextDecoder();
    }
    for (let S = 0; S < d; S++) a.h.h = !0, h += a.h.i.decode(l[S], { stream: !(R && S == d - 1) });
    return l.length = 0, a.h.g += h, a.C = 0, a.h.g;
  }
  function OB(a) {
    return a.g ? a.v == "GET" && a.M != 2 && a.j.Aa : !1;
  }
  function sf(a, l) {
    var h = a.C, d = l.indexOf(`
`, h);
    return d == -1 ? Yi : (h = Number(l.substring(h, d)), isNaN(h) ? RB : (d += 1, d + h > l.length ? Yi : (l = l.slice(d, d + h), a.C = d + h, l)));
  }
  Lt.prototype.cancel = function() {
    this.K = !0, cn(this);
  };
  function As(a) {
    a.T = Date.now() + a.H, SB(a, a.H);
  }
  function SB(a, l) {
    if (a.D != null) throw Error("WatchDog timer not null");
    a.D = gr(c(a.aa, a), l);
  }
  function Xi(a) {
    a.D && (o.clearTimeout(a.D), a.D = null);
  }
  Lt.prototype.aa = function() {
    this.D = null;
    const a = Date.now();
    a - this.T >= 0 ? (ef(this.i, this.B), this.M != 2 && (dr(), Je(17)), cn(this), this.m = 2, Er(this)) : SB(this, this.T - a);
  };
  function Er(a) {
    a.j.I == 0 || a.K || nu(a.j, a);
  }
  function cn(a) {
    Xi(a);
    var l = a.O;
    l && typeof l.dispose == "function" && l.dispose(), a.O = null, mB(a.V), a.g && (l = a.g, a.g = null, l.abort(), l.dispose());
  }
  function Zi(a, l) {
    try {
      var h = a.j;
      if (h.I != 0 && (h.g == a || eo(h.h, a))) {
        if (!a.L && eo(h.h, a) && h.I == 3) {
          try {
            var d = h.Ba.g.parse(l);
          } catch {
            d = null;
          }
          if (Array.isArray(d) && d.length == 3) {
            var R = d;
            if (R[0] == 0) {
              e:
                if (!h.v) {
                  if (h.g) if (h.g.F + 3e3 < a.F) Ns(h), Os(h);
                  else break e;
                  oo(h), Je(18);
                }
            } else h.xa = R[1], 0 < h.xa - h.K && R[2] < 37500 && h.F && h.A == 0 && !h.C && (h.C = gr(c(h.Va, h), 6e3));
            PB(h.h) <= 1 && h.ta && (h.ta = void 0);
          } else Cn(h, 11);
        } else if ((a.L || h.g == a) && Ns(h), !D(l)) for (R = h.Ba.g.parse(l), l = 0; l < R.length; l++) {
          let ce = R[l];
          const Se = ce[0];
          if (!(Se <= h.K)) if (h.K = Se, ce = ce[1], h.I == 2) if (ce[0] == "c") {
            h.M = ce[1], h.ba = ce[2];
            const mt = ce[3];
            mt != null && (h.ka = mt, h.j.info("VER=" + h.ka));
            const fn = ce[4];
            fn != null && (h.za = fn, h.j.info("SVER=" + h.za));
            const Gt = ce[5];
            Gt != null && typeof Gt == "number" && Gt > 0 && (d = 1.5 * Gt, h.O = d, h.j.info("backChannelRequestTimeoutMs_=" + d)), d = h;
            const kt = a.g;
            if (kt) {
              const Ps = kt.g ? kt.g.getResponseHeader("X-Client-Wire-Protocol") : null;
              if (Ps) {
                var S = d.h;
                S.g || Ps.indexOf("spdy") == -1 && Ps.indexOf("quic") == -1 && Ps.indexOf("h2") == -1 || (S.j = S.l, S.g = /* @__PURE__ */ new Set(), S.h && (to(S, S.h), S.h = null));
              }
              if (d.G) {
                const Bo = kt.g ? kt.g.getResponseHeader("X-HTTP-Session-Id") : null;
                Bo && (d.wa = Bo, Ce(d.J, d.G, Bo));
              }
            }
            h.I = 3, h.l && h.l.ra(), h.aa && (h.T = Date.now() - a.F, h.j.info("Handshake RTT: " + h.T + "ms")), d = h;
            var k = a;
            if (d.na = iu(d, d.L ? d.ba : null, d.W), k.L) {
              LB(d.h, k);
              var ee = k, Re = d.O;
              Re && (ee.H = Re), ee.D && (Xi(ee), As(ee)), d.g = k;
            } else eu(d);
            h.i.length > 0 && Ss(h);
          } else ce[0] != "stop" && ce[0] != "close" || Cn(h, 7);
          else h.I == 3 && (ce[0] == "stop" || ce[0] == "close" ? ce[0] == "stop" ? Cn(h, 7) : io(h) : ce[0] != "noop" && h.l && h.l.qa(ce), h.A = 0);
        }
      }
      dr(4);
    } catch {
    }
  }
  var of = class {
    constructor(a, l) {
      this.g = a, this.map = l;
    }
  };
  function NB(a) {
    this.l = a || 10, o.PerformanceNavigationTiming ? (a = o.performance.getEntriesByType("navigation"), a = a.length > 0 && (a[0].nextHopProtocol == "hq" || a[0].nextHopProtocol == "h2")) : a = !!(o.chrome && o.chrome.loadTimes && o.chrome.loadTimes() && o.chrome.loadTimes().wasFetchedViaSpdy), this.j = a ? this.l : 1, this.g = null, this.j > 1 && (this.g = /* @__PURE__ */ new Set()), this.h = null, this.i = [];
  }
  function FB(a) {
    return a.h ? !0 : a.g ? a.g.size >= a.j : !1;
  }
  function PB(a) {
    return a.h ? 1 : a.g ? a.g.size : 0;
  }
  function eo(a, l) {
    return a.h ? a.h == l : a.g ? a.g.has(l) : !1;
  }
  function to(a, l) {
    a.g ? a.g.add(l) : a.h = l;
  }
  function LB(a, l) {
    a.h && a.h == l ? a.h = null : a.g && a.g.has(l) && a.g.delete(l);
  }
  NB.prototype.cancel = function() {
    if (this.i = xB(this), this.h) this.h.cancel(), this.h = null;
    else if (this.g && this.g.size !== 0) {
      for (const a of this.g.values()) a.cancel();
      this.g.clear();
    }
  };
  function xB(a) {
    if (a.h != null) return a.i.concat(a.h.G);
    if (a.g != null && a.g.size !== 0) {
      let l = a.i;
      for (const h of a.g.values()) l = l.concat(h.G);
      return l;
    }
    return y(a.i);
  }
  var VB = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
  function af(a, l) {
    if (a) {
      a = a.split("&");
      for (let h = 0; h < a.length; h++) {
        const d = a[h].indexOf("=");
        let R, S = null;
        d >= 0 ? (R = a[h].substring(0, d), S = a[h].substring(d + 1)) : R = a[h], l(R, S ? decodeURIComponent(S.replace(/\+/g, " ")) : "");
      }
    }
  }
  function xt(a) {
    this.g = this.o = this.j = "", this.u = null, this.m = this.h = "", this.l = !1;
    let l;
    a instanceof xt ? (this.l = a.l, Dr(this, a.j), this.o = a.o, this.g = a.g, _r(this, a.u), this.h = a.h, no(this, jB(a.i)), this.m = a.m) : a && (l = String(a).match(VB)) ? (this.l = !1, Dr(this, l[1] || "", !0), this.o = yr(l[2] || ""), this.g = yr(l[3] || "", !0), _r(this, l[4]), this.h = yr(l[5] || "", !0), no(this, l[6] || "", !0), this.m = yr(l[7] || "")) : (this.l = !1, this.i = new wr(null, this.l));
  }
  xt.prototype.toString = function() {
    const a = [];
    var l = this.j;
    l && a.push(Ir(l, MB, !0), ":");
    var h = this.g;
    return (h || l == "file") && (a.push("//"), (l = this.o) && a.push(Ir(l, MB, !0), "@"), a.push(mr(h).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), h = this.u, h != null && a.push(":", String(h))), (h = this.h) && (this.g && h.charAt(0) != "/" && a.push("/"), a.push(Ir(h, h.charAt(0) == "/" ? lf : uf, !0))), (h = this.i.toString()) && a.push("?", h), (h = this.m) && a.push("#", Ir(h, hf)), a.join("");
  }, xt.prototype.resolve = function(a) {
    const l = pt(this);
    let h = !!a.j;
    h ? Dr(l, a.j) : h = !!a.o, h ? l.o = a.o : h = !!a.g, h ? l.g = a.g : h = a.u != null;
    var d = a.h;
    if (h) _r(l, a.u);
    else if (h = !!a.h) {
      if (d.charAt(0) != "/") if (this.g && !this.h) d = "/" + d;
      else {
        var R = l.h.lastIndexOf("/");
        R != -1 && (d = l.h.slice(0, R + 1) + d);
      }
      if (R = d, R == ".." || R == ".") d = "";
      else if (R.indexOf("./") != -1 || R.indexOf("/.") != -1) {
        d = R.lastIndexOf("/", 0) == 0, R = R.split("/");
        const S = [];
        for (let k = 0; k < R.length; ) {
          const ee = R[k++];
          ee == "." ? d && k == R.length && S.push("") : ee == ".." ? ((S.length > 1 || S.length == 1 && S[0] != "") && S.pop(), d && k == R.length && S.push("")) : (S.push(ee), d = !0);
        }
        d = S.join("/");
      } else d = R;
    }
    return h ? l.h = d : h = a.i.toString() !== "", h ? no(l, jB(a.i)) : h = !!a.m, h && (l.m = a.m), l;
  };
  function pt(a) {
    return new xt(a);
  }
  function Dr(a, l, h) {
    a.j = h ? yr(l, !0) : l, a.j && (a.j = a.j.replace(/:$/, ""));
  }
  function _r(a, l) {
    if (l) {
      if (l = Number(l), isNaN(l) || l < 0) throw Error("Bad port number " + l);
      a.u = l;
    } else a.u = null;
  }
  function no(a, l, h) {
    l instanceof wr ? (a.i = l, Cf(a.i, a.l)) : (h || (l = Ir(l, cf)), a.i = new wr(l, a.l));
  }
  function Ce(a, l, h) {
    a.i.set(l, h);
  }
  function vs(a) {
    return Ce(a, "zx", Math.floor(Math.random() * 2147483648).toString(36) + Math.abs(Math.floor(Math.random() * 2147483648) ^ Date.now()).toString(36)), a;
  }
  function yr(a, l) {
    return a ? l ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
  }
  function Ir(a, l, h) {
    return typeof a == "string" ? (a = encodeURI(a).replace(l, Bf), h && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
  }
  function Bf(a) {
    return a = a.charCodeAt(0), "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
  }
  var MB = /[#\/\?@]/g, uf = /[#\?:]/g, lf = /[#\?]/g, cf = /[#\?@]/g, hf = /#/g;
  function wr(a, l) {
    this.h = this.g = null, this.i = a || null, this.j = !!l;
  }
  function hn(a) {
    a.g || (a.g = /* @__PURE__ */ new Map(), a.h = 0, a.i && af(a.i, function(l, h) {
      a.add(decodeURIComponent(l.replace(/\+/g, " ")), h);
    }));
  }
  r = wr.prototype, r.add = function(a, l) {
    hn(this), this.i = null, a = Nn(this, a);
    let h = this.g.get(a);
    return h || this.g.set(a, h = []), h.push(l), this.h += 1, this;
  };
  function GB(a, l) {
    hn(a), l = Nn(a, l), a.g.has(l) && (a.i = null, a.h -= a.g.get(l).length, a.g.delete(l));
  }
  function kB(a, l) {
    return hn(a), l = Nn(a, l), a.g.has(l);
  }
  r.forEach = function(a, l) {
    hn(this), this.g.forEach(function(h, d) {
      h.forEach(function(R) {
        a.call(l, R, d, this);
      }, this);
    }, this);
  };
  function HB(a, l) {
    hn(a);
    let h = [];
    if (typeof l == "string") kB(a, l) && (h = h.concat(a.g.get(Nn(a, l))));
    else for (a = Array.from(a.g.values()), l = 0; l < a.length; l++) h = h.concat(a[l]);
    return h;
  }
  r.set = function(a, l) {
    return hn(this), this.i = null, a = Nn(this, a), kB(this, a) && (this.h -= this.g.get(a).length), this.g.set(a, [l]), this.h += 1, this;
  }, r.get = function(a, l) {
    return a ? (a = HB(this, a), a.length > 0 ? String(a[0]) : l) : l;
  };
  function UB(a, l, h) {
    GB(a, l), h.length > 0 && (a.i = null, a.g.set(Nn(a, l), y(h)), a.h += h.length);
  }
  r.toString = function() {
    if (this.i) return this.i;
    if (!this.g) return "";
    const a = [], l = Array.from(this.g.keys());
    for (let d = 0; d < l.length; d++) {
      var h = l[d];
      const R = mr(h);
      h = HB(this, h);
      for (let S = 0; S < h.length; S++) {
        let k = R;
        h[S] !== "" && (k += "=" + mr(h[S])), a.push(k);
      }
    }
    return this.i = a.join("&");
  };
  function jB(a) {
    const l = new wr();
    return l.i = a.i, a.g && (l.g = new Map(a.g), l.h = a.h), l;
  }
  function Nn(a, l) {
    return l = String(l), a.j && (l = l.toLowerCase()), l;
  }
  function Cf(a, l) {
    l && !a.j && (hn(a), a.i = null, a.g.forEach(function(h, d) {
      const R = d.toLowerCase();
      d != R && (GB(this, d), UB(this, R, h));
    }, a)), a.j = l;
  }
  function ff(a, l) {
    const h = new pr();
    if (o.Image) {
      const d = new Image();
      d.onload = C(Vt, h, "TestLoadImage: loaded", !0, l, d), d.onerror = C(Vt, h, "TestLoadImage: error", !1, l, d), d.onabort = C(Vt, h, "TestLoadImage: abort", !1, l, d), d.ontimeout = C(Vt, h, "TestLoadImage: timeout", !1, l, d), o.setTimeout(function() {
        d.ontimeout && d.ontimeout();
      }, 1e4), d.src = a;
    } else l(!1);
  }
  function df(a, l) {
    const h = new pr(), d = new AbortController(), R = setTimeout(() => {
      d.abort(), Vt(h, "TestPingServer: timeout", !1, l);
    }, 1e4);
    fetch(a, { signal: d.signal }).then((S) => {
      clearTimeout(R), S.ok ? Vt(h, "TestPingServer: ok", !0, l) : Vt(h, "TestPingServer: server error", !1, l);
    }).catch(() => {
      clearTimeout(R), Vt(h, "TestPingServer: error", !1, l);
    });
  }
  function Vt(a, l, h, d, R) {
    try {
      R && (R.onload = null, R.onerror = null, R.onabort = null, R.ontimeout = null), d(h);
    } catch {
    }
  }
  function gf() {
    this.g = new WC();
  }
  function ro(a) {
    this.i = a.Sb || null, this.h = a.ab || !1;
  }
  f(ro, EB), ro.prototype.g = function() {
    return new Rs(this.i, this.h);
  };
  function Rs(a, l) {
    Ve.call(this), this.H = a, this.o = l, this.m = void 0, this.status = this.readyState = 0, this.responseType = this.responseText = this.response = this.statusText = "", this.onreadystatechange = null, this.A = new Headers(), this.h = null, this.F = "GET", this.D = "", this.g = !1, this.B = this.j = this.l = null, this.v = new AbortController();
  }
  f(Rs, Ve), r = Rs.prototype, r.open = function(a, l) {
    if (this.readyState != 0) throw this.abort(), Error("Error reopening a connection");
    this.F = a, this.D = l, this.readyState = 1, Ar(this);
  }, r.send = function(a) {
    if (this.readyState != 1) throw this.abort(), Error("need to call open() first. ");
    if (this.v.signal.aborted) throw this.abort(), Error("Request was aborted.");
    this.g = !0;
    const l = { headers: this.A, method: this.F, credentials: this.m, cache: void 0, signal: this.v.signal };
    a && (l.body = a), (this.H || o).fetch(new Request(this.D, l)).then(this.Pa.bind(this), this.ga.bind(this));
  }, r.abort = function() {
    this.response = this.responseText = "", this.A = new Headers(), this.status = 0, this.v.abort(), this.j && this.j.cancel("Request was aborted.").catch(() => {
    }), this.readyState >= 1 && this.g && this.readyState != 4 && (this.g = !1, Tr(this)), this.readyState = 0;
  }, r.Pa = function(a) {
    if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, Ar(this)), this.g && (this.readyState = 3, Ar(this), this.g))) if (this.responseType === "arraybuffer") a.arrayBuffer().then(this.Na.bind(this), this.ga.bind(this));
    else if (typeof o.ReadableStream < "u" && "body" in a) {
      if (this.j = a.body.getReader(), this.o) {
        if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
        this.response = [];
      } else this.response = this.responseText = "", this.B = new TextDecoder();
      JB(this);
    } else a.text().then(this.Oa.bind(this), this.ga.bind(this));
  };
  function JB(a) {
    a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a));
  }
  r.Ma = function(a) {
    if (this.g) {
      if (this.o && a.value) this.response.push(a.value);
      else if (!this.o) {
        var l = a.value ? a.value : new Uint8Array(0);
        (l = this.B.decode(l, { stream: !a.done })) && (this.response = this.responseText += l);
      }
      a.done ? Tr(this) : Ar(this), this.readyState == 3 && JB(this);
    }
  }, r.Oa = function(a) {
    this.g && (this.response = this.responseText = a, Tr(this));
  }, r.Na = function(a) {
    this.g && (this.response = a, Tr(this));
  }, r.ga = function() {
    this.g && Tr(this);
  };
  function Tr(a) {
    a.readyState = 4, a.l = null, a.j = null, a.B = null, Ar(a);
  }
  r.setRequestHeader = function(a, l) {
    this.A.append(a, l);
  }, r.getResponseHeader = function(a) {
    return this.h && this.h.get(a.toLowerCase()) || "";
  }, r.getAllResponseHeaders = function() {
    if (!this.h) return "";
    const a = [], l = this.h.entries();
    for (var h = l.next(); !h.done; ) h = h.value, a.push(h[0] + ": " + h[1]), h = l.next();
    return a.join(`\r
`);
  };
  function Ar(a) {
    a.onreadystatechange && a.onreadystatechange.call(a);
  }
  Object.defineProperty(Rs.prototype, "withCredentials", { get: function() {
    return this.m === "include";
  }, set: function(a) {
    this.m = a ? "include" : "same-origin";
  } });
  function qB(a) {
    let l = "";
    return _s(a, function(h, d) {
      l += d, l += ":", l += h, l += `\r
`;
    }), l;
  }
  function so(a, l, h) {
    e: {
      for (d in h) {
        var d = !1;
        break e;
      }
      d = !0;
    }
    d || (h = qB(h), typeof a == "string" ? h != null && mr(h) : Ce(a, l, h));
  }
  function pe(a) {
    Ve.call(this), this.headers = /* @__PURE__ */ new Map(), this.L = a || null, this.h = !1, this.g = null, this.D = "", this.o = 0, this.l = "", this.j = this.B = this.v = this.A = !1, this.m = null, this.F = "", this.H = !1;
  }
  f(pe, Ve);
  var pf = /^https?$/i, mf = ["POST", "PUT"];
  r = pe.prototype, r.Fa = function(a) {
    this.H = a;
  }, r.ea = function(a, l, h, d) {
    if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.D + "; newUri=" + a);
    l = l ? l.toUpperCase() : "GET", this.D = a, this.l = "", this.o = 0, this.A = !1, this.h = !0, this.g = this.L ? this.L.g() : AB.g(), this.g.onreadystatechange = m(c(this.Ca, this));
    try {
      this.B = !0, this.g.open(l, String(a), !0), this.B = !1;
    } catch (S) {
      KB(this, S);
      return;
    }
    if (a = h || "", h = new Map(this.headers), d) if (Object.getPrototypeOf(d) === Object.prototype) for (var R in d) h.set(R, d[R]);
    else if (typeof d.keys == "function" && typeof d.get == "function") for (const S of d.keys()) h.set(S, d.get(S));
    else throw Error("Unknown input type for opt_headers: " + String(d));
    d = Array.from(h.keys()).find((S) => S.toLowerCase() == "content-type"), R = o.FormData && a instanceof o.FormData, !(Array.prototype.indexOf.call(mf, l, void 0) >= 0) || d || R || h.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
    for (const [S, k] of h) this.g.setRequestHeader(S, k);
    this.F && (this.g.responseType = this.F), "withCredentials" in this.g && this.g.withCredentials !== this.H && (this.g.withCredentials = this.H);
    try {
      this.m && (clearTimeout(this.m), this.m = null), this.v = !0, this.g.send(a), this.v = !1;
    } catch (S) {
      KB(this, S);
    }
  };
  function KB(a, l) {
    a.h = !1, a.g && (a.j = !0, a.g.abort(), a.j = !1), a.l = l, a.o = 5, QB(a), bs(a);
  }
  function QB(a) {
    a.A || (a.A = !0, je(a, "complete"), je(a, "error"));
  }
  r.abort = function(a) {
    this.g && this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1, this.o = a || 7, je(this, "complete"), je(this, "abort"), bs(this));
  }, r.N = function() {
    this.g && (this.h && (this.h = !1, this.j = !0, this.g.abort(), this.j = !1), bs(this, !0)), pe.Z.N.call(this);
  }, r.Ca = function() {
    this.u || (this.B || this.v || this.j ? zB(this) : this.Xa());
  }, r.Xa = function() {
    zB(this);
  };
  function zB(a) {
    if (a.h && typeof i < "u") {
      if (a.v && Mt(a) == 4) setTimeout(a.Ca.bind(a), 0);
      else if (je(a, "readystatechange"), Mt(a) == 4) {
        a.h = !1;
        try {
          const S = a.ca();
          e: switch (S) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var l = !0;
              break e;
            default:
              l = !1;
          }
          var h;
          if (!(h = l)) {
            var d;
            if (d = S === 0) {
              let k = String(a.D).match(VB)[1] || null;
              !k && o.self && o.self.location && (k = o.self.location.protocol.slice(0, -1)), d = !pf.test(k ? k.toLowerCase() : "");
            }
            h = d;
          }
          if (h) je(a, "complete"), je(a, "success");
          else {
            a.o = 6;
            try {
              var R = Mt(a) > 2 ? a.g.statusText : "";
            } catch {
              R = "";
            }
            a.l = R + " [" + a.ca() + "]", QB(a);
          }
        } finally {
          bs(a);
        }
      }
    }
  }
  function bs(a, l) {
    if (a.g) {
      a.m && (clearTimeout(a.m), a.m = null);
      const h = a.g;
      a.g = null, l || je(a, "ready");
      try {
        h.onreadystatechange = null;
      } catch {
      }
    }
  }
  r.isActive = function() {
    return !!this.g;
  };
  function Mt(a) {
    return a.g ? a.g.readyState : 0;
  }
  r.ca = function() {
    try {
      return Mt(this) > 2 ? this.g.status : -1;
    } catch {
      return -1;
    }
  }, r.la = function() {
    try {
      return this.g ? this.g.responseText : "";
    } catch {
      return "";
    }
  }, r.La = function(a) {
    if (this.g) {
      var l = this.g.responseText;
      return a && l.indexOf(a) == 0 && (l = l.substring(a.length)), YC(l);
    }
  };
  function $B(a) {
    try {
      if (!a.g) return null;
      if ("response" in a.g) return a.g.response;
      switch (a.F) {
        case "":
        case "text":
          return a.g.responseText;
        case "arraybuffer":
          if ("mozResponseArrayBuffer" in a.g) return a.g.mozResponseArrayBuffer;
      }
      return null;
    } catch {
      return null;
    }
  }
  function Ef(a) {
    const l = {};
    a = (a.g && Mt(a) >= 2 && a.g.getAllResponseHeaders() || "").split(`\r
`);
    for (let d = 0; d < a.length; d++) {
      if (D(a[d])) continue;
      var h = nf(a[d]);
      const R = h[0];
      if (h = h[1], typeof h != "string") continue;
      h = h.trim();
      const S = l[R] || [];
      l[R] = S, S.push(h);
    }
    JC(l, function(d) {
      return d.join(", ");
    });
  }
  r.ya = function() {
    return this.o;
  }, r.Ha = function() {
    return typeof this.l == "string" ? this.l : String(this.l);
  };
  function vr(a, l, h) {
    return h && h.internalChannelParams && h.internalChannelParams[a] || l;
  }
  function YB(a) {
    this.za = 0, this.i = [], this.j = new pr(), this.ba = this.na = this.J = this.W = this.g = this.wa = this.G = this.H = this.u = this.U = this.o = null, this.Ya = this.V = 0, this.Sa = vr("failFast", !1, a), this.F = this.C = this.v = this.m = this.l = null, this.X = !0, this.xa = this.K = -1, this.Y = this.A = this.D = 0, this.Qa = vr("baseRetryDelayMs", 5e3, a), this.Za = vr("retryDelaySeedMs", 1e4, a), this.Ta = vr("forwardChannelMaxRetries", 2, a), this.va = vr("forwardChannelRequestTimeoutMs", 2e4, a), this.ma = a && a.xmlHttpFactory || void 0, this.Ua = a && a.Rb || void 0, this.Aa = a && a.useFetchStreams || !1, this.O = void 0, this.L = a && a.supportsCrossDomainXhr || !1, this.M = "", this.h = new NB(a && a.concurrentRequestLimit), this.Ba = new gf(), this.S = a && a.fastHandshake || !1, this.R = a && a.encodeInitMessageHeaders || !1, this.S && this.R && (this.R = !1), this.Ra = a && a.Pb || !1, a && a.ua && this.j.ua(), a && a.forceLongPolling && (this.X = !1), this.aa = !this.S && this.X && a && a.detectBufferingProxy || !1, this.ia = void 0, a && a.longPollingTimeout && a.longPollingTimeout > 0 && (this.ia = a.longPollingTimeout), this.ta = void 0, this.T = 0, this.P = !1, this.ja = this.B = null;
  }
  r = YB.prototype, r.ka = 8, r.I = 1, r.connect = function(a, l, h, d) {
    Je(0), this.W = a, this.H = l || {}, h && d !== void 0 && (this.H.OSID = h, this.H.OAID = d), this.F = this.X, this.J = iu(this, null, this.W), Ss(this);
  };
  function io(a) {
    if (WB(a), a.I == 3) {
      var l = a.V++, h = pt(a.J);
      if (Ce(h, "SID", a.M), Ce(h, "RID", l), Ce(h, "TYPE", "terminate"), Rr(a, h), l = new Lt(a, a.j, l), l.M = 2, l.A = vs(pt(h)), h = !1, o.navigator && o.navigator.sendBeacon) try {
        h = o.navigator.sendBeacon(l.A.toString(), "");
      } catch {
      }
      !h && o.Image && (new Image().src = l.A, h = !0), h || (l.g = ou(l.j, null), l.g.ea(l.A)), l.F = Date.now(), As(l);
    }
    su(a);
  }
  function Os(a) {
    a.g && (ao(a), a.g.cancel(), a.g = null);
  }
  function WB(a) {
    Os(a), a.v && (o.clearTimeout(a.v), a.v = null), Ns(a), a.h.cancel(), a.m && (typeof a.m == "number" && o.clearTimeout(a.m), a.m = null);
  }
  function Ss(a) {
    if (!FB(a.h) && !a.m) {
      a.m = !0;
      var l = a.Ea;
      tt || E(), de || (tt(), de = !0), A.add(l, a), a.D = 0;
    }
  }
  function Df(a, l) {
    return PB(a.h) >= a.h.j - (a.m ? 1 : 0) ? !1 : a.m ? (a.i = l.G.concat(a.i), !0) : a.I == 1 || a.I == 2 || a.D >= (a.Sa ? 0 : a.Ta) ? !1 : (a.m = gr(c(a.Ea, a, l), ru(a, a.D)), a.D++, !0);
  }
  r.Ea = function(a) {
    if (this.m) if (this.m = null, this.I == 1) {
      if (!a) {
        this.V = Math.floor(Math.random() * 1e5), a = this.V++;
        const R = new Lt(this, this.j, a);
        let S = this.o;
        if (this.U && (S ? (S = uB(S), cB(S, this.U)) : S = this.U), this.u !== null || this.R || (R.J = S, S = null), this.S) e: {
          for (var l = 0, h = 0; h < this.i.length; h++) {
            t: {
              var d = this.i[h];
              if ("__data__" in d.map && (d = d.map.__data__, typeof d == "string")) {
                d = d.length;
                break t;
              }
              d = void 0;
            }
            if (d === void 0) break;
            if (l += d, l > 4096) {
              l = h;
              break e;
            }
            if (l === 4096 || h === this.i.length - 1) {
              l = h + 1;
              break e;
            }
          }
          l = 1e3;
        }
        else l = 1e3;
        l = ZB(this, R, l), h = pt(this.J), Ce(h, "RID", a), Ce(h, "CVER", 22), this.G && Ce(h, "X-HTTP-Session-Id", this.G), Rr(this, h), S && (this.R ? l = "headers=" + mr(qB(S)) + "&" + l : this.u && so(h, this.u, S)), to(this.h, R), this.Ra && Ce(h, "TYPE", "init"), this.S ? (Ce(h, "$req", l), Ce(h, "SID", "null"), R.U = !0, Wi(R, h, null)) : Wi(R, h, l), this.I = 2;
      }
    } else this.I == 3 && (a ? XB(this, a) : this.i.length == 0 || FB(this.h) || XB(this));
  };
  function XB(a, l) {
    var h;
    l ? h = l.l : h = a.V++;
    const d = pt(a.J);
    Ce(d, "SID", a.M), Ce(d, "RID", h), Ce(d, "AID", a.K), Rr(a, d), a.u && a.o && so(d, a.u, a.o), h = new Lt(a, a.j, h, a.D + 1), a.u === null && (h.J = a.o), l && (a.i = l.G.concat(a.i)), l = ZB(a, h, 1e3), h.H = Math.round(a.va * 0.5) + Math.round(a.va * 0.5 * Math.random()), to(a.h, h), Wi(h, d, l);
  }
  function Rr(a, l) {
    a.H && _s(a.H, function(h, d) {
      Ce(l, d, h);
    }), a.l && _s({}, function(h, d) {
      Ce(l, d, h);
    });
  }
  function ZB(a, l, h) {
    h = Math.min(a.i.length, h);
    const d = a.l ? c(a.l.Ka, a.l, a) : null;
    e: {
      var R = a.i;
      let ee = -1;
      for (; ; ) {
        const Re = ["count=" + h];
        ee == -1 ? h > 0 ? (ee = R[0].g, Re.push("ofs=" + ee)) : ee = 0 : Re.push("ofs=" + ee);
        let ce = !0;
        for (let Se = 0; Se < h; Se++) {
          var S = R[Se].g;
          const mt = R[Se].map;
          if (S -= ee, S < 0) ee = Math.max(0, R[Se].g - 100), ce = !1;
          else try {
            S = "req" + S + "_" || "";
            try {
              var k = mt instanceof Map ? mt : Object.entries(mt);
              for (const [fn, Gt] of k) {
                let kt = Gt;
                B(Gt) && (kt = Ki(Gt)), Re.push(S + fn + "=" + encodeURIComponent(kt));
              }
            } catch (fn) {
              throw Re.push(S + "type=" + encodeURIComponent("_badmap")), fn;
            }
          } catch {
            d && d(mt);
          }
        }
        if (ce) {
          k = Re.join("&");
          break e;
        }
      }
      k = void 0;
    }
    return a = a.i.splice(0, h), l.G = a, k;
  }
  function eu(a) {
    if (!a.g && !a.v) {
      a.Y = 1;
      var l = a.Da;
      tt || E(), de || (tt(), de = !0), A.add(l, a), a.A = 0;
    }
  }
  function oo(a) {
    return a.g || a.v || a.A >= 3 ? !1 : (a.Y++, a.v = gr(c(a.Da, a), ru(a, a.A)), a.A++, !0);
  }
  r.Da = function() {
    if (this.v = null, tu(this), this.aa && !(this.P || this.g == null || this.T <= 0)) {
      var a = 4 * this.T;
      this.j.info("BP detection timer enabled: " + a), this.B = gr(c(this.Wa, this), a);
    }
  }, r.Wa = function() {
    this.B && (this.B = null, this.j.info("BP detection timeout reached."), this.j.info("Buffering proxy detected and switch to long-polling!"), this.F = !1, this.P = !0, Je(10), Os(this), tu(this));
  };
  function ao(a) {
    a.B != null && (o.clearTimeout(a.B), a.B = null);
  }
  function tu(a) {
    a.g = new Lt(a, a.j, "rpc", a.Y), a.u === null && (a.g.J = a.o), a.g.P = 0;
    var l = pt(a.na);
    Ce(l, "RID", "rpc"), Ce(l, "SID", a.M), Ce(l, "AID", a.K), Ce(l, "CI", a.F ? "0" : "1"), !a.F && a.ia && Ce(l, "TO", a.ia), Ce(l, "TYPE", "xmlhttp"), Rr(a, l), a.u && a.o && so(l, a.u, a.o), a.O && (a.g.H = a.O);
    var h = a.g;
    a = a.ba, h.M = 1, h.A = vs(pt(l)), h.u = null, h.R = !0, bB(h, a);
  }
  r.Va = function() {
    this.C != null && (this.C = null, Os(this), oo(this), Je(19));
  };
  function Ns(a) {
    a.C != null && (o.clearTimeout(a.C), a.C = null);
  }
  function nu(a, l) {
    var h = null;
    if (a.g == l) {
      Ns(a), ao(a), a.g = null;
      var d = 2;
    } else if (eo(a.h, l)) h = l.G, LB(a.h, l), d = 1;
    else return;
    if (a.I != 0) {
      if (l.o) if (d == 1) {
        h = l.u ? l.u.length : 0, l = Date.now() - l.F;
        var R = a.D;
        d = ws(), je(d, new wB(d, h)), Ss(a);
      } else eu(a);
      else if (R = l.m, R == 3 || R == 0 && l.X > 0 || !(d == 1 && Df(a, l) || d == 2 && oo(a))) switch (h && h.length > 0 && (l = a.h, l.i = l.i.concat(h)), R) {
        case 1:
          Cn(a, 5);
          break;
        case 4:
          Cn(a, 10);
          break;
        case 3:
          Cn(a, 6);
          break;
        default:
          Cn(a, 2);
      }
    }
  }
  function ru(a, l) {
    let h = a.Qa + Math.floor(Math.random() * a.Za);
    return a.isActive() || (h *= 2), h * l;
  }
  function Cn(a, l) {
    if (a.j.info("Error code " + l), l == 2) {
      var h = c(a.bb, a), d = a.Ua;
      const R = !d;
      d = new xt(d || "//www.google.com/images/cleardot.gif"), o.location && o.location.protocol == "http" || Dr(d, "https"), vs(d), R ? ff(d.toString(), h) : df(d.toString(), h);
    } else Je(2);
    a.I = 0, a.l && a.l.pa(l), su(a), WB(a);
  }
  r.bb = function(a) {
    a ? (this.j.info("Successfully pinged google.com"), Je(2)) : (this.j.info("Failed to ping google.com"), Je(1));
  };
  function su(a) {
    if (a.I = 0, a.ja = [], a.l) {
      const l = xB(a.h);
      (l.length != 0 || a.i.length != 0) && (b(a.ja, l), b(a.ja, a.i), a.h.i.length = 0, y(a.i), a.i.length = 0), a.l.oa();
    }
  }
  function iu(a, l, h) {
    var d = h instanceof xt ? pt(h) : new xt(h);
    if (d.g != "") l && (d.g = l + "." + d.g), _r(d, d.u);
    else {
      var R = o.location;
      d = R.protocol, l = l ? l + "." + R.hostname : R.hostname, R = +R.port;
      const S = new xt(null);
      d && Dr(S, d), l && (S.g = l), R && _r(S, R), h && (S.h = h), d = S;
    }
    return h = a.G, l = a.wa, h && l && Ce(d, h, l), Ce(d, "VER", a.ka), Rr(a, d), d;
  }
  function ou(a, l, h) {
    if (l && !a.L) throw Error("Can't create secondary domain capable XhrIo object.");
    return l = a.Aa && !a.ma ? new pe(new ro({ ab: h })) : new pe(a.ma), l.Fa(a.L), l;
  }
  r.isActive = function() {
    return !!this.l && this.l.isActive(this);
  };
  function au() {
  }
  r = au.prototype, r.ra = function() {
  }, r.qa = function() {
  }, r.pa = function() {
  }, r.oa = function() {
  }, r.isActive = function() {
    return !0;
  }, r.Ka = function() {
  };
  function Fs() {
  }
  Fs.prototype.g = function(a, l) {
    return new nt(a, l);
  };
  function nt(a, l) {
    Ve.call(this), this.g = new YB(l), this.l = a, this.h = l && l.messageUrlParams || null, a = l && l.messageHeaders || null, l && l.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" }), this.g.o = a, a = l && l.initMessageHeaders || null, l && l.messageContentType && (a ? a["X-WebChannel-Content-Type"] = l.messageContentType : a = { "X-WebChannel-Content-Type": l.messageContentType }), l && l.sa && (a ? a["X-WebChannel-Client-Profile"] = l.sa : a = { "X-WebChannel-Client-Profile": l.sa }), this.g.U = a, (a = l && l.Qb) && !D(a) && (this.g.u = a), this.A = l && l.supportsCrossDomainXhr || !1, this.v = l && l.sendRawJson || !1, (l = l && l.httpSessionIdParam) && !D(l) && (this.g.G = l, a = this.h, a !== null && l in a && (a = this.h, l in a && delete a[l])), this.j = new Fn(this);
  }
  f(nt, Ve), nt.prototype.m = function() {
    this.g.l = this.j, this.A && (this.g.L = !0), this.g.connect(this.l, this.h || void 0);
  }, nt.prototype.close = function() {
    io(this.g);
  }, nt.prototype.o = function(a) {
    var l = this.g;
    if (typeof a == "string") {
      var h = {};
      h.__data__ = a, a = h;
    } else this.v && (h = {}, h.__data__ = Ki(a), a = h);
    l.i.push(new of(l.Ya++, a)), l.I == 3 && Ss(l);
  }, nt.prototype.N = function() {
    this.g.l = null, delete this.j, io(this.g), delete this.g, nt.Z.N.call(this);
  };
  function Bu(a) {
    Qi.call(this), a.__headers__ && (this.headers = a.__headers__, this.statusCode = a.__status__, delete a.__headers__, delete a.__status__);
    var l = a.__sm__;
    if (l) {
      e: {
        for (const h in l) {
          a = h;
          break e;
        }
        a = void 0;
      }
      (this.i = a) && (a = this.i, l = l !== null && a in l ? l[a] : void 0), this.data = l;
    } else this.data = a;
  }
  f(Bu, Qi);
  function uu() {
    zi.call(this), this.status = 1;
  }
  f(uu, zi);
  function Fn(a) {
    this.g = a;
  }
  f(Fn, au), Fn.prototype.ra = function() {
    je(this.g, "a");
  }, Fn.prototype.qa = function(a) {
    je(this.g, new Bu(a));
  }, Fn.prototype.pa = function(a) {
    je(this.g, new uu());
  }, Fn.prototype.oa = function() {
    je(this.g, "b");
  }, Fs.prototype.createWebChannel = Fs.prototype.g, nt.prototype.send = nt.prototype.o, nt.prototype.open = nt.prototype.m, nt.prototype.close = nt.prototype.close, $c = function() {
    return new Fs();
  }, zc = function() {
    return ws();
  }, Qc = ln, Ko = { jb: 0, mb: 1, nb: 2, Hb: 3, Mb: 4, Jb: 5, Kb: 6, Ib: 7, Gb: 8, Lb: 9, PROXY: 10, NOPROXY: 11, Eb: 12, Ab: 13, Bb: 14, zb: 15, Cb: 16, Db: 17, fb: 18, eb: 19, gb: 20 }, Ts.NO_ERROR = 0, Ts.TIMEOUT = 8, Ts.HTTP_ERROR = 6, zs = Ts, TB.COMPLETE = "complete", Kc = TB, DB.EventType = fr, fr.OPEN = "a", fr.CLOSE = "b", fr.ERROR = "c", fr.MESSAGE = "d", Ve.prototype.listen = Ve.prototype.J, Sr = DB, pe.prototype.listenOnce = pe.prototype.K, pe.prototype.getLastError = pe.prototype.Ha, pe.prototype.getLastErrorCode = pe.prototype.ya, pe.prototype.getStatus = pe.prototype.ca, pe.prototype.getResponseJson = pe.prototype.La, pe.prototype.getResponseText = pe.prototype.la, pe.prototype.send = pe.prototype.ea, pe.prototype.setWithCredentials = pe.prototype.Fa, qc = pe;
}).apply(typeof Ls < "u" ? Ls : typeof self < "u" ? self : typeof window < "u" ? window : {});
var x = class gn {
  static FOLD_CASE = 1;
  static LITERAL = 2;
  static CLASS_NL = 4;
  static DOT_NL = 8;
  static ONE_LINE = 16;
  static NON_GREEDY = 32;
  static PERL_X = 64;
  static UNICODE_GROUPS = 128;
  static WAS_DOLLAR = 256;
  static LOOKBEHIND = 512;
  static MATCH_NL = gn.CLASS_NL | gn.DOT_NL;
  static PERL = gn.CLASS_NL | gn.ONE_LINE | gn.PERL_X | gn.UNICODE_GROUPS;
  static POSIX = 0;
  static UNANCHORED = 0;
  static ANCHOR_START = 1;
  static ANCHOR_BOTH = 2;
};
const Ln = {
  CASE_INSENSITIVE: 1,
  DOTALL: 2,
  MULTILINE: 4,
  DISABLE_UNICODE_GROUPS: 8,
  LONGEST_MATCH: 16,
  LOOKBEHINDS: 512
}, Yr = 128, Qo = new Int32Array(Yr), zo = new Int32Array(Yr), xs = 65535;
for (let r = 0; r < Yr; r++)
  r >= 97 && r <= 122 ? Qo[r] = r - 32 : Qo[r] = r, r >= 65 && r <= 90 ? zo[r] = r + 32 : zo[r] = r;
var N = class {
  static CODES = /* @__PURE__ */ new Map([
    ["\x07", 7],
    ["\b", 8],
    ["	", 9],
    [`
`, 10],
    ["\v", 11],
    ["\f", 12],
    ["\r", 13],
    [" ", 32],
    ['"', 34],
    ["$", 36],
    ["&", 38],
    ["'", 39],
    ["(", 40],
    [")", 41],
    ["*", 42],
    ["+", 43],
    ["-", 45],
    [".", 46],
    ["0", 48],
    ["1", 49],
    ["2", 50],
    ["3", 51],
    ["4", 52],
    ["5", 53],
    ["6", 54],
    ["7", 55],
    ["8", 56],
    ["9", 57],
    [":", 58],
    ["<", 60],
    [">", 62],
    ["?", 63],
    ["A", 65],
    ["B", 66],
    ["C", 67],
    ["F", 70],
    ["P", 80],
    ["Q", 81],
    ["U", 85],
    ["Z", 90],
    ["[", 91],
    ["\\", 92],
    ["]", 93],
    ["^", 94],
    ["_", 95],
    ["`", 96],
    ["a", 97],
    ["b", 98],
    ["f", 102],
    ["i", 105],
    ["m", 109],
    ["n", 110],
    ["r", 114],
    ["s", 115],
    ["t", 116],
    ["v", 118],
    ["x", 120],
    ["z", 122],
    ["{", 123],
    ["|", 124],
    ["}", 125]
  ]);
  static toUpperCase(r) {
    if (r < Yr) return Qo[r];
    const e = String.fromCodePoint(r).toUpperCase(), t = e.codePointAt(0) > xs ? 2 : 1;
    if (e.length > t) return r;
    const n = String.fromCodePoint(e.codePointAt(0)).toLowerCase(), s = n.codePointAt(0) > xs ? 2 : 1;
    return n.length > s || n.codePointAt(0) !== r ? r : e.codePointAt(0);
  }
  static toLowerCase(r) {
    if (r < Yr) return zo[r];
    const e = String.fromCodePoint(r).toLowerCase(), t = e.codePointAt(0) > xs ? 2 : 1;
    if (e.length > t) return r;
    const n = String.fromCodePoint(e.codePointAt(0)).toUpperCase(), s = n.codePointAt(0) > xs ? 2 : 1;
    return n.length > s || n.codePointAt(0) !== r ? r : e.codePointAt(0);
  }
}, g = class {
  /**
  * @param {Uint32Array | number[]} data
  * @param {boolean} isStride1
  */
  constructor(r, e = !1) {
    this.data = r, this.isStride1 = e, this.SIZE = e ? 2 : 3;
  }
  getLo(r) {
    return this.data[r * this.SIZE];
  }
  getHi(r) {
    return this.data[r * this.SIZE + 1];
  }
  getStride(r) {
    return this.isStride1 ? 1 : this.data[r * this.SIZE + 2];
  }
  get length() {
    return this.data.length / this.SIZE;
  }
};
const Yc = /* @__PURE__ */ new Uint8Array(256);
for (let r = 0, e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-"; r < 64; r++) Yc[e.charCodeAt(r)] = r;
const Wc = (r) => {
  const e = [];
  let t = 0, n = 0;
  for (let s = 0; s < r.length; s++) {
    let i = Yc[r.charCodeAt(s)];
    t |= (i & 31) << n, (i & 32) === 0 ? (e.push(t), t = 0, n = 0) : n += 5;
  }
  return e;
}, p = (r, e) => {
  const t = Wc(r), n = e ? t.length / 2 : t.length / 3, s = new Uint32Array(n * 3);
  let i = 0, o = 0;
  for (let B = 0; B < n; B++)
    i += t[o++], s[B * 3] = i, i += t[o++], s[B * 3 + 1] = i, s[B * 3 + 2] = e ? 1 : t[o++];
  return s;
}, yp = (r) => {
  const e = Wc(r), t = /* @__PURE__ */ new Map();
  let n = 0;
  for (let s = 0; s < e.length; s += 2) {
    n += e[s];
    const i = e[s + 1], o = i >>> 1 ^ -(i & 1);
    t.set(n, n + o);
  }
  return t;
};
var Vs = class {
  constructor(r) {
    this.initializer = r, this.cache = /* @__PURE__ */ new Map();
  }
  has(r) {
    return r in this.initializer;
  }
  get(r) {
    if (this.cache.has(r)) return this.cache.get(r);
    const e = this.initializer[r], t = e ? e() : null;
    return this.cache.set(r, t), t;
  }
}, $e = class {
  static _CASE_ORBIT = null;
  static get CASE_ORBIT() {
    return this._CASE_ORBIT || (this._CASE_ORBIT = yp("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")), this._CASE_ORBIT;
  }
  static _Print = null;
  static get Print() {
    return this._Print || (this._Print = new g(p("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB", !1))), this._Print;
  }
  static CATEGORIES = new Vs({
    C: () => new g(p("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB", !1)),
    Cc: () => new g(p("AfgDgB", !0)),
    Cf: () => new g(p("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB", !1)),
    Cn: () => new g(p("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB", !1)),
    Co: () => new g(p("gg4B-nGh4hc9--BD9--B", !0)),
    Cs: () => new g(p("gg2B--B", !0)),
    L: () => new g(p("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB", !1)),
    LC: () => new g(p("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB", !1)),
    Ll: () => new g(p("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB", !1)),
    Lm: () => new g(p("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB", !1)),
    Lo: () => new g(p("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB", !1)),
    Lt: () => new g(p("lOGDnB2sH2sHBGBJHBJHBNQQwBAB", !1)),
    Lu: () => new g(p("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB", !1)),
    M: () => new g(p("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB", !1)),
    Mc: () => new g(p("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB", !1)),
    Me: () => new g(p("okBBB1xF-wB-wBBCBCCBsshBCB", !1)),
    Mn: () => new g(p("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB", !1)),
    N: () => new g(p("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB", !1)),
    Nd: () => new g(p("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ", !0)),
    Nl: () => new g(p("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB", !1)),
    No: () => new g(p("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB", !1)),
    P: () => new g(p("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB", !1)),
    Pc: () => new g(p("-Cg-Hg-HBUU-u3BBBZCBwHAB", !1)),
    Pd: () => new g(p("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J", !1)),
    Pe: () => new g(p("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD", !1)),
    Pf: () => new g(p("7F+6H+6HEddpuDCCFDDQEE", !1)),
    Pi: () => new g(p("rFt7Ht7HDBBDaapuDCCFDDQEE", !1)),
    Po: () => new g(p("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB", !1)),
    Ps: () => new g(p("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB", !1)),
    S: () => new g(p("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB", !1)),
    Sc: () => new g(p("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC", !1)),
    Sk: () => new g(p("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB", !1)),
    Sm: () => new g(p("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB", !1)),
    So: () => new g(p("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB", !1)),
    Z: () => new g(p("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB", !1)),
    Zl: () => new g(p("ohIA", !0)),
    Zp: () => new g(p("phIA", !0)),
    Zs: () => new g(p("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB", !1)),
    ASCII_Hex_Digit: () => new g(p("wBJIFbF", !0)),
    Alphabetic: () => new g(p("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB", !1)),
    Dash: () => new g(p("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J", !1)),
    Emoji: () => new g(p("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB", !1)),
    Emoji_Component: () => new g(p("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB", !1)),
    Emoji_Modifier: () => new g(p("7-8DE", !0)),
    Emoji_Modifier_Base: () => new g(p("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB", !1)),
    Emoji_Presentation: () => new g(p("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB", !1)),
    Extended_Pictographic: () => new g(p("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB", !1)),
    Hex_Digit: () => new g(p("wBJIFbFq1-BJIFbF", !0)),
    Lowercase: () => new g(p("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB", !1)),
    Math: () => new g(p("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB", !1)),
    Quotation_Mark: () => new g(p("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB", !1)),
    Terminal_Punctuation: () => new g(p("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB", !1)),
    Uppercase: () => new g(p("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB", !1)),
    White_Space: () => new g(p("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB", !1))
  });
  static get Upper() {
    return this.CATEGORIES.get("Lu");
  }
  static SCRIPTS = new Vs({
    Adlam: () => new g(p("go6DrCFJFB", !0)),
    Ahom: () => new g(p("g4lCaDOFW", !0)),
    Anatolian_Hieroglyphs: () => new g(p("ggxCmS", !0)),
    Arabic: () => new g(p("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB", !1)),
    Armenian: () => new g(p("xpBlBDxBDCks9BE", !0)),
    Avestan: () => new g(p("g4iC1BEG", !0)),
    Balinese: () => new g(p("g4GsCCxB", !0)),
    Bamum: () => new g(p("g1pB3CpowB4R", !0)),
    Bassa_Vah: () => new g(p("w26CdDF", !0)),
    Batak: () => new g(p("g+GzBJD", !0)),
    Bengali: () => new g(p("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB", !1)),
    Beria_Erfe: () => new g(p("g17CYDY", !0)),
    Bhaiksuki: () => new g(p("ggnCICsBCNLc", !0)),
    Bopomofo: () => new g(p("qXB6wLqBxDf", !0)),
    Brahmi: () => new g(p("ggkCtCFjBKA", !0)),
    Braille: () => new g(p("ggK-H", !0)),
    Buginese: () => new g(p("gwGbDB", !0)),
    Buhid: () => new g(p("g6FT", !0)),
    Canadian_Aboriginal: () => new g(p("ggF-TxRlC7tgCP", !0)),
    Carian: () => new g(p("g1gCwB", !0)),
    Caucasian_Albanian: () => new g(p("wphCzBMA", !0)),
    Chakma: () => new g(p("gokC0BCR", !0)),
    Cham: () => new g(p("gwqB2BKNDJDD", !0)),
    Cherokee: () => new g(p("g9E1CDFz7lBvC", !0)),
    Chorasmian: () => new g(p("w9jCb", !0)),
    Common: () => new g(p("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB", !1)),
    Coptic: () => new g(p("ifNxkKzDGG", !0)),
    Cuneiform: () => new g(p("ggoC5cnDuDCEMjG", !0)),
    Cypriot: () => new g(p("ggiCFBDCCBqBBCBBEDD", !1)),
    Cypro_Minoan: () => new g(p("w8rCiD", !0)),
    Cyrillic: () => new g(p("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB", !1)),
    Deseret: () => new g(p("gghCvC", !0)),
    Devanagari: () => new g(p("goCwCFODZh7nBfhwcJ", !0)),
    Dives_Akuru: () => new g(p("gomCGBDDDBGBCBBCdBCBBDLBKJB", !1)),
    Dogra: () => new g(p("ggmC7B", !0)),
    Duployan: () => new g(p("ggvDqDGMEIIJDD", !0)),
    Egyptian_Hieroglyphs: () => new g(p("ggsC1iBL68D", !0)),
    Elbasan: () => new g(p("gohCnB", !0)),
    Elymaic: () => new g(p("g-jCW", !0)),
    Ethiopic: () => new g(p("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB", !1)),
    Garay: () => new g(p("gqjClBEcJB", !0)),
    Georgian: () => new g(p("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG", !1)),
    Glagolitic: () => new g(p("ggL-Ch9sDGCQDGCBCE", !0)),
    Gothic: () => new g(p("w5gCa", !0)),
    Grantha: () => new g(p("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB", !1)),
    Greek: () => new g(p("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB", !1)),
    Gujarati: () => new g(p("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB", !1)),
    Gunjala_Gondi: () => new g(p("grnCFCBCkBCBCFIJ", !0)),
    Gurmukhi: () => new g(p("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB", !1)),
    Gurung_Khema: () => new g(p("go4C5B", !0)),
    Han: () => new g(p("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB", !1)),
    Hangul: () => new g(p("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC", !0)),
    Hanifi_Rohingya: () => new g(p("gojCnBJJ", !0)),
    Hanunoo: () => new g(p("g5FU", !0)),
    Hatran: () => new g(p("gniCSCBGE", !0)),
    Hebrew: () => new g(p("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB", !1)),
    Hiragana: () => new g(p("hiM1CBHCBi7-C+IBTeeBBBulQAB", !1)),
    Imperial_Aramaic: () => new g(p("giiCVCI", !0)),
    Inherited: () => new g(p("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB", !1)),
    Inscriptional_Pahlavi: () => new g(p("g7iCSGH", !0)),
    Inscriptional_Parthian: () => new g(p("g6iCVDH", !0)),
    Javanese: () => new g(p("gsqBtCDJFB", !0)),
    Kaithi: () => new g(p("gkkCiCLA", !0)),
    Kannada: () => new g(p("gkDMCCCWCJCEDICCCDIBGCCDDJCC", !0)),
    Katakana: () => new g(p("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB", !1)),
    Kawi: () => new g(p("g4nCQCoBEc", !0)),
    Kayah_Li: () => new g(p("goqBtBCA", !0)),
    Kharoshthi: () => new g(p("gwiCDCBGHCCCcDCFJII", !0)),
    Khitan_Small_Script: () => new g(p("k-7C84G84GB0OBqBAB", !1)),
    Khmer: () => new g(p("g8F9CDJHJnPf", !0)),
    Khojki: () => new g(p("gwkCRCuB", !0)),
    Khudawadi: () => new g(p("w1kC6BGJ", !0)),
    Kirat_Rai: () => new g(p("gq7C5B", !0)),
    Lao: () => new g(p("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB", !1)),
    Latin: () => new g(p("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB", !1)),
    Lepcha: () => new g(p("ggH3BEOEC", !0)),
    Limbu: () => new g(p("goGeBCLBFLBFEEBKB", !1)),
    Linear_A: () => new g(p("gwhC2JKVLH", !0)),
    Linear_B: () => new g(p("gggCLCZCSCBCODNjB6D", !0)),
    Lisu: () => new g(p("wmpBvBx1eA", !0)),
    Lycian: () => new g(p("g0gCc", !0)),
    Lydian: () => new g(p("gpiCZGA", !0)),
    Mahajani: () => new g(p("wqkCmB", !0)),
    Makasar: () => new g(p("g3nCY", !0)),
    Malayalam: () => new g(p("goDMCCCyBCCCFFPDZ", !0)),
    Mandaic: () => new g(p("giCbDA", !0)),
    Manichaean: () => new g(p("g2iCmBFL", !0)),
    Marchen: () => new g(p("wjnCfDVCN", !0)),
    Masaram_Gondi: () => new g(p("gonCGBCBBCrBBECCBCCBHBJJB", !1)),
    Medefaidrin: () => new g(p("gy7C6C", !0)),
    Meetei_Mayek: () => new g(p("g3qBWqGtBDJ", !0)),
    Mende_Kikakui: () => new g(p("gg6DkGDP", !0)),
    Meroitic_Cursive: () => new g(p("gtiCXFTDtB", !0)),
    Meroitic_Hieroglyphs: () => new g(p("gsiCf", !0)),
    Miao: () => new g(p("g47CqCF4BIQ", !0)),
    Modi: () => new g(p("gwlCkCMJ", !0)),
    Mongolian: () => new g(p("ggGBBDCCBSBH4CBIqBB2t-BMB", !1)),
    Mro: () => new g(p("gy6CeCJFB", !0)),
    Multani: () => new g(p("g0kCGBCCCBCBCOBCKB", !1)),
    Myanmar: () => new g(p("ggE-EhqmBeiDfxibT", !0)),
    Nabataean: () => new g(p("gkiCeJI", !0)),
    Nag_Mundari: () => new g(p("wm5DpB", !0)),
    Nandinagari: () => new g(p("gtmCHDtBDK", !0)),
    New_Tai_Lue: () => new g(p("gsGrBFZHKEB", !0)),
    Newa: () => new g(p("gglC7CCE", !0)),
    Nko: () => new g(p("g+B6BDC", !0)),
    Nushu: () => new g(p("h-7CvsQvsQBqMB", !1)),
    Nyiakeng_Puachue_Hmong: () => new g(p("go4DsBENDJFB", !0)),
    Ogham: () => new g(p("g0Fc", !0)),
    Ol_Chiki: () => new g(p("wiHvB", !0)),
    Ol_Onal: () => new g(p("wu5DqBFA", !0)),
    Old_Hungarian: () => new g(p("gkjCyBOyBIF", !0)),
    Old_Italic: () => new g(p("g4gCjBKC", !0)),
    Old_North_Arabian: () => new g(p("g0iCf", !0)),
    Old_Permic: () => new g(p("w6gCqB", !0)),
    Old_Persian: () => new g(p("g9gCjBFN", !0)),
    Old_Sogdian: () => new g(p("g4jCnB", !0)),
    Old_South_Arabian: () => new g(p("gziCf", !0)),
    Old_Turkic: () => new g(p("ggjCoC", !0)),
    Old_Uyghur: () => new g(p("w7jCZ", !0)),
    Oriya: () => new g(p("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR", !0)),
    Osage: () => new g(p("wlhCjBFjB", !0)),
    Osmanya: () => new g(p("gkhCdDJ", !0)),
    Pahawh_Hmong: () => new g(p("g46ClCLJCGCUGS", !0)),
    Palmyrene: () => new g(p("gjiCf", !0)),
    Pau_Cin_Hau: () => new g(p("g2mC4B", !0)),
    Phags_Pa: () => new g(p("giqB3B", !0)),
    Phoenician: () => new g(p("goiCbEA", !0)),
    Psalter_Pahlavi: () => new g(p("g8iCRIDNG", !0)),
    Rejang: () => new g(p("wpqBjBMA", !0)),
    Runic: () => new g(p("g1FqCEK", !0)),
    Samaritan: () => new g(p("ggCtBDO", !0)),
    Saurashtra: () => new g(p("gkqBlCJL", !0)),
    Sharada: () => new g(p("gskC-ChsCH", !0)),
    Shavian: () => new g(p("wihCvB", !0)),
    Siddham: () => new g(p("gslC1BDlB", !0)),
    Sidetic: () => new g(p("gqiCZ", !0)),
    SignWriting: () => new g(p("gg2DrUQECO", !0)),
    Sinhala: () => new g(p("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB", !1)),
    Sogdian: () => new g(p("w5jCpB", !0)),
    Sora_Sompeng: () => new g(p("wmkCYIJ", !0)),
    Soyombo: () => new g(p("wymCyC", !0)),
    Sundanese: () => new g(p("g8G-BhIH", !0)),
    Sunuwar: () => new g(p("g+mChBPJ", !0)),
    Syloti_Nagri: () => new g(p("ggqBsB", !0)),
    Syriac: () => new g(p("g4BNC7BDCxIK", !0)),
    Tagalog: () => new g(p("g4FVKA", !0)),
    Tagbanwa: () => new g(p("g7FMCCCB", !0)),
    Tai_Le: () => new g(p("wqGdDE", !0)),
    Tai_Tham: () => new g(p("gxG+BCcDKHJHN", !0)),
    Tai_Viet: () => new g(p("g0qBiCZE", !0)),
    Tai_Yo: () => new g(p("g25DeCVJB", !0)),
    Takri: () => new g(p("g0lC5BHJ", !0)),
    Tamil: () => new g(p("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB", !1)),
    Tangsa: () => new g(p("wz6CuCCJ", !0)),
    Tangut: () => new g(p("g-7CgBgBB+3GBhQeBiDyDB", !1)),
    Telugu: () => new g(p("ggDMCCCWCPDICCCDIBCCCBDDDJII", !0)),
    Thaana: () => new g(p("g8BxB", !0)),
    Thai: () => new g(p("hwD5BGb", !0)),
    Tibetan: () => new g(p("g4DnCCjBFmBCjBCOCGFB", !0)),
    Tifinagh: () => new g(p("wpL3BIBPA", !0)),
    Tirhuta: () => new g(p("gklCnCJJ", !0)),
    Todhri: () => new g(p("guhCzB", !0)),
    Tolong_Siki: () => new g(p("wtnCrBFJ", !0)),
    Toto: () => new g(p("w04De", !0)),
    Tulu_Tigalari: () => new g(p("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB", !1)),
    Ugaritic: () => new g(p("g8gCdCA", !0)),
    Unknown: () => new g(p("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB", !1)),
    Vai: () => new g(p("gopBrJ", !0)),
    Vithkuqi: () => new g(p("wrhCKCOCGCBCKCOCGCB", !0)),
    Wancho: () => new g(p("g24D5BGA", !0)),
    Warang_Citi: () => new g(p("glmCyCNA", !0)),
    Yezidi: () => new g(p("g0jCpBCCDB", !0)),
    Yi: () => new g(p("ggoBskBE2B", !0)),
    Zanabazar_Square: () => new g(p("gwmCnC", !0))
  });
  static FOLD_CATEGORIES = new Vs({
    L: () => new g(p("laA", !0)),
    LC: () => new g(p("laA", !0)),
    Ll: () => new g(p("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB", !1)),
    Lt: () => new g(p("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB", !1)),
    Lu: () => new g(p("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB", !1)),
    M: () => new g(p("5cgBgBlgHAB", !1)),
    Mn: () => new g(p("5cgBgBlgHAB", !1)),
    Emoji: () => new g(p("8mJA", !0)),
    Extended_Pictographic: () => new g(p("8mJA", !0)),
    Lowercase: () => new g(p("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB", !1)),
    Math: () => new g(p("ycGDCHHFMMDDDCHHFAB", !1)),
    Uppercase: () => new g(p("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB", !1))
  });
  static FOLD_SCRIPT = new Vs({
    Common: () => new g(p("8cgBgB", !1)),
    Greek: () => new g(p("1FwUwU", !1)),
    Inherited: () => new g(p("5cgBgBlgHAB", !1))
  });
}, J = class ut {
  static MAX_RUNE = 1114111;
  static MAX_ASCII = 127;
  static MAX_LATIN1 = 255;
  static MAX_BMP = 65535;
  static MIN_FOLD = 65;
  static MAX_FOLD = 125251;
  static MIN_HIGH_SURROGATE = 55296;
  static MAX_HIGH_SURROGATE = 56319;
  static MIN_LOW_SURROGATE = 56320;
  static MAX_LOW_SURROGATE = 57343;
  static MIN_SUPPLEMENTARY_CODE_POINT = 65536;
  static is32(e, t) {
    let n = 0, s = e.length;
    for (; n < s; ) {
      const i = n + Math.floor((s - n) / 2), o = e.getLo(i), B = e.getHi(i);
      if (o <= t && t <= B) {
        const u = e.getStride(i);
        return (t - o) % u === 0;
      }
      t < o ? s = i : n = i + 1;
    }
    return !1;
  }
  static is(e, t) {
    if (t <= ut.MAX_LATIN1) {
      for (let n = 0; n < e.length; n++) {
        if (t > e.getHi(n)) continue;
        const s = e.getLo(n);
        if (t < s) return !1;
        const i = e.getStride(n);
        return (t - s) % i === 0;
      }
      return !1;
    }
    return e.length > 0 && t >= e.getLo(0) && ut.is32(e, t);
  }
  static isUpper(e) {
    if (e <= ut.MAX_LATIN1) {
      const t = String.fromCodePoint(e);
      return t.toUpperCase() === t && t.toLowerCase() !== t;
    }
    return ut.is($e.Upper, e);
  }
  static isPrint(e) {
    return e <= ut.MAX_LATIN1 ? e >= 32 && e < ut.MAX_ASCII || e >= 161 && e !== 173 : ut.is($e.Print, e);
  }
  static simpleFold(e) {
    if ($e.CASE_ORBIT.has(e)) return $e.CASE_ORBIT.get(e);
    const t = N.toLowerCase(e);
    return t !== e ? t : N.toUpperCase(e);
  }
  static equalsIgnoreCase(e, t) {
    if (e === t) return !0;
    if (e < 0 || t < 0) return !1;
    if (e <= ut.MAX_ASCII && t <= ut.MAX_ASCII)
      return 65 <= e && e <= 90 && (e |= 32), 65 <= t && t <= 90 && (t |= 32), e === t;
    for (let n = ut.simpleFold(e); n !== e; n = ut.simpleFold(n)) if (n === t) return !0;
    return !1;
  }
};
const Da = 256, Xc = new Uint8Array(Da);
for (let r = 0; r < Da; r++) Xc[r] = 97 <= r && r <= 122 || 65 <= r && r <= 90 || 48 <= r && r <= 57 || r === 95 ? 1 : 0;
let Eo = null, Do = null;
var K = class rt {
  static METACHARACTERS = "\\.+*?()|[]{}^$";
  static EMPTY_BEGIN_LINE = 1;
  static EMPTY_END_LINE = 2;
  static EMPTY_BEGIN_TEXT = 4;
  static EMPTY_END_TEXT = 8;
  static EMPTY_WORD_BOUNDARY = 16;
  static EMPTY_NO_WORD_BOUNDARY = 32;
  static EMPTY_ALL = -1;
  static emptyInts() {
    return [];
  }
  static isByteArray(e) {
    return Array.isArray(e) || e instanceof Uint8Array;
  }
  static isalnum(e) {
    return N.CODES.get("0") <= e && e <= N.CODES.get("9") || N.CODES.get("a") <= e && e <= N.CODES.get("z") || N.CODES.get("A") <= e && e <= N.CODES.get("Z");
  }
  static unhex(e) {
    return N.CODES.get("0") <= e && e <= N.CODES.get("9") ? e - N.CODES.get("0") : N.CODES.get("a") <= e && e <= N.CODES.get("f") ? e - N.CODES.get("a") + 10 : N.CODES.get("A") <= e && e <= N.CODES.get("F") ? e - N.CODES.get("A") + 10 : -1;
  }
  static escapeRune(e) {
    let t = "";
    if (J.isPrint(e))
      rt.METACHARACTERS.indexOf(String.fromCodePoint(e)) >= 0 && (t += "\\"), t += String.fromCodePoint(e);
    else switch (e) {
      case N.CODES.get('"'):
        t += '\\"';
        break;
      case N.CODES.get("\\"):
        t += "\\\\";
        break;
      case N.CODES.get("	"):
        t += "\\t";
        break;
      case N.CODES.get(`
`):
        t += "\\n";
        break;
      case N.CODES.get("\r"):
        t += "\\r";
        break;
      case N.CODES.get("\b"):
        t += "\\b";
        break;
      case N.CODES.get("\f"):
        t += "\\f";
        break;
      default: {
        let n = e.toString(16);
        e < 256 ? (t += "\\x", n.length === 1 && (t += "0"), t += n) : t += `\\x{${n}}`;
        break;
      }
    }
    return t;
  }
  static stringToRunes(e) {
    const t = String(e), n = [];
    let s = 0;
    for (; s < t.length; ) {
      const i = t.codePointAt(s);
      n.push(i), s += i > J.MAX_BMP ? 2 : 1;
    }
    return n;
  }
  static runeToString(e) {
    return String.fromCodePoint(e);
  }
  static isWordRune(e) {
    return e < Da ? Xc[e] === 1 : !1;
  }
  static emptyOpContext(e, t) {
    let n = 0;
    return e < 0 && (n |= rt.EMPTY_BEGIN_TEXT | rt.EMPTY_BEGIN_LINE), e === 10 && (n |= rt.EMPTY_BEGIN_LINE), t < 0 && (n |= rt.EMPTY_END_TEXT | rt.EMPTY_END_LINE), t === 10 && (n |= rt.EMPTY_END_LINE), rt.isWordRune(e) !== rt.isWordRune(t) ? n |= rt.EMPTY_WORD_BOUNDARY : n |= rt.EMPTY_NO_WORD_BOUNDARY, n;
  }
  /**
  * Returns a string that quotes all regular expression metacharacters inside the argument text;
  * the returned string is a regular expression matching the literal text. For example,
  * {@code quoteMeta("[foo]").equals("\\[foo\\]")}.
  * @param {string} str
  * @returns {string}
  */
  static quoteMeta(e) {
    return e.split("").map((t) => rt.METACHARACTERS.indexOf(t) >= 0 ? `\\${t}` : t).join("");
  }
  static charCount(e) {
    return e > J.MAX_BMP ? 2 : 1;
  }
  /**
  * High-speed conversion from TypedArrays to standard JS Arrays.
  * Bypasses the expensive Symbol.iterator overhead of Array.from()
  */
  static toArray(e) {
    const t = e.length, n = new Array(t);
    for (let s = 0; s < t; s++) n[s] = e[s];
    return n;
  }
  static stringToUtf8ByteArray(e) {
    if (globalThis.TextEncoder)
      return Eo || (Eo = new TextEncoder()), Eo.encode(e);
    {
      let t = [], n = 0;
      for (let s = 0; s < e.length; s++) {
        let i = e.charCodeAt(s);
        i < 128 ? t[n++] = i : i < 2048 ? (t[n++] = i >> 6 | 192, t[n++] = i & 63 | 128) : (i & 64512) === J.MIN_HIGH_SURROGATE && s + 1 < e.length && (e.charCodeAt(s + 1) & 64512) === J.MIN_LOW_SURROGATE ? (i = J.MIN_SUPPLEMENTARY_CODE_POINT + ((i & 1023) << 10) + (e.charCodeAt(++s) & 1023), t[n++] = i >> 18 | 240, t[n++] = i >> 12 & 63 | 128, t[n++] = i >> 6 & 63 | 128, t[n++] = i & 63 | 128) : (t[n++] = i >> 12 | 224, t[n++] = i >> 6 & 63 | 128, t[n++] = i & 63 | 128);
      }
      return t;
    }
  }
  static utf8ByteArrayToString(e) {
    if (globalThis.TextDecoder) {
      Do || (Do = new TextDecoder("utf-8"));
      const t = e instanceof Uint8Array ? e : new Uint8Array(e);
      return Do.decode(t);
    } else {
      let t = [], n = 0, s = 0;
      for (; n < e.length; ) {
        let i = e[n++];
        if (i < 128) t[s++] = String.fromCharCode(i);
        else if (i > 191 && i < 224) {
          let o = e[n++];
          t[s++] = String.fromCharCode((i & 31) << 6 | o & 63);
        } else if (i > 239 && i < 365) {
          let o = e[n++], B = e[n++], u = e[n++], c = ((i & 7) << 18 | (o & 63) << 12 | (B & 63) << 6 | u & 63) - J.MIN_SUPPLEMENTARY_CODE_POINT;
          t[s++] = String.fromCharCode(J.MIN_HIGH_SURROGATE + (c >> 10)), t[s++] = String.fromCharCode(J.MIN_LOW_SURROGATE + (c & 1023));
        } else {
          let o = e[n++], B = e[n++];
          t[s++] = String.fromCharCode((i & 15) << 12 | (o & 63) << 6 | B & 63);
        }
      }
      return t.join("");
    }
  }
};
const Zc = (r = [], e = 0) => {
  const t = /* @__PURE__ */ Object.create(null);
  for (let n = 0; n < r.length; n++) {
    const s = r[n], i = e + n;
    t[s] = i, t[i] = s;
  }
  return Object.freeze(t);
};
var An = class $o {
  static Encoding = Zc(["UTF_16", "UTF_8"]);
  getEncoding() {
    throw Error("not implemented");
  }
  /** @returns {string} */
  asCharSequence() {
    throw Error("not implemented");
  }
  /** @returns {Uint8Array|number[]} */
  asBytes() {
    throw Error("not implemented");
  }
  /** @returns {number} */
  length() {
    throw Error("not implemented");
  }
  /**
  *
  * @returns {boolean}
  */
  isUTF8Encoding() {
    return this.getEncoding() === $o.Encoding.UTF_8;
  }
  /**
  *
  * @returns {boolean}
  */
  isUTF16Encoding() {
    return this.getEncoding() === $o.Encoding.UTF_16;
  }
}, Qu = class extends An {
  /** @param {Uint8Array|number[]|null} bytes */
  constructor(r = null) {
    super(), this.bytes = r;
  }
  getEncoding() {
    return An.Encoding.UTF_8;
  }
  /**
  *
  * @returns {string}
  */
  asCharSequence() {
    return K.utf8ByteArrayToString(this.bytes);
  }
  /**
  *
  * @returns {Uint8Array|number[]|null}
  */
  asBytes() {
    return this.bytes;
  }
  /**
  *
  * @returns {number}
  */
  length() {
    return this.bytes.length;
  }
}, Ip = class extends An {
  /** @param {string|null} charSequence */
  constructor(r = null) {
    super(), this.charSequence = r;
  }
  getEncoding() {
    return An.Encoding.UTF_16;
  }
  /**
  *
  * @returns {string}
  */
  asCharSequence() {
    return this.charSequence;
  }
  /**
  *
  * @returns {number[]}
  */
  asBytes() {
    return K.stringToUtf8ByteArray(this.charSequence.toString());
  }
  /**
  *
  * @returns {number}
  */
  length() {
    return this.charSequence.length;
  }
}, En = class {
  /**
  * Return the MatcherInput for UTF_16 encoding.
  * @returns {Utf16MatcherInput}
  */
  static utf16(r) {
    return new Ip(r);
  }
  /**
  * Return the MatcherInput for UTF_8 encoding.
  * @returns {Utf8MatcherInput}
  */
  static utf8(r) {
    return K.isByteArray(r) ? new Qu(r) : new Qu(K.stringToUtf8ByteArray(r));
  }
}, Ke = class {
  static EOF() {
    return -8;
  }
  constructor() {
    this.end = 0;
  }
  canCheckPrefix() {
    return !0;
  }
  endPos() {
    return this.end;
  }
  hasString() {
    return !1;
  }
  hasAnyString() {
    return !1;
  }
  prefixLength() {
    return 0;
  }
}, wp = class extends Ke {
  constructor(r, e = 0, t = r.length) {
    super(), this.bytes = r, this.start = e, this.end = t;
  }
  hasString(r, e) {
    const t = r.bytes;
    if (t.length === 0) return !0;
    const n = this.indexOf(this.bytes, t, this.start + e);
    return n !== -1 && n <= this.end - t.length;
  }
  hasAnyString(r, e) {
    return r.ac8 ? r.ac8.searchUTF8(this.bytes, this.start + e, this.end) : !1;
  }
  step(r) {
    if (r += this.start, r >= this.end) return Ke.EOF();
    const e = this.bytes[r] & 255;
    if (e < 128) return e << 3 | 1;
    if (e >= 194 && e <= 223 && r + 1 < this.end) {
      const t = this.bytes[r + 1] & 255;
      return (t & 192) !== 128 ? e << 3 | 1 : ((e & 31) << 6 | t & 63) << 3 | 2;
    } else if (e >= 224 && e <= 239 && r + 2 < this.end) {
      const t = this.bytes[r + 1] & 255;
      if ((t & 192) !== 128) return e << 3 | 1;
      const n = this.bytes[r + 2] & 255;
      return (n & 192) !== 128 ? e << 3 | 1 : ((e & 15) << 12 | (t & 63) << 6 | n & 63) << 3 | 3;
    } else if (e >= 240 && e <= 244 && r + 3 < this.end) {
      const t = this.bytes[r + 1] & 255;
      if ((t & 192) !== 128) return e << 3 | 1;
      const n = this.bytes[r + 2] & 255;
      if ((n & 192) !== 128) return e << 3 | 1;
      const s = this.bytes[r + 3] & 255;
      return (s & 192) !== 128 ? e << 3 | 1 : ((e & 7) << 18 | (t & 63) << 12 | (n & 63) << 6 | s & 63) << 3 | 4;
    } else return e << 3 | 1;
  }
  index(r, e) {
    e += this.start;
    const t = this.indexOf(this.bytes, r.prefixUTF8, e);
    return t < 0 ? t : t - e;
  }
  context(r) {
    r += this.start;
    let e = -1;
    if (r > this.start && r <= this.end) {
      let n = r - 1;
      if (e = this.bytes[n--], e >= 128) {
        let s = r - 4;
        for (s < this.start && (s = this.start); n >= s && (this.bytes[n] & 192) === 128; ) n--;
        n < this.start && (n = this.start), e = this.step(n - this.start) >> 3;
      }
    }
    const t = r < this.end ? this.step(r - this.start) >> 3 : -1;
    return K.emptyOpContext(e, t);
  }
  indexOf(r, e, t = 0) {
    let n = e.length;
    if (n === 0) return t <= this.end ? t : -1;
    const s = e[0];
    let i = this.end - n;
    const o = typeof r.indexOf == "function";
    let B = t;
    for (; B <= i; ) {
      if (o) {
        if (B = r.indexOf(s, B), B === -1 || B > i) return -1;
      } else {
        for (; B <= i && r[B] !== s; ) B++;
        if (B > i) return -1;
      }
      let u = !0;
      for (let c = 1; c < n; c++) if (r[B + c] !== e[c]) {
        u = !1;
        break;
      }
      if (u) return B;
      B++;
    }
    return -1;
  }
  prefixLength(r) {
    return r.prefixUTF8.length;
  }
}, Tp = class extends Ke {
  constructor(r, e = 0, t = r.length) {
    super(), this.charSequence = r, this.start = e, this.end = t;
  }
  hasString(r, e) {
    const t = this.charSequence.indexOf(r.str, this.start + e);
    return t !== -1 && t <= this.end - r.str.length;
  }
  hasAnyString(r, e) {
    return r.ac16 ? r.ac16.searchUTF16(this.charSequence, this.start + e, this.end) : !1;
  }
  step(r) {
    if (r += this.start, r >= this.end) return Ke.EOF();
    const e = this.charSequence.charCodeAt(r);
    if (e < J.MIN_HIGH_SURROGATE || e > J.MAX_HIGH_SURROGATE || r + 1 >= this.end) return e << 3 | 1;
    const t = this.charSequence.charCodeAt(r + 1);
    return t >= J.MIN_LOW_SURROGATE && t <= J.MAX_LOW_SURROGATE ? (e - J.MIN_HIGH_SURROGATE) * 1024 + (t - J.MIN_LOW_SURROGATE) + J.MIN_SUPPLEMENTARY_CODE_POINT << 3 | 2 : e << 3 | 1;
  }
  index(r, e) {
    e += this.start;
    const t = this.charSequence.indexOf(r.prefix, e);
    return t < 0 || t > this.end - r.prefix.length ? -1 : t - e;
  }
  context(r) {
    r += this.start;
    const e = r > this.start && r <= this.end ? this.charSequence.charCodeAt(r - 1) : -1, t = r < this.end ? this.charSequence.charCodeAt(r) : -1;
    return K.emptyOpContext(e, t);
  }
  prefixLength(r) {
    return r.prefix.length;
  }
}, fe = class {
  static fromUTF8(r, e = 0, t = r.length) {
    return new wp(r, e, t);
  }
  static fromUTF16(r, e = 0, t = r.length) {
    return new Tp(r, e, t);
  }
}, ls = class extends Error {
  /** @param {string} message */
  constructor(r) {
    super(r), this.name = "RE2JSException";
  }
}, he = class extends ls {
  /**
  * @param {string} error
  * @param {string|null} [input=null]
  */
  constructor(r, e = null) {
    let t = `error parsing regexp: ${r}`;
    e && (t += `: \`${e}\``), super(t), this.name = "RE2JSSyntaxException", this.message = t, this.error = r, this.input = e;
  }
  /**
  * Retrieves the description of the error.
  * @returns {string}
  */
  getDescription() {
    return this.error;
  }
  /**
  * Retrieves the erroneous regular-expression pattern.
  * @returns {string|null}
  */
  getPattern() {
    return this.input;
  }
}, Ap = class extends ls {
  /** @param {string} message */
  constructor(r) {
    super(r), this.name = "RE2JSCompileException";
  }
}, ze = class extends ls {
  /** @param {string} message */
  constructor(r) {
    super(r), this.name = "RE2JSGroupException";
  }
}, vp = class extends ls {
  /** @param {string} message */
  constructor(r) {
    super(r), this.name = "RE2JSFlagsException";
  }
}, Vr = class extends ls {
  /** @param {string} message */
  constructor(r) {
    super(r), this.name = "RE2JSInternalException";
  }
}, zu = class eh {
  /**
  * V8 and WebKit have historical hard limits on the number of arguments
  * that can be passed to a function. We cap replacer arguments to prevent
  * Call Stack Overflow (DoS) vulnerabilities on massive ASTs.
  */
  static MAX_REPLACER_ARGS = 65535;
  /**
  * Quotes '\' and '$' in {@code s}, so that the returned string could be used in
  * {@link #appendReplacement} as a literal replacement of {@code s}.
  *
  * @param {string} str the string to be quoted
  * @param {boolean} [javaMode=false] whether the replacement will be used in javaMode
  * @returns {string} the quoted string
  */
  static quoteReplacement(e, t = !1) {
    return t ? e.indexOf("\\") < 0 && e.indexOf("$") < 0 ? e : e.split("").map((n) => {
      const s = n.codePointAt(0);
      return s === N.CODES.get("\\") || s === N.CODES.get("$") ? `\\${n}` : n;
    }).join("") : e.indexOf("$") < 0 ? e : e.split("").map((n) => n.codePointAt(0) === N.CODES.get("$") ? "$$" : n).join("");
  }
  /**
  *
  * @param {import('./index.js').RE2JS} pattern
  * @param {string|number[]|Uint8Array|MatcherInputBase} input
  */
  constructor(e, t) {
    if (e === null) throw new Error("pattern is null");
    this.patternInput = e;
    const n = this.patternInput.re2();
    this.patternGroupCount = n.numberOfCapturingGroups(), this.groups = [], this.namedGroups = n.namedGroups, this.numberOfInstructions = n.numberOfInstructions(), t instanceof An ? this.resetMatcherInput(t) : K.isByteArray(t) ? this.resetMatcherInput(En.utf8(t)) : this.resetMatcherInput(En.utf16(t));
  }
  /**
  * Returns the {@code RE2JS} associated with this {@code Matcher}.
  * @returns {import('./index.js').RE2JS}
  */
  pattern() {
    return this.patternInput;
  }
  /**
  * Resets the {@code Matcher}, rewinding input and discarding any match information.
  *
  * @returns {Matcher} the {@code Matcher} itself, for chained method calls
  */
  reset() {
    return this.matcherInputLength = this.matcherInput.length(), this.appendPos = 0, this.hasMatch = !1, this.hasGroups = !1, this.anchorFlag = 0, this;
  }
  /**
  * Resets the {@code Matcher} and changes the input.
  * @param {string|number[]|Uint8Array|MatcherInputBase} input
  * @returns {Matcher} the {@code Matcher} itself, for chained method calls
  */
  resetMatcherInput(e) {
    if (e === null) throw new Error("input is null");
    return e instanceof An || (K.isByteArray(e) ? e = En.utf8(e) : e = En.utf16(e)), this.matcherInput = e, this.reset(), this;
  }
  /**
  * Returns the start of the named group of the most recent match, or -1 if the group was not
  * matched.
  * @param {string|number} [group=0]
  * @returns {number}
  */
  start(e = 0) {
    if (typeof e == "string") {
      const t = this.namedGroups[e];
      if (!Number.isFinite(t)) throw new ze(`group '${e}' not found`);
      e = t;
    }
    return this.loadGroup(e), this.groups[2 * e];
  }
  /**
  * Returns the end of the named group of the most recent match, or -1 if the group was not
  * matched.
  * @param {string|number} [group=0]
  * @returns {number}
  */
  end(e = 0) {
    if (typeof e == "string") {
      const t = this.namedGroups[e];
      if (!Number.isFinite(t)) throw new ze(`group '${e}' not found`);
      e = t;
    }
    return this.loadGroup(e), this.groups[2 * e + 1];
  }
  /**
  * Returns the program size of this pattern.
  *
  * <p>
  * Similar to the C++ implementation, the program size is a very approximate measure of a regexp's
  * "cost". Larger numbers are more expensive than smaller numbers.
  * </p>
  *
  * @returns {number} the program size of this pattern
  */
  programSize() {
    return this.numberOfInstructions;
  }
  /**
  * Returns the named group of the most recent match, or {@code null} if the group was not matched.
  * @param {string|number} [group=0]
  * @returns {string|null}
  */
  group(e = 0) {
    if (typeof e == "string") {
      const s = this.namedGroups[e];
      if (!Number.isFinite(s)) throw new ze(`group '${e}' not found`);
      e = s;
    }
    const t = this.start(e), n = this.end(e);
    return t < 0 && n < 0 ? null : this.substring(t, n);
  }
  /**
  * Returns a dictionary map of all named capturing groups and their matched values.
  * If a group was not matched, its value will be `null`.
  * @returns {Record<string, string|null>}
  */
  getNamedGroups() {
    if (!this.hasMatch) throw new ze("perhaps no match attempted");
    const e = /* @__PURE__ */ Object.create(null);
    for (const t of Object.keys(this.namedGroups)) e[t] = this.group(t);
    return e;
  }
  /**
  * Returns the number of subgroups in this pattern.
  *
  * @returns {number} the number of subgroups; the overall match (group 0) does not count
  */
  groupCount() {
    return this.patternGroupCount;
  }
  /**
  * Helper: finds subgroup information if needed for group.
  * @param {number} group
  * @private
  */
  loadGroup(e) {
    if (e < 0 || e > this.patternGroupCount) throw new ze(`Group index out of bounds: ${e}`);
    if (!this.hasMatch) throw new ze("perhaps no match attempted");
    if (e === 0 || this.hasGroups) return;
    const t = this.matcherInputLength, n = this.patternInput.re2().matchMachineInput(this.matcherInput, this.groups[0], t, this.anchorFlag, 1 + this.patternGroupCount);
    if (!n[0]) throw new ze("inconsistency in matching group data");
    this.groups = n[1], this.hasGroups = !0;
  }
  /**
  * Matches the entire input against the pattern (anchored start and end). If there is a match,
  * {@code matches} sets the match state to describe it.
  *
  * @returns {boolean} true if the entire input matches the pattern
  */
  matches() {
    return this.genMatch(0, x.ANCHOR_BOTH);
  }
  /**
  * Matches the beginning of input against the pattern (anchored start). If there is a match,
  * {@code lookingAt} sets the match state to describe it.
  *
  * @returns {boolean} true if the beginning of the input matches the pattern
  */
  lookingAt() {
    return this.genMatch(0, x.ANCHOR_START);
  }
  /**
  * Matches the input against the pattern (unanchored), starting at a specified position. If there
  * is a match, {@code find} sets the match state to describe it.
  *
  * @param {number|null} [start=null] the input position where the search begins
  * @returns {boolean} if it finds a match
  * @throws IndexOutOfBoundsException if start is not a valid input position
  */
  find(e = null) {
    if (e !== null) {
      if (e < 0 || e > this.matcherInputLength) throw new ze(`start index out of bounds: ${e}`);
      return this.reset(), this.genMatch(e, 0);
    }
    if (e = 0, this.hasMatch && (e = this.groups[1], this.groups[0] === this.groups[1])) {
      const t = (this.matcherInput.isUTF16Encoding() ? fe.fromUTF16(this.matcherInput.asCharSequence(), 0, this.matcherInputLength) : fe.fromUTF8(this.matcherInput.asBytes(), 0, this.matcherInputLength)).step(e);
      t < 0 ? e++ : e += t & 7;
    }
    return this.genMatch(e, x.UNANCHORED);
  }
  /**
  * Helper: does match starting at start, with RE2 anchor flag.
  * @param {number} startByte
  * @param {number} anchor
  * @returns {boolean}
  * @private
  */
  genMatch(e, t) {
    const n = this.patternInput.re2().matchMachineInput(this.matcherInput, e, this.matcherInputLength, t, 1);
    return n[0] ? (this.groups = n[1], this.hasMatch = !0, this.hasGroups = this.patternGroupCount === 0, this.anchorFlag = t, !0) : (this.hasMatch = !1, !1);
  }
  /**
  * Helper: return substring for [start, end).
  * @param {number} start
  * @param {number} end
  * @returns {string}
  */
  substring(e, t) {
    return this.matcherInput.isUTF8Encoding() ? K.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e, t)) : this.matcherInput.asCharSequence().substring(e, t).toString();
  }
  /**
  * Helper for Pattern: return input length.
  * @returns {number}
  */
  inputLength() {
    return this.matcherInputLength;
  }
  /**
  * Appends to result two strings: the text from the append position up to the beginning of the
  * most recent match, and then the replacement with submatch groups substituted for references of
  * the form {@code $n}, where {@code n} is the group number in decimal. It advances the append
  * position to where the most recent match ended.
  *
  * To embed a literal {@code $}, use \$ (actually {@code "\\$"} with string escapes). The escape
  * is only necessary when {@code $} is followed by a digit, but it is always allowed. Only
  * {@code $} and {@code \} need escaping, but any character can be escaped.
  *
  * The group number {@code n} in {@code $n} is always at least one digit and expands to use more
  * digits as long as the resulting number is a valid group number for this pattern. To cut it off
  * earlier, escape the first digit that should not be used.
  *
  * @param {string} replacement the replacement string
  * @param {boolean} [javaMode=false] activate java mode (different behaviour for capture groups and special characters)
  * @returns {string}
  * @throws IllegalStateException if there was no most recent match
  * @throws IndexOutOfBoundsException if replacement refers to an invalid group
  * @private
  */
  appendReplacement(e, t = !1) {
    let n = "";
    const s = this.start(), i = this.end();
    return this.appendPos < s && (n += this.substring(this.appendPos, s)), this.appendPos = i, n += t ? this.appendReplacementInternalJava(e) : this.appendReplacementInternalJs(e), n;
  }
  /**
  * @param {string} replacement - the replacement string
  * @returns {string}
  * @private
  */
  appendReplacementInternalJava(e) {
    let t = "", n = 0;
    const s = e.length;
    let i = 0;
    for (; i < s; ) {
      const o = e.codePointAt(i);
      if (o === N.CODES.get("\\")) {
        if (n < i && (t += e.substring(n, i)), i++, i >= s) throw new ze("character to be escaped is missing");
        n = i, i++;
        continue;
      }
      if (o === N.CODES.get("$")) {
        if (n < i && (t += e.substring(n, i)), i + 1 >= s) throw new ze("Illegal group reference: group index is missing");
        const B = e.codePointAt(i + 1);
        if (N.CODES.get("0") <= B && B <= N.CODES.get("9")) {
          let u = B - N.CODES.get("0"), c = i + 2;
          for (; c < s; c++) {
            const f = e.codePointAt(c);
            if (f < N.CODES.get("0") || f > N.CODES.get("9") || u * 10 + f - N.CODES.get("0") > this.patternGroupCount) break;
            u = u * 10 + f - N.CODES.get("0");
          }
          if (u > this.patternGroupCount) throw new ze(`n > number of groups: ${u}`);
          const C = this.group(u);
          C !== null && (t += C), i = c, n = i;
        } else if (B === N.CODES.get("{")) {
          let u = i + 2;
          for (; u < s && e.codePointAt(u) !== N.CODES.get("}"); ) u++;
          if (u >= s) throw new ze("named capture group is missing trailing '}'");
          const c = e.substring(i + 2, u), C = this.group(c);
          C !== null && (t += C), i = u + 1, n = i;
        } else throw new ze("Illegal group reference");
        continue;
      }
      i++;
    }
    return n < s && (t += e.substring(n, s)), t;
  }
  /**
  * @param {string} replacement - the replacement string
  * @returns {string}
  * @private
  */
  appendReplacementInternalJs(e) {
    let t = "", n = 0;
    const s = e.length;
    for (let i = 0; i < s - 1; i++) if (e.codePointAt(i) === N.CODES.get("$")) {
      let o = e.codePointAt(i + 1);
      if (N.CODES.get("$") === o) {
        n < i && (t += e.substring(n, i)), t += "$", i++, n = i + 1;
        continue;
      } else if (N.CODES.get("&") === o) {
        n < i && (t += e.substring(n, i));
        const B = this.group(0);
        B !== null ? t += B : t += "$&", i++, n = i + 1;
        continue;
      } else if (N.CODES.get("`") === o) {
        n < i && (t += e.substring(n, i)), t += this.substring(0, this.start(0)), i++, n = i + 1;
        continue;
      } else if (N.CODES.get("'") === o) {
        n < i && (t += e.substring(n, i)), t += this.substring(this.end(0), this.matcherInputLength), i++, n = i + 1;
        continue;
      } else if (N.CODES.get("1") <= o && o <= N.CODES.get("9")) {
        let B = o - N.CODES.get("0");
        for (n < i && (t += e.substring(n, i)), i += 2; i < s && (o = e.codePointAt(i), !(o < N.CODES.get("0") || o > N.CODES.get("9") || B * 10 + o - N.CODES.get("0") > this.patternGroupCount)); i++)
          B = B * 10 + o - N.CODES.get("0");
        if (B > this.patternGroupCount) {
          t += `$${B}`, n = i, i--;
          continue;
        }
        const u = this.group(B);
        u !== null && (t += u), n = i, i--;
        continue;
      } else if (o === N.CODES.get("<")) {
        n < i && (t += e.substring(n, i)), i++;
        let B = i + 1;
        for (; B < e.length && e.codePointAt(B) !== N.CODES.get(">") && e.codePointAt(B) !== N.CODES.get(" "); ) B++;
        if (B === e.length || e.codePointAt(B) !== N.CODES.get(">")) {
          t += e.substring(i - 1, B + 1), n = B + 1, i = B;
          continue;
        }
        const u = e.substring(i + 1, B);
        if (Object.prototype.hasOwnProperty.call(this.namedGroups, u)) {
          const c = this.group(u);
          c !== null && (t += c);
        } else t += `$<${u}>`;
        n = B + 1, i = B;
        continue;
      }
    }
    return n < s && (t += e.substring(n, s)), t;
  }
  /**
  * Return the substring of the input from the append position to the end of the
  * input.
  * @returns {string}
  */
  appendTail() {
    return this.substring(this.appendPos, this.matcherInputLength);
  }
  /**
  * Returns the input with all matches replaced by {@code replacement}, interpreted as for
  * {@code appendReplacement}.
  *
  * @param {string|((...args: any[]) => string)} replacement - the replacement string or a replacer function
  * @param {boolean} [javaMode=false] - activate java mode (different behaviour for capture groups and special characters)
  * @returns {string} the input string with the matches replaced
  * @throws IndexOutOfBoundsException if replacement refers to an invalid group and javaMode is true
  */
  replaceAll(e, t = !1) {
    return this.replace(e, !0, t);
  }
  /**
  * Returns the input with the first match replaced by {@code replacement}, interpreted as for
  * {@code appendReplacement}.
  *
  * @param {string|((...args: any[]) => string)} replacement - the replacement string or a replacer function
  * @param {boolean} [javaMode=false] - activate java mode (different behaviour for capture groups and special characters)
  * @returns {string} the input string with the first match replaced
  * @throws IndexOutOfBoundsException if replacement refers to an invalid group and javaMode is true
  */
  replaceFirst(e, t = !1) {
    return this.replace(e, !1, t);
  }
  /**
  * Helper: replaceAll/replaceFirst hybrid.
  * @param {string|((...args: any[]) => string)} replacement - the replacement string or a replacer function
  * @param {boolean} [all=true] - replace all matches
  * @param {boolean} [javaMode=false] - activate java mode (different behaviour for capture groups and special characters)
  * @returns {string}
  * @private
  */
  replace(e, t = !0, n = !1) {
    let s = "";
    this.reset();
    const i = typeof e == "function", o = Object.keys(this.namedGroups).length > 0;
    let B = null;
    if (i) {
      if (this.groupCount() >= eh.MAX_REPLACER_ARGS) throw new ze("Too many capture groups to safely invoke replacer function");
      B = this.matcherInput.isUTF8Encoding() ? this.matcherInput.asBytes() : this.matcherInput.asCharSequence();
    }
    for (; this.find() && (s += i ? this.appendReplacementFunc(e, o, B) : this.appendReplacement(e, n), !!t); )
      ;
    return s += this.appendTail(), s;
  }
  /**
  * Evaluates a replacer function for the current match and appends the result,
  * along with any un-matched preceding text, advancing the append position.
  * @param {Function} replacer - the replacer function
  * @param {boolean} hasNamedGroups - cached flag if pattern has named groups
  * @param {string|Uint8Array|number[]} originalInput - the cached original input reference
  * @returns {string} the evaluated string to append
  * @private
  */
  appendReplacementFunc(e, t, n) {
    let s = "";
    const i = this.start(), o = this.end();
    this.appendPos < i && (s += this.substring(this.appendPos, i)), this.appendPos = o;
    const B = this.buildReplacerArgs(i, t, n);
    return s += String(e(...B)), s;
  }
  /**
  * Builds the argument array for the replacer function matching the standard
  * JS String.prototype.replace(regex, replacer) signature.
  * @param {number} matchStart - the start index of the match
  * @param {boolean} hasNamedGroups - cached flag if pattern has named groups
  * @param {string|Uint8Array|number[]} originalInput - the cached original input reference
  * @returns {Array} array of arguments
  * @private
  */
  buildReplacerArgs(e, t, n) {
    const s = [this.group(0)], i = this.groupCount();
    for (let o = 1; o <= i; o++) {
      const B = this.start(o);
      B < 0 ? s.push(void 0) : s.push(this.substring(B, this.end(o)));
    }
    if (s.push(e), s.push(n), t) {
      const o = this.getNamedGroups();
      for (const B in o) o[B] === null && (o[B] = void 0);
      s.push(o);
    }
    return s;
  }
}, F = class Ne {
  static ALT = 1;
  static ALT_MATCH = 2;
  static CAPTURE = 3;
  static EMPTY_WIDTH = 4;
  static FAIL = 5;
  static MATCH = 6;
  static NOP = 7;
  static RUNE = 8;
  static RUNE1 = 9;
  static RUNE_ANY = 10;
  static RUNE_ANY_NOT_NL = 11;
  static LB_WRITE = 12;
  static LB_CHECK = 13;
  static isRuneOp(e) {
    return Ne.RUNE <= e && e <= Ne.RUNE_ANY_NOT_NL;
  }
  static escapeRunes(e) {
    let t = '"';
    for (let n of e) t += K.escapeRune(n);
    return t += '"', t;
  }
  constructor(e) {
    this.op = e, this.out = 0, this.arg = 0, this.runes = [], this.next = null;
  }
  matchRune(e) {
    if (this.runes.length === 1) {
      const o = this.runes[0];
      return (this.arg & x.FOLD_CASE) !== 0 ? J.equalsIgnoreCase(o, e) : e === o;
    }
    const t = this.runes.length;
    if (t === 0) return !1;
    if (t === 2 || t === 4 || t === 6 || t === 8) {
      for (let o = 0; o < t; o += 2) {
        if (e < this.runes[o]) return !1;
        if (e <= this.runes[o + 1]) return !0;
      }
      return !1;
    }
    let n = 0, s = t >> 1;
    for (; s > 1; ) {
      const o = s >> 1;
      n += this.runes[n + o << 1] <= e ? o : 0, s -= o;
    }
    n += this.runes[n << 1] <= e ? 1 : 0;
    const i = n - 1;
    return i >= 0 && e <= this.runes[i << 1 | 1];
  }
  matchRunePos(e) {
    if (this.runes.length === 1) {
      const o = this.runes[0];
      return (this.arg & x.FOLD_CASE) !== 0 ? J.equalsIgnoreCase(o, e) ? 0 : -1 : e === o ? 0 : -1;
    }
    const t = this.runes.length;
    if (t === 0) return -1;
    if (t === 2 || t === 4 || t === 6 || t === 8) {
      for (let o = 0; o < t; o += 2) {
        if (e < this.runes[o]) return -1;
        if (e <= this.runes[o + 1]) return Math.floor(o / 2);
      }
      return -1;
    }
    let n = 0, s = t >> 1;
    for (; s > 1; ) {
      const o = s >> 1;
      n += this.runes[n + o << 1] <= e ? o : 0, s -= o;
    }
    n += this.runes[n << 1] <= e ? 1 : 0;
    const i = n - 1;
    return i >= 0 && e <= this.runes[i << 1 | 1] ? i : -1;
  }
  /**
  *
  * @returns {string}
  */
  toString() {
    switch (this.op) {
      case Ne.ALT:
        return `alt -> ${this.out}, ${this.arg}`;
      case Ne.ALT_MATCH:
        return `altmatch -> ${this.out}, ${this.arg}`;
      case Ne.CAPTURE:
        return `cap ${this.arg} -> ${this.out}`;
      case Ne.EMPTY_WIDTH:
        return `empty ${this.arg} -> ${this.out}`;
      case Ne.MATCH:
        return `match${this.arg !== 0 ? ` ${this.arg}` : ""}`;
      case Ne.FAIL:
        return "fail";
      case Ne.NOP:
        return `nop -> ${this.out}`;
      case Ne.LB_WRITE:
        return `lbwrite ${this.arg} -> ${this.out}`;
      case Ne.LB_CHECK:
        return `lbcheck ${this.arg} -> ${this.out}`;
      case Ne.RUNE:
        return this.runes === null ? "rune <null>" : [
          "rune ",
          Ne.escapeRunes(this.runes),
          (this.arg & x.FOLD_CASE) !== 0 ? "/i" : "",
          " -> ",
          this.out
        ].join("");
      case Ne.RUNE1:
        return `rune1 ${Ne.escapeRunes(this.runes)} -> ${this.out}`;
      case Ne.RUNE_ANY:
        return `any -> ${this.out}`;
      case Ne.RUNE_ANY_NOT_NL:
        return `anynotnl -> ${this.out}`;
      default:
        throw new Error("unhandled case in Inst.toString");
    }
  }
}, $u = class {
  constructor(r) {
    this.sparse = new Int32Array(r), this.densePcs = new Int32Array(r), this.denseCaps = null, this.size = 0, this.ncap = 0;
  }
  init(r) {
    this.ncap = r;
    const e = this.densePcs.length * r;
    (!this.denseCaps || this.denseCaps.length < e) && (this.denseCaps = new Int32Array(e));
  }
  contains(r) {
    const e = this.sparse[r];
    return e < this.size && this.densePcs[e] === r;
  }
  isEmpty() {
    return this.size === 0;
  }
  add(r) {
    const e = this.size++;
    return this.sparse[r] = e, this.densePcs[e] = r, e;
  }
  clear() {
    this.size = 0;
  }
  toString() {
    let r = "{";
    for (let e = 0; e < this.size; e++)
      e !== 0 && (r += ", "), r += this.densePcs[e];
    return r += "}", r;
  }
}, Rp = class Yo {
  static fromRE2(e) {
    const t = new Yo();
    return t.prog = e.prog, t.re2 = e, t.q0 = new $u(t.prog.numInst()), t.q1 = new $u(t.prog.numInst()), t.matched = !1, t.matchcap = new Int32Array(t.prog.numCap < 2 ? 2 : t.prog.numCap), t.ncap = 0, t;
  }
  static fromMachine(e) {
    return Yo.fromRE2(e.re2);
  }
  constructor() {
    this.prog = null, this.re2 = null, this.q0 = null, this.q1 = null, this.matched = !1, this.matchcap = null, this.ncap = 0, this.lbTable = null;
  }
  init(e) {
    this.ncap = e, e > this.matchcap.length ? this.matchcap = new Int32Array(e).fill(-1) : this.matchcap.fill(-1), this.q0.init(e), this.q1.init(e), this.prog.numLb > 0 && ((!this.lbTable || this.lbTable.length < this.prog.numLb + 1) && (this.lbTable = new Int32Array(this.prog.numLb + 1)), this.lbTable.fill(-1));
  }
  submatches() {
    return this.ncap === 0 ? K.emptyInts() : K.toArray(this.matchcap.subarray(0, this.ncap));
  }
  match(e, t, n) {
    const s = this.re2.cond;
    if (s === K.EMPTY_ALL || (n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && t !== 0) return !1;
    this.matched = !1, this.matchcap.fill(-1);
    let i = this.prog.numLb > 0 ? 0 : t, o = t, B = this.q0, u = this.q1, c = e.step(i), C = c >> 3, f = c & 7, m = -1, y = 0;
    c !== Ke.EOF() && (c = e.step(i + f), m = c >> 3, y = c & 7);
    let b;
    for (i === 0 ? b = K.emptyOpContext(-1, C) : b = e.context(i); ; ) {
      if (B.isEmpty()) {
        if ((s & K.EMPTY_BEGIN_TEXT) !== 0 && i !== 0 || (n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && i !== 0 || this.matched) break;
        if (this.prog.numLb === 0 && this.re2.prefix.length !== 0 && m !== this.re2.prefixRune && e.canCheckPrefix()) {
          const z = e.index(this.re2, i);
          if (z < 0) break;
          i += z, c = e.step(i), C = c >> 3, f = c & 7, c = e.step(i + f), m = c >> 3, y = c & 7, b = e.context(i);
        }
      }
      if (i === 0 && this.prog.numLb > 0) for (let z = 0; z < this.prog.lbStarts.length; z++) this.add(B, this.prog.lbStarts[z], i, this.matchcap, 0, b);
      !this.matched && (i === 0 || n === x.UNANCHORED) && i >= o && (this.ncap > 0 && (this.matchcap[0] = i), this.add(B, this.prog.start, i, this.matchcap, 0, b));
      const V = i + f;
      if (b = e.context(V), this.step(B, u, i, V, C, b, n, i === e.endPos()), f === 0 || this.ncap === 0 && this.matched) break;
      i += f, C = m, f = y, C !== -1 && (c = e.step(i + f), m = c >> 3, y = c & 7);
      const j = B;
      B = u, u = j;
    }
    return u.clear(), this.matched;
  }
  matchSet(e, t, n) {
    const s = this.re2.cond;
    if (s === K.EMPTY_ALL) return [];
    if ((n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && t !== 0) return [];
    let i = this.prog.numLb > 0 ? 0 : t, o = t, B = this.q0, u = this.q1, c = e.step(i), C = c >> 3, f = c & 7, m = -1, y = 0;
    c !== Ke.EOF() && (c = e.step(i + f), m = c >> 3, y = c & 7);
    let b = i === 0 ? K.emptyOpContext(-1, C) : e.context(i);
    const V = /* @__PURE__ */ new Set();
    for (; !(B.isEmpty() && ((s & K.EMPTY_BEGIN_TEXT) !== 0 && i !== 0 || (n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && i !== 0)); ) {
      if (i === 0 && this.prog.numLb > 0) for (let ue = 0; ue < this.prog.lbStarts.length; ue++) this.add(B, this.prog.lbStarts[ue], i, this.matchcap, 0, b);
      (i === 0 || n === x.UNANCHORED) && i >= o && this.add(B, this.prog.start, i, this.matchcap, 0, b);
      const j = i + f;
      b = e.context(j);
      for (let ue = 0; ue < B.size; ue++) {
        const Ee = B.densePcs[ue], De = this.prog.inst[Ee], tt = ue * this.ncap;
        let de = !1;
        switch (De.op) {
          case F.MATCH:
            if (n === x.ANCHOR_BOTH && i !== e.endPos()) break;
            V.add(De.arg);
            break;
          case F.RUNE:
            de = De.matchRune(C);
            break;
          case F.RUNE1:
            de = C === De.runes[0];
            break;
          case F.RUNE_ANY:
            de = !0;
            break;
          case F.RUNE_ANY_NOT_NL:
            de = C !== 10;
            break;
          default:
            continue;
        }
        de && this.add(u, De.out, j, B.denseCaps, tt, b);
      }
      if (B.clear(), f === 0) break;
      i += f, C = m, f = y, C !== -1 && (c = e.step(i + f), m = c >> 3, y = c & 7);
      const z = B;
      B = u, u = z;
    }
    return u.clear(), Array.from(V).sort((j, z) => j - z);
  }
  step(e, t, n, s, i, o, B, u) {
    const c = this.re2.longest;
    for (let C = 0; C < e.size; C++) {
      const f = e.densePcs[C], m = C * this.ncap;
      if (c && this.matched && this.ncap > 0 && this.matchcap[0] < e.denseCaps[m]) continue;
      const y = this.prog.inst[f];
      let b = !1;
      switch (y.op) {
        case F.MATCH:
          if (B === x.ANCHOR_BOTH && !u) break;
          if (this.ncap > 0 && (!c || !this.matched || this.matchcap[1] < n)) {
            e.denseCaps[m + 1] = n;
            for (let V = 0; V < this.ncap; V++) this.matchcap[V] = e.denseCaps[m + V];
          }
          c || (e.size = 0), this.matched = !0;
          break;
        case F.RUNE:
          b = y.matchRune(i);
          break;
        case F.RUNE1:
          b = i === y.runes[0];
          break;
        case F.RUNE_ANY:
          b = !0;
          break;
        case F.RUNE_ANY_NOT_NL:
          b = i !== 10;
          break;
        default:
          continue;
      }
      b && this.add(t, y.out, s, e.denseCaps, m, o);
    }
    e.clear();
  }
  add(e, t, n, s, i, o) {
    for (; ; ) {
      if (t === 0 || e.contains(t)) return;
      const B = e.add(t), u = this.prog.inst[t];
      switch (u.op) {
        case F.FAIL:
          return;
        case F.ALT:
        case F.ALT_MATCH:
          this.add(e, u.out, n, s, i, o), t = u.arg;
          continue;
        case F.EMPTY_WIDTH:
          if ((u.arg & ~o) === 0) {
            t = u.out;
            continue;
          }
          return;
        case F.NOP:
          t = u.out;
          continue;
        case F.CAPTURE:
          if (u.arg < this.ncap) {
            const c = s[i + u.arg];
            s[i + u.arg] = n, this.add(e, u.out, n, s, i, o), s[i + u.arg] = c;
            return;
          } else {
            t = u.out;
            continue;
          }
        case F.LB_WRITE:
          this.lbTable[Math.abs(u.arg)] = n, t = u.out;
          continue;
        case F.LB_CHECK:
          if (u.arg > 0) {
            if (this.lbTable[u.arg] === n) {
              t = u.out;
              continue;
            }
          } else if (this.lbTable[-u.arg] !== n) {
            t = u.out;
            continue;
          }
          return;
        case F.MATCH:
        case F.RUNE:
        case F.RUNE1:
        case F.RUNE_ANY:
        case F.RUNE_ANY_NOT_NL:
          if (this.ncap > 0) {
            const c = B * this.ncap;
            for (let C = 0; C < this.ncap; C++) e.denseCaps[c + C] = s[i + C];
          }
          return;
        default:
          throw new Vr("unhandled");
      }
    }
  }
};
const Yu = (r) => {
  let e = -2128831035;
  for (let t = 0; t < r.length; t++)
    e ^= r[t], e = Math.imul(e, 16777619);
  return e;
}, bp = (r, e) => {
  if (r.length !== e.length) return !1;
  for (let t = 0; t < r.length; t++) if (r[t] !== e[t]) return !1;
  return !0;
};
var Op = class {
  constructor(r, e, t = []) {
    this.nfaStates = r, this.isMatch = e, this.matchIDs = t, this.nextLatin1 = new Array(J.MAX_LATIN1 + 1).fill(null), this.nextLatin1Anchored = new Array(J.MAX_LATIN1 + 1).fill(null), this.transKeys = [], this.transVals = [], this.lastSeen = 0;
  }
}, Sp = class Wo {
  static MAX_CACHE_CLEARS = 5;
  static STATE_MEMORY_ESTIMATE = 838;
  constructor(e, t = 8388608) {
    this.prog = e, this.stateCache = /* @__PURE__ */ new Map(), this.stateCount = 0, this.startState = null, this.stateLimit = Math.max(1, Math.floor(t / Wo.STATE_MEMORY_ESTIMATE)), this.cacheClears = 0, this.failed = !1, this.clock = 0;
  }
  computeClosure(e) {
    const t = /* @__PURE__ */ new Set(), n = [...e];
    let s = !1;
    const i = [];
    for (; n.length > 0; ) {
      const B = n.pop();
      if (t.has(B)) continue;
      t.add(B);
      const u = this.prog.getInst(B);
      switch (u.op) {
        case F.MATCH:
          s = !0, i.includes(u.arg) || i.push(u.arg);
          break;
        case F.ALT:
        case F.ALT_MATCH:
          n.push(u.out), n.push(u.arg);
          break;
        case F.NOP:
        case F.CAPTURE:
          n.push(u.out);
          break;
        case F.EMPTY_WIDTH:
        case F.LB_WRITE:
        case F.LB_CHECK:
          return null;
      }
    }
    const o = Int32Array.from(t).sort();
    return i.sort((B, u) => B - u), {
      pcs: o,
      isMatch: s,
      matchIDs: i
    };
  }
  getState(e) {
    const t = this.computeClosure(e);
    if (!t) return null;
    const n = t.pcs, s = Yu(n);
    let i = this.stateCache.get(s);
    if (i) for (let B = 0; B < i.length; B++) {
      const u = i[B];
      if (bp(u.nfaStates, n))
        return u.lastSeen = ++this.clock, u;
    }
    else
      i = [], this.stateCache.set(s, i);
    if (this.failed) return null;
    if (this.stateCount >= this.stateLimit) {
      if (this.cacheClears++, this.cacheClears >= Wo.MAX_CACHE_CLEARS)
        return this.failed = !0, this.stateCache.clear(), this.stateCount = 0, this.startState = null, null;
      this.evictCache(), i = this.stateCache.get(s), i || (i = [], this.stateCache.set(s, i));
    }
    const o = new Op(n, t.isMatch, t.matchIDs);
    return o.lastSeen = ++this.clock, i.push(o), this.stateCount++, o;
  }
  evictCache() {
    const e = [];
    for (const o of this.stateCache.values()) for (let B = 0; B < o.length; B++) e.push(o[B]);
    e.sort((o, B) => o.lastSeen - B.lastSeen);
    const t = Math.max(1, Math.floor(this.stateLimit / 2)), n = e.length - t, s = e.slice(n), i = new Set(s);
    this.stateCache.clear(), this.stateCount = 0;
    for (let o = 0; o < s.length; o++) {
      const B = s[o];
      B.nextLatin1.fill(null), B.nextLatin1Anchored.fill(null), B.transKeys.length = 0, B.transVals.length = 0;
      const u = Yu(B.nfaStates);
      let c = this.stateCache.get(u);
      c || (c = [], this.stateCache.set(u, c)), c.push(B), this.stateCount++;
    }
    this.startState && !i.has(this.startState) && (this.startState = null);
  }
  step(e, t, n) {
    if (t <= J.MAX_LATIN1) if (n === x.UNANCHORED) {
      const o = e.nextLatin1[t];
      if (o !== null) return o;
    } else {
      const o = e.nextLatin1Anchored[t];
      if (o !== null) return o;
    }
    else {
      const o = t + (n === x.UNANCHORED ? 0 : J.MAX_RUNE + 1), B = e.transKeys, u = B.length;
      for (let c = 0; c < u; c++) if (B[c] === o) return e.transVals[c];
    }
    const s = [];
    for (let o = 0; o < e.nfaStates.length; o++) {
      const B = e.nfaStates[o], u = this.prog.getInst(B);
      F.isRuneOp(u.op) && u.matchRune(t) && s.push(u.out);
    }
    n === x.UNANCHORED && s.push(this.prog.start);
    const i = this.getState(s);
    if (t <= J.MAX_LATIN1) n === x.UNANCHORED ? e.nextLatin1[t] = i : e.nextLatin1Anchored[t] = i;
    else {
      const o = t + (n === x.UNANCHORED ? 0 : J.MAX_RUNE + 1);
      e.transKeys.push(o), e.transVals.push(i);
    }
    return i;
  }
  match(e, t, n) {
    if ((n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && t !== 0) return !1;
    if (!this.startState && (this.startState = this.getState([this.prog.start]), !this.startState))
      return null;
    let s = e.endPos(), i = this.startState;
    if (i.isMatch) if (n === x.ANCHOR_BOTH) {
      if (t === s) return !0;
    } else return !0;
    let o = t;
    for (; o < s; ) {
      const B = e.step(o), u = B >> 3, c = B & 7;
      if (c === 0) break;
      if (i = n === x.UNANCHORED && u <= J.MAX_LATIN1 && i.nextLatin1[u] || this.step(i, u, n), i === null) return null;
      if (i.lastSeen = ++this.clock, i.isMatch) if (n === x.ANCHOR_BOTH) {
        if (o + c === s) return !0;
      } else return !0;
      if (i.nfaStates.length === 0 && n !== x.UNANCHORED)
        return !1;
      o += c;
    }
    return !1;
  }
  matchSet(e, t, n) {
    if ((n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && t !== 0) return [];
    if (!this.startState && (this.startState = this.getState([this.prog.start]), !this.startState))
      return null;
    let s = e.endPos(), i = this.startState;
    const o = /* @__PURE__ */ new Set(), B = (c, C) => {
      c.isMatch && (n === x.ANCHOR_BOTH ? C === s && c.matchIDs.forEach((f) => o.add(f)) : c.matchIDs.forEach((f) => o.add(f)));
    };
    B(i, t);
    let u = t;
    for (; u < s; ) {
      const c = e.step(u), C = c >> 3, f = c & 7;
      if (f === 0) break;
      if (i = n === x.UNANCHORED && C <= J.MAX_LATIN1 && i.nextLatin1[C] || this.step(i, C, n), i === null) return null;
      if (i.lastSeen = ++this.clock, u += f, B(i, u), i.nfaStates.length === 0 && n !== x.UNANCHORED)
        break;
    }
    return Array.from(o).sort((c, C) => c - C);
  }
};
const Np = 32, Fp = 500, _o = 256, Pp = 256 * 1024;
var Lp = class {
  constructor() {
    this.end = 0, this.cap = /* @__PURE__ */ new Int32Array(0), this.matchcap = /* @__PURE__ */ new Int32Array(0), this.ncap = 0, this.jobPc = new Int32Array(_o), this.jobArg = new Uint8Array(_o), this.jobPos = new Int32Array(_o), this.jobLen = 0, this.visited = /* @__PURE__ */ new Uint32Array(0);
  }
  reset(r, e, t) {
    this.end = e, this.jobLen = 0, this.ncap = t;
    const n = r.numInst() * (e + 1) + Np - 1 >>> 5;
    this.visited.length < n ? this.visited = new Uint32Array(n) : this.visited.fill(0, 0, n), this.cap.length < t ? this.cap = new Int32Array(t).fill(-1) : this.cap.fill(-1, 0, t), this.matchcap.length < t ? this.matchcap = new Int32Array(t).fill(-1) : this.matchcap.fill(-1, 0, t);
  }
  shouldVisit(r, e) {
    const t = r * (this.end + 1) + e, n = t >>> 5, s = 1 << (t & 31);
    return (this.visited[n] & s) !== 0 ? !1 : (this.visited[n] |= s, !0);
  }
  push(r, e, t, n) {
    if (r.prog.getInst(e).op !== F.FAIL && (n || this.shouldVisit(e, t))) {
      if (this.jobLen >= this.jobPc.length) {
        const s = this.jobPc.length * 2, i = new Int32Array(s);
        i.set(this.jobPc), this.jobPc = i;
        const o = new Uint8Array(s);
        o.set(this.jobArg), this.jobArg = o;
        const B = new Int32Array(s);
        B.set(this.jobPos), this.jobPos = B;
      }
      this.jobPc[this.jobLen] = e, this.jobArg[this.jobLen] = n ? 1 : 0, this.jobPos[this.jobLen] = t, this.jobLen++;
    }
  }
  tryBacktrack(r, e, t, n, s) {
    const i = r.longest;
    for (this.push(r, t, n, !1); this.jobLen > 0; ) {
      this.jobLen--;
      let o = this.jobPc[this.jobLen], B = this.jobArg[this.jobLen] === 1, u = this.jobPos[this.jobLen], c = !0;
      for (; !(!c && !this.shouldVisit(o, u)); ) {
        c = !1;
        const C = r.prog.getInst(o);
        switch (C.op) {
          case F.FAIL:
            throw new Vr("unexpected InstFail");
          case F.ALT:
            if (B) {
              B = !1, o = C.arg;
              continue;
            } else {
              this.push(r, o, u, !0), o = C.out;
              continue;
            }
          case F.ALT_MATCH: {
            const f = r.prog.getInst(C.out);
            if (F.isRuneOp(f.op)) {
              this.push(r, C.arg, u, !1), o = C.arg, u = this.end;
              continue;
            }
            this.push(r, C.out, this.end, !1), o = C.out;
            continue;
          }
          case F.RUNE: {
            const f = e.step(u);
            if (f === Ke.EOF() || !C.matchRune(f >> 3)) break;
            u += f & 7, o = C.out;
            continue;
          }
          case F.RUNE1: {
            const f = e.step(u);
            if (f === Ke.EOF() || f >> 3 !== C.runes[0]) break;
            u += f & 7, o = C.out;
            continue;
          }
          case F.RUNE_ANY_NOT_NL: {
            const f = e.step(u);
            if (f === Ke.EOF() || f >> 3 === 10) break;
            u += f & 7, o = C.out;
            continue;
          }
          case F.RUNE_ANY: {
            const f = e.step(u);
            if (f === Ke.EOF()) break;
            u += f & 7, o = C.out;
            continue;
          }
          case F.CAPTURE:
            if (B) {
              this.cap[C.arg] = u;
              break;
            } else {
              C.arg < this.ncap && (this.push(r, o, this.cap[C.arg], !0), this.cap[C.arg] = u), o = C.out;
              continue;
            }
          case F.EMPTY_WIDTH: {
            const f = e.context(u);
            if ((C.arg & ~f) !== 0) break;
            o = C.out;
            continue;
          }
          case F.NOP:
            o = C.out;
            continue;
          case F.MATCH: {
            if (s === x.ANCHOR_BOTH && u !== this.end) break;
            if (this.ncap === 0) return !0;
            this.ncap > 1 && (this.cap[1] = u);
            const f = this.matchcap[1];
            if ((f === -1 || i && u > 0 && u > f) && this.matchcap.set(this.cap), !i || u === this.end) return !0;
            break;
          }
          case F.LB_WRITE:
          case F.LB_CHECK:
            throw new Vr("Backtracker cannot evaluate Lookbehind instructions");
          default:
            throw new Vr("bad inst");
        }
        break;
      }
    }
    return i && this.matchcap.length > 1 && this.matchcap[1] >= 0;
  }
};
const Ms = [];
var Gs = class th {
  static shouldBacktrack(e) {
    return e.numInst() <= Fp;
  }
  static maxBitStateLen(e) {
    return th.shouldBacktrack(e) ? Math.floor(Pp / e.numInst()) : 0;
  }
  static execute(e, t, n, s, i) {
    const o = e.cond;
    if (o === K.EMPTY_ALL || (s === x.ANCHOR_START || s === x.ANCHOR_BOTH) && n !== 0 || (o & K.EMPTY_BEGIN_TEXT) !== 0 && n !== 0) return null;
    const B = Ms.length > 0 ? Ms.pop() : new Lp(), u = t.endPos();
    B.reset(e.prog, u, i);
    let c = !1;
    if ((o & K.EMPTY_BEGIN_TEXT) !== 0 || s === x.ANCHOR_START || s === x.ANCHOR_BOTH)
      B.ncap > 0 && (B.cap[0] = n), B.tryBacktrack(e, t, e.prog.start, n, s) && (c = !0);
    else {
      let f = -1;
      for (; n <= u && f !== 0; n += f) {
        if (e.prefix.length > 0) {
          const y = t.index(e, n);
          if (y < 0) break;
          n += y;
        }
        if (B.ncap > 0 && (B.cap[0] = n), B.tryBacktrack(e, t, e.prog.start, n, s)) {
          c = !0;
          break;
        }
        const m = t.step(n);
        f = m === Ke.EOF() ? 0 : m & 7;
      }
    }
    if (!c)
      return Ms.push(B), null;
    const C = i === 0 ? [] : K.toArray(B.matchcap.subarray(0, i));
    return Ms.push(B), C;
  }
}, Wu = class {
  constructor(r) {
    this.sparse = new Uint32Array(r), this.dense = new Uint32Array(r), this.size = 0, this.nextIndex = 0;
  }
  empty() {
    return this.nextIndex >= this.size;
  }
  next() {
    return this.dense[this.nextIndex++];
  }
  clear() {
    this.size = 0, this.nextIndex = 0;
  }
  contains(r) {
    return r < this.sparse.length && this.sparse[r] < this.size && this.dense[this.sparse[r]] === r;
  }
  insert(r) {
    this.contains(r) || this.insertNew(r);
  }
  insertNew(r) {
    r >= this.sparse.length || (this.sparse[r] = this.size, this.dense[this.size] = r, this.size++);
  }
};
const xp = (r, e, t, n) => {
  const s = r.length, i = e.length;
  let o = 0, B = 0;
  const u = [], c = [];
  let C = !0, f = -1;
  const m = (y) => {
    const b = y ? r : e, V = y ? o : B, j = y ? t : n;
    return f > 0 && b[V] <= u[f] ? !1 : (u.push(b[V], b[V + 1]), y ? o += 2 : B += 2, f += 2, c.push(j), !0);
  };
  for (; o < s || B < i; )
    if (B >= i ? C = m(!0) : o >= s || e[B] < r[o] ? C = m(!1) : C = m(!0), !C) return null;
  return {
    merged: u,
    next: c
  };
};
var Vp = class {
  constructor(r) {
    this.start = r.start, this.numCap = r.numCap, this.inst = new Array(r.inst.length);
    for (let e = 0; e < r.inst.length; e++) {
      const t = r.inst[e], n = new F(t.op);
      n.out = t.out, n.arg = t.arg, n.runes = t.runes ? t.runes.slice() : [], n.next = null, this.inst[e] = n;
    }
  }
};
const Mp = (r) => {
  const e = new Vp(r);
  for (let t = 0; t < e.inst.length; t++) {
    const n = e.inst[t];
    if (n.op !== F.ALT && n.op !== F.ALT_MATCH) continue;
    let s = "out", i = "arg", o = e.inst[n[i]];
    if (o.op !== F.ALT && o.op !== F.ALT_MATCH && (s = "arg", i = "out", o = e.inst[n[i]], o.op !== F.ALT && o.op !== F.ALT_MATCH))
      continue;
    const B = e.inst[n[s]];
    if (B.op === F.ALT || B.op === F.ALT_MATCH) continue;
    let u = "out", c = "arg", C = !1;
    o.out === t ? C = !0 : o.arg === t && (C = !0, u = "arg", c = "out"), C && (o[u] = n[s]), n[s] === o[u] && (n[i] = o[c]);
  }
  return e;
}, Gp = (r) => {
  if (r.inst.length >= 1e3) return null;
  const e = new Wu(r.inst.length), t = new Wu(r.inst.length), n = new Array(r.inst.length), s = new Array(r.inst.length).fill(!1), i = (o) => {
    let B = !0;
    const u = r.inst[o];
    if (t.contains(o)) return !0;
    switch (t.insert(o), u.op) {
      case F.ALT:
      case F.ALT_MATCH: {
        B = i(u.out) && i(u.arg);
        let c = s[u.out], C = s[u.arg];
        if (c && C) return !1;
        if (C) {
          const b = u.out;
          u.out = u.arg, u.arg = b;
          const V = c;
          c = C, C = V;
        }
        c && (s[o] = !0, u.op = F.ALT_MATCH);
        const f = n[u.out] || [], m = n[u.arg] || [], y = xp(f, m, u.out, u.arg);
        if (!y) return !1;
        n[o] = y.merged, u.next = new Uint32Array(y.next);
        break;
      }
      case F.CAPTURE:
      case F.EMPTY_WIDTH:
      case F.NOP:
        B = i(u.out), s[o] = s[u.out], n[o] = n[u.out] ? n[u.out].slice() : [], u.next = new Uint32Array(Math.floor(n[o].length / 2) + 1).fill(u.out);
        break;
      case F.MATCH:
      case F.FAIL:
        s[o] = u.op === F.MATCH;
        break;
      case F.RUNE: {
        if (s[o] = !1, u.next && u.next.length > 0) break;
        if (e.insert(u.out), !u.runes || u.runes.length === 0) {
          n[o] = [], u.next = new Uint32Array([u.out]);
          break;
        }
        let c = [];
        if (u.runes.length === 1 && (u.arg & x.FOLD_CASE) !== 0) {
          const C = u.runes[0];
          c.push(C, C);
          for (let f = J.simpleFold(C); f !== C; f = J.simpleFold(f)) c.push(f, f);
          c.sort((f, m) => f - m);
        } else for (let C = 0; C < u.runes.length; C++) c.push(u.runes[C]);
        n[o] = c, u.next = new Uint32Array(Math.floor(c.length / 2) + 1).fill(u.out), u.op = F.RUNE;
        break;
      }
      case F.RUNE1: {
        if (s[o] = !1, u.next && u.next.length > 0) break;
        e.insert(u.out);
        let c = [];
        if ((u.arg & x.FOLD_CASE) !== 0) {
          const C = u.runes[0];
          c.push(C, C);
          for (let f = J.simpleFold(C); f !== C; f = J.simpleFold(f)) c.push(f, f);
          c.sort((f, m) => f - m);
        } else c.push(u.runes[0], u.runes[0]);
        n[o] = c, u.next = new Uint32Array(Math.floor(c.length / 2) + 1).fill(u.out), u.op = F.RUNE;
        break;
      }
      case F.RUNE_ANY:
        if (s[o] = !1, u.next && u.next.length > 0) break;
        e.insert(u.out), n[o] = [0, J.MAX_RUNE], u.next = new Uint32Array([u.out]);
        break;
      case F.RUNE_ANY_NOT_NL:
        if (s[o] = !1, u.next && u.next.length > 0) break;
        e.insert(u.out), n[o] = [
          0,
          9,
          11,
          J.MAX_RUNE
        ], u.next = new Uint32Array(Math.floor(n[o].length / 2) + 1).fill(u.out);
        break;
    }
    return B;
  };
  for (e.clear(), e.insert(r.start); !e.empty(); )
    if (t.clear(), !i(e.next())) return null;
  for (let o = 0; o < r.inst.length; o++) n[o] && (r.inst[o].runes = n[o]);
  return r;
}, kp = (r, e) => {
  for (let t = 0; t < e.inst.length; t++) {
    const n = e.inst[t];
    switch (n.op) {
      case F.ALT:
      case F.ALT_MATCH:
      case F.RUNE:
        break;
      case F.CAPTURE:
      case F.EMPTY_WIDTH:
      case F.NOP:
      case F.MATCH:
      case F.FAIL:
        r.inst[t].next = null;
        break;
      case F.RUNE1:
      case F.RUNE_ANY:
      case F.RUNE_ANY_NOT_NL:
        r.inst[t].next = null, r.inst[t].op = n.op, r.inst[t].runes = n.runes ? n.runes.slice() : [];
        break;
    }
  }
};
var Xu = class nh {
  static compile(e) {
    if (e.start === 0 || e.numLb > 0) return null;
    const t = e.inst[e.start];
    if (t.op !== F.EMPTY_WIDTH || (t.arg & K.EMPTY_BEGIN_TEXT) === 0) return null;
    let n = !1;
    for (let i = 0; i < e.inst.length; i++) if (e.inst[i].op === F.ALT || e.inst[i].op === F.ALT_MATCH) {
      n = !0;
      break;
    }
    for (let i = 0; i < e.inst.length; i++) {
      const o = e.inst[i], B = e.inst[o.out].op;
      switch (o.op) {
        case F.ALT:
        case F.ALT_MATCH:
          if (B === F.MATCH || e.inst[o.arg].op === F.MATCH) return null;
          break;
        case F.EMPTY_WIDTH:
          if (B === F.MATCH) {
            if ((o.arg & K.EMPTY_END_TEXT) === K.EMPTY_END_TEXT) continue;
            return null;
          }
          break;
        default:
          if (B === F.MATCH && n) return null;
          break;
      }
    }
    let s = Mp(e);
    return s = Gp(s), s !== null && kp(s, e), s;
  }
  static next(e, t) {
    const n = e.matchRunePos(t);
    return n >= 0 ? e.next[n] : e.op === F.ALT_MATCH ? e.out : 0;
  }
  static execute(e, t, n, s, i) {
    const o = e.onepass;
    if (!o) return null;
    const B = new Int32Array(i).fill(-1);
    let u = !1, c = t.step(n), C = c >> 3, f = c & 7, m = Ke.EOF(), y = -1, b = 0;
    c !== Ke.EOF() && (m = t.step(n + f), m !== Ke.EOF() && (y = m >> 3, b = m & 7));
    let V = n === 0 ? K.emptyOpContext(-1, C) : t.context(n), j = o.start, z;
    for (; ; ) {
      switch (z = o.inst[j], j = z.out, z.op) {
        case F.MATCH:
          return s === x.ANCHOR_BOTH && n !== t.endPos() ? null : (u = !0, B.length > 0 && (B[0] = 0, B[1] = n), i === 0 ? [] : K.toArray(B));
        case F.RUNE:
          if (!z.matchRune(C)) return null;
          break;
        case F.RUNE1:
          if (C !== z.runes[0]) return null;
          break;
        case F.RUNE_ANY:
          break;
        case F.RUNE_ANY_NOT_NL:
          if (C === 10) return null;
          break;
        case F.ALT:
        case F.ALT_MATCH:
          j = nh.next(z, C);
          continue;
        case F.FAIL:
          return null;
        case F.NOP:
          continue;
        case F.EMPTY_WIDTH:
          if ((z.arg & ~V) !== 0) return null;
          continue;
        case F.CAPTURE:
          z.arg < B.length && (B[z.arg] = n);
          continue;
        default:
          throw new Vr("bad inst");
      }
      if (f === 0) break;
      V = K.emptyOpContext(C, y), n += f, C = y, f = b, C !== -1 && (m = t.step(n + f), m !== Ke.EOF() ? (y = m >> 3, b = m & 7) : (y = -1, b = 0));
    }
    return u ? i === 0 ? [] : K.toArray(B) : null;
  }
}, w = class Y {
  static Op = Zc([
    "NO_MATCH",
    "EMPTY_MATCH",
    "LITERAL",
    "CHAR_CLASS",
    "ANY_CHAR_NOT_NL",
    "ANY_CHAR",
    "BEGIN_LINE",
    "END_LINE",
    "BEGIN_TEXT",
    "END_TEXT",
    "WORD_BOUNDARY",
    "NO_WORD_BOUNDARY",
    "CAPTURE",
    "STAR",
    "PLUS",
    "QUEST",
    "REPEAT",
    "CONCAT",
    "ALTERNATE",
    "PLB",
    "NLB",
    "LEFT_PAREN",
    "VERTICAL_BAR"
  ]);
  static isPseudoOp(e) {
    return e >= Y.Op.LEFT_PAREN;
  }
  static emptySubs() {
    return [];
  }
  static quoteIfHyphen(e) {
    return e === N.CODES.get("-") ? "\\" : "";
  }
  static fromRegexp(e) {
    const t = new Y(e.op);
    return t.flags = e.flags, t.subs = e.subs, t.runes = e.runes, t.cap = e.cap, t.min = e.min, t.max = e.max, t.name = e.name, t.namedGroups = e.namedGroups, t.lb = e.lb, t;
  }
  constructor(e) {
    this.op = e, this.flags = 0, this.subs = Y.emptySubs(), this.runes = [], this.min = 0, this.max = 0, this.cap = 0, this.name = null, this.namedGroups = /* @__PURE__ */ Object.create(null), this.lb = 0;
  }
  reinit() {
    this.flags = 0, this.subs = Y.emptySubs(), this.runes = [], this.cap = 0, this.min = 0, this.max = 0, this.name = null, this.namedGroups = /* @__PURE__ */ Object.create(null), this.lb = 0;
  }
  toString() {
    return this.appendTo();
  }
  appendTo() {
    let e = "";
    switch (this.op) {
      case Y.Op.NO_MATCH:
        e += "[^\\x00-\\x{10FFFF}]";
        break;
      case Y.Op.EMPTY_MATCH:
        e += "(?:)";
        break;
      case Y.Op.STAR:
      case Y.Op.PLUS:
      case Y.Op.QUEST:
      case Y.Op.REPEAT: {
        const t = this.subs[0];
        switch (t.op > Y.Op.CAPTURE || t.op === Y.Op.LITERAL && t.runes.length > 1 ? e += `(?:${t.appendTo()})` : e += t.appendTo(), this.op) {
          case Y.Op.STAR:
            e += "*";
            break;
          case Y.Op.PLUS:
            e += "+";
            break;
          case Y.Op.QUEST:
            e += "?";
            break;
          case Y.Op.REPEAT:
            e += `{${this.min}`, this.min !== this.max && (e += ",", this.max >= 0 && (e += this.max)), e += "}";
            break;
        }
        (this.flags & x.NON_GREEDY) !== 0 && (e += "?");
        break;
      }
      case Y.Op.CONCAT:
        for (let t of this.subs) t.op === Y.Op.ALTERNATE ? e += `(?:${t.appendTo()})` : e += t.appendTo();
        break;
      case Y.Op.ALTERNATE: {
        let t = "";
        for (let n of this.subs)
          e += t, t = "|", e += n.appendTo();
        break;
      }
      case Y.Op.LITERAL:
        (this.flags & x.FOLD_CASE) !== 0 && (e += "(?i:");
        for (let t of this.runes) e += K.escapeRune(t);
        (this.flags & x.FOLD_CASE) !== 0 && (e += ")");
        break;
      case Y.Op.ANY_CHAR_NOT_NL:
        e += "(?-s:.)";
        break;
      case Y.Op.ANY_CHAR:
        e += "(?s:.)";
        break;
      case Y.Op.PLB:
        e += `(?<=${this.subs[0].appendTo()})`;
        break;
      case Y.Op.NLB:
        e += `(?<!${this.subs[0].appendTo()})`;
        break;
      case Y.Op.CAPTURE:
        this.name === null || this.name.length === 0 ? e += "(" : e += `(?P<${this.name}>`, this.subs[0].op !== Y.Op.EMPTY_MATCH && (e += this.subs[0].appendTo()), e += ")";
        break;
      case Y.Op.BEGIN_TEXT:
        e += "\\A";
        break;
      case Y.Op.END_TEXT:
        (this.flags & x.WAS_DOLLAR) !== 0 ? e += "(?-m:$)" : e += "\\z";
        break;
      case Y.Op.BEGIN_LINE:
        e += "^";
        break;
      case Y.Op.END_LINE:
        e += "$";
        break;
      case Y.Op.WORD_BOUNDARY:
        e += "\\b";
        break;
      case Y.Op.NO_WORD_BOUNDARY:
        e += "\\B";
        break;
      case Y.Op.CHAR_CLASS:
        if (this.runes.length % 2 !== 0) {
          e += "[invalid char class]";
          break;
        }
        if (e += "[", this.runes.length === 0) e += "^\\x00-\\x{10FFFF}";
        else if (this.runes[0] === 0 && this.runes[this.runes.length - 1] === J.MAX_RUNE) {
          e += "^";
          for (let t = 1; t < this.runes.length - 1; t += 2) {
            const n = this.runes[t] + 1, s = this.runes[t + 1] - 1;
            e += Y.quoteIfHyphen(n), e += K.escapeRune(n), n !== s && (e += "-", e += Y.quoteIfHyphen(s), e += K.escapeRune(s));
          }
        } else for (let t = 0; t < this.runes.length; t += 2) {
          const n = this.runes[t], s = this.runes[t + 1];
          e += Y.quoteIfHyphen(n), e += K.escapeRune(n), n !== s && (e += "-", e += Y.quoteIfHyphen(s), e += K.escapeRune(s));
        }
        e += "]";
        break;
      default:
        e += this.op;
        break;
    }
    return e;
  }
  maxCap() {
    let e = 0;
    if (this.op === Y.Op.CAPTURE && (e = this.cap), this.subs !== null) for (let t of this.subs) {
      const n = t.maxCap();
      e < n && (e = n);
    }
    return e;
  }
  equals(e) {
    if (!(e !== null && e instanceof Y) || this.op !== e.op) return !1;
    switch (this.op) {
      case Y.Op.END_TEXT:
        if ((this.flags & x.WAS_DOLLAR) !== (e.flags & x.WAS_DOLLAR)) return !1;
        break;
      case Y.Op.LITERAL:
      case Y.Op.CHAR_CLASS:
        if (this.runes === null && e.runes === null) break;
        if (this.runes === null || e.runes === null || this.runes.length !== e.runes.length) return !1;
        for (let t = 0; t < this.runes.length; t++) if (this.runes[t] !== e.runes[t]) return !1;
        break;
      case Y.Op.ALTERNATE:
      case Y.Op.CONCAT:
        if (this.subs.length !== e.subs.length) return !1;
        for (let t = 0; t < this.subs.length; ++t) if (!this.subs[t].equals(e.subs[t])) return !1;
        break;
      case Y.Op.STAR:
      case Y.Op.PLUS:
      case Y.Op.QUEST:
        if ((this.flags & x.NON_GREEDY) !== (e.flags & x.NON_GREEDY) || !this.subs[0].equals(e.subs[0])) return !1;
        break;
      case Y.Op.REPEAT:
        if ((this.flags & x.NON_GREEDY) !== (e.flags & x.NON_GREEDY) || this.min !== e.min || this.max !== e.max || !this.subs[0].equals(e.subs[0])) return !1;
        break;
      case Y.Op.CAPTURE:
        if (this.cap !== e.cap || (this.name === null ? e.name !== null : this.name !== e.name) || !this.subs[0].equals(e.subs[0])) return !1;
        break;
      case Y.Op.PLB:
      case Y.Op.NLB:
        if (this.lb !== e.lb || !this.subs[0].equals(e.subs[0])) return !1;
        break;
    }
    return !0;
  }
}, Zu = class {
  constructor(r) {
    this.next = [/* @__PURE__ */ Object.create(null)], this.fail = [0], this.match = [!1];
    for (const t of r) {
      let n = 0;
      for (let s = 0; s < t.length; s++) {
        const i = t[s];
        i in this.next[n] || (this.next.push(/* @__PURE__ */ Object.create(null)), this.fail.push(0), this.match.push(!1), this.next[n][i] = this.next.length - 1), n = this.next[n][i];
      }
      this.match[n] = !0;
    }
    const e = [];
    for (const t in this.next[0]) if (Object.prototype.hasOwnProperty.call(this.next[0], t)) {
      const n = this.next[0][t];
      this.fail[n] = 0, e.push(n);
    }
    for (; e.length > 0; ) {
      const t = e.shift();
      for (const n in this.next[t]) if (Object.prototype.hasOwnProperty.call(this.next[t], n)) {
        const s = this.next[t][n];
        let i = this.fail[t];
        for (; i !== 0 && !(n in this.next[i]); ) i = this.fail[i];
        n in this.next[i] ? this.fail[s] = this.next[i][n] : this.fail[s] = 0, this.match[s] = this.match[s] || this.match[this.fail[s]], e.push(s);
      }
    }
  }
  searchUTF16(r, e, t) {
    let n = 0;
    for (let s = e; s < t; s++) {
      const i = r.charCodeAt(s);
      for (; n !== 0 && !(i in this.next[n]); ) n = this.fail[n];
      if (i in this.next[n] && (n = this.next[n][i]), this.match[n]) return !0;
    }
    return !1;
  }
  searchUTF8(r, e, t) {
    let n = 0;
    for (let s = e; s < t; s++) {
      const i = r[s];
      for (; n !== 0 && !(i in this.next[n]); ) n = this.fail[n];
      if (i in this.next[n] && (n = this.next[n][i]), this.match[n]) return !0;
    }
    return !1;
  }
}, ae = class Nr {
  static Type = {
    NONE: 0,
    EXACT: 1,
    AND: 2,
    OR: 3
  };
  constructor(e) {
    this.type = e, this.subs = [], this.str = "", this.bytes = null, this.ac16 = null, this.ac8 = null;
  }
  eval(e, t) {
    switch (this.type) {
      case Nr.Type.NONE:
        return !0;
      case Nr.Type.EXACT:
        return e.hasString(this, t);
      case Nr.Type.AND:
        for (let n = 0; n < this.subs.length; n++) if (!this.subs[n].eval(e, t)) return !1;
        return !0;
      case Nr.Type.OR:
        if (this.ac16 && this.ac8) return e.hasAnyString(this, t);
        for (let n = 0; n < this.subs.length; n++) if (this.subs[n].eval(e, t)) return !0;
        return !1;
      default:
        return !0;
    }
  }
}, Hp = class At {
  static build(e) {
    const t = At.fromRegexp(e);
    return At.simplify(t);
  }
  static fromRegexp(e) {
    if (!e) return new ae(ae.Type.NONE);
    switch (e.op) {
      case w.Op.PLB:
      case w.Op.NLB:
      case w.Op.NO_MATCH:
      case w.Op.EMPTY_MATCH:
      case w.Op.BEGIN_LINE:
      case w.Op.END_LINE:
      case w.Op.BEGIN_TEXT:
      case w.Op.END_TEXT:
      case w.Op.WORD_BOUNDARY:
      case w.Op.NO_WORD_BOUNDARY:
      case w.Op.CHAR_CLASS:
      case w.Op.ANY_CHAR_NOT_NL:
      case w.Op.ANY_CHAR:
        return new ae(ae.Type.NONE);
      case w.Op.LITERAL: {
        if (e.runes.length === 0 || (e.flags & x.FOLD_CASE) !== 0) return new ae(ae.Type.NONE);
        const t = new ae(ae.Type.EXACT);
        let n = "";
        for (let s = 0; s < e.runes.length; s++) n += String.fromCodePoint(e.runes[s]);
        return t.str = n, t.bytes = K.stringToUtf8ByteArray(t.str), t;
      }
      case w.Op.CAPTURE:
      case w.Op.PLUS:
        return At.fromRegexp(e.subs[0]);
      case w.Op.REPEAT:
        return e.min >= 1 ? At.fromRegexp(e.subs[0]) : new ae(ae.Type.NONE);
      case w.Op.CONCAT: {
        const t = new ae(ae.Type.AND);
        for (const n of e.subs) t.subs.push(At.fromRegexp(n));
        return t;
      }
      case w.Op.ALTERNATE: {
        const t = new ae(ae.Type.OR);
        for (const n of e.subs) t.subs.push(At.fromRegexp(n));
        return t;
      }
      default:
        return new ae(ae.Type.NONE);
    }
  }
  static simplify(e) {
    if (e.type === ae.Type.EXACT || e.type === ae.Type.NONE) return e;
    if (e.type === ae.Type.AND) {
      const t = [];
      for (const n of e.subs) {
        const s = At.simplify(n);
        if (s.type !== ae.Type.NONE) if (s.type === ae.Type.AND) for (let i = 0; i < s.subs.length; i++) t.push(s.subs[i]);
        else t.push(s);
      }
      return t.length === 0 ? new ae(ae.Type.NONE) : t.length === 1 ? t[0] : (e.subs = t, e);
    }
    if (e.type === ae.Type.OR) {
      const t = [];
      for (const o of e.subs) {
        const B = At.simplify(o);
        if (B.type === ae.Type.NONE) return new ae(ae.Type.NONE);
        if (B.type === ae.Type.OR) for (let u = 0; u < B.subs.length; u++) t.push(B.subs[u]);
        else t.push(B);
      }
      if (t.length === 0) return new ae(ae.Type.NONE);
      if (t.length === 1) return t[0];
      const n = /* @__PURE__ */ new Set(), s = [];
      for (const o of t) o.type === ae.Type.EXACT ? n.has(o.str) || (n.add(o.str), s.push(o)) : s.push(o);
      e.subs = s;
      let i = !0;
      for (const o of s) if (o.type !== ae.Type.EXACT) {
        i = !1;
        break;
      }
      return i && s.length > 1 && (e.ac16 = new Zu(s.map((o) => {
        const B = [];
        for (let u = 0; u < o.str.length; u++) B.push(o.str.charCodeAt(u));
        return B;
      })), e.ac8 = new Zu(s.map((o) => o.bytes))), e;
    }
    return e;
  }
}, lt = class {
  /**
  * @param {number} head - Encoded pointer to the start of the patch list.
  * @param {number} tail - Encoded pointer to the end of the patch list.
  */
  constructor(r = 0, e = 0) {
    this.head = r, this.tail = e;
  }
}, Up = class {
  constructor() {
    this.inst = [], this.start = 0, this.numCap = 2, this.lbStarts = [], this.numLb = 0;
  }
  getInst(r) {
    return this.inst[r];
  }
  numInst() {
    return this.inst.length;
  }
  addInst(r) {
    this.inst.push(new F(r));
  }
  skipNop(r) {
    let e = this.inst[r];
    for (; e.op === F.NOP || e.op === F.CAPTURE; )
      e = this.inst[r], r = e.out;
    return e;
  }
  prefix() {
    let r = "", e = this.skipNop(this.start);
    if (!F.isRuneOp(e.op) || e.runes.length !== 1) return [e.op === F.MATCH, r];
    for (; F.isRuneOp(e.op) && e.runes.length === 1 && (e.arg & x.FOLD_CASE) === 0; )
      r += String.fromCodePoint(e.runes[0]), e = this.skipNop(e.out);
    return [e.op === F.MATCH, r];
  }
  startCond() {
    let r = 0, e = this.start;
    e: for (; ; ) {
      const t = this.inst[e];
      switch (t.op) {
        case F.EMPTY_WIDTH:
          r |= t.arg;
          break;
        case F.FAIL:
          return -1;
        case F.CAPTURE:
        case F.NOP:
          break;
        default:
          break e;
      }
      e = t.out;
    }
    return r;
  }
  patch(r, e) {
    let t = r.head;
    for (; t !== 0; ) {
      const n = this.inst[t >> 1];
      (t & 1) === 0 ? (t = n.out, n.out = e) : (t = n.arg, n.arg = e);
    }
  }
  append(r, e) {
    if (r.head === 0) return e;
    if (e.head === 0) return r;
    const t = this.inst[r.tail >> 1];
    return (r.tail & 1) === 0 ? t.out = e.head : t.arg = e.head, new lt(r.head, e.tail);
  }
  /**
  *
  * @returns {string}
  */
  toString() {
    let r = "";
    for (let e = 0; e < this.inst.length; e++) {
      const t = r.length;
      r += e, e === this.start && (r += "*"), r += "        ".substring(r.length - t), r += this.inst[e], r += `
`;
    }
    return r;
  }
}, ks = class {
  constructor(r = 0, e = new lt(), t = !1) {
    this.i = r, this.out = e, this.nullable = t;
  }
}, jp = class xn {
  static ANY_RUNE_NOT_NL() {
    return [
      0,
      N.CODES.get(`
`) - 1,
      N.CODES.get(`
`) + 1,
      J.MAX_RUNE
    ];
  }
  static ANY_RUNE() {
    return [0, J.MAX_RUNE];
  }
  static compileRegexp(e) {
    const t = new xn(), n = t.compile(e);
    return t.prog.patch(n.out, t.newInst(F.MATCH).i), t.prog.start = n.i, t.prog;
  }
  static compileSet(e) {
    const t = new xn();
    if (e.length === 0)
      return t.prog.start = t.newInst(F.FAIL).i, t.prog;
    let n = [];
    for (let i = 0; i < e.length; i++) {
      const o = t.compile(e[i]), B = t.newInst(F.MATCH);
      t.prog.getInst(B.i).arg = i, t.prog.patch(o.out, B.i), n.push(o.i);
    }
    let s = n[0];
    for (let i = 1; i < n.length; i++) {
      const o = t.newInst(F.ALT), B = t.prog.getInst(o.i);
      B.out = s, B.arg = n[i], s = o.i;
    }
    return t.prog.start = s, t.prog;
  }
  constructor() {
    this.prog = new Up(), this.newInst(F.FAIL);
  }
  newInst(e) {
    return this.prog.addInst(e), new ks(this.prog.numInst() - 1, new lt(), !0);
  }
  nop() {
    const e = this.newInst(F.NOP);
    return e.out = new lt(e.i << 1, e.i << 1), e;
  }
  fail() {
    return new ks();
  }
  cap(e) {
    const t = this.newInst(F.CAPTURE);
    return t.out = new lt(t.i << 1, t.i << 1), this.prog.getInst(t.i).arg = e, this.prog.numCap < e + 1 && (this.prog.numCap = e + 1), t;
  }
  cat(e, t) {
    return e.i === 0 || t.i === 0 ? this.fail() : (this.prog.patch(e.out, t.i), new ks(e.i, t.out, e.nullable && t.nullable));
  }
  alt(e, t) {
    if (e.i === 0) return t;
    if (t.i === 0) return e;
    const n = this.newInst(F.ALT), s = this.prog.getInst(n.i);
    return s.out = e.i, s.arg = t.i, n.out = this.prog.append(e.out, t.out), n.nullable = e.nullable || t.nullable, n;
  }
  loop(e, t) {
    const n = this.newInst(F.ALT), s = this.prog.getInst(n.i);
    return t ? (s.arg = e.i, n.out = new lt(n.i << 1, n.i << 1)) : (s.out = e.i, n.out = new lt(n.i << 1 | 1, n.i << 1 | 1)), this.prog.patch(e.out, n.i), n;
  }
  quest(e, t) {
    const n = this.newInst(F.ALT), s = this.prog.getInst(n.i);
    return t ? (s.arg = e.i, n.out = new lt(n.i << 1, n.i << 1)) : (s.out = e.i, n.out = new lt(n.i << 1 | 1, n.i << 1 | 1)), n.out = this.prog.append(n.out, e.out), n;
  }
  star(e, t) {
    return e.nullable ? this.quest(this.plus(e, t), t) : this.loop(e, t);
  }
  plus(e, t) {
    return new ks(e.i, this.loop(e, t).out, e.nullable);
  }
  empty(e) {
    const t = this.newInst(F.EMPTY_WIDTH);
    return this.prog.getInst(t.i).arg = e, t.out = new lt(t.i << 1, t.i << 1), t;
  }
  rune(e, t) {
    const n = this.newInst(F.RUNE);
    n.nullable = !1;
    const s = this.prog.getInst(n.i);
    return s.runes = e, t &= x.FOLD_CASE, (e.length !== 1 || J.simpleFold(e[0]) === e[0]) && (t &= -2), s.arg = t, n.out = new lt(n.i << 1, n.i << 1), (t & x.FOLD_CASE) === 0 && e.length === 1 || e.length === 2 && e[0] === e[1] ? s.op = F.RUNE1 : e.length === 2 && e[0] === 0 && e[1] === J.MAX_RUNE ? s.op = F.RUNE_ANY : e.length === 4 && e[0] === 0 && e[1] === N.CODES.get(`
`) - 1 && e[2] === N.CODES.get(`
`) + 1 && e[3] === J.MAX_RUNE && (s.op = F.RUNE_ANY_NOT_NL), n;
  }
  lookBehind(e, t) {
    const n = this.newInst(F.LB_WRITE);
    this.prog.getInst(n.i).arg = t;
    const s = this.rune(xn.ANY_RUNE(), 0), i = this.star(s, !0), o = this.cat(i, e);
    this.prog.patch(o.out, n.i);
    const B = this.newInst(F.LB_CHECK);
    return this.prog.getInst(B.i).arg = t, this.prog.lbStarts.push(o.i), Math.abs(t) > this.prog.numLb && (this.prog.numLb = Math.abs(t)), B.out = new lt(B.i << 1, B.i << 1), B;
  }
  compile(e) {
    switch (e.op) {
      case w.Op.NO_MATCH:
        return this.fail();
      case w.Op.EMPTY_MATCH:
        return this.nop();
      case w.Op.LITERAL:
        if (e.runes.length === 0) return this.nop();
        {
          let t = null;
          for (let n of e.runes) {
            const s = this.rune([n], e.flags);
            t = t === null ? s : this.cat(t, s);
          }
          return t;
        }
      case w.Op.CHAR_CLASS:
        return this.rune(e.runes, e.flags);
      case w.Op.ANY_CHAR_NOT_NL:
        return this.rune(xn.ANY_RUNE_NOT_NL(), 0);
      case w.Op.ANY_CHAR:
        return this.rune(xn.ANY_RUNE(), 0);
      case w.Op.BEGIN_LINE:
        return this.empty(K.EMPTY_BEGIN_LINE);
      case w.Op.END_LINE:
        return this.empty(K.EMPTY_END_LINE);
      case w.Op.BEGIN_TEXT:
        return this.empty(K.EMPTY_BEGIN_TEXT);
      case w.Op.END_TEXT:
        return this.empty(K.EMPTY_END_TEXT);
      case w.Op.WORD_BOUNDARY:
        return this.empty(K.EMPTY_WORD_BOUNDARY);
      case w.Op.NO_WORD_BOUNDARY:
        return this.empty(K.EMPTY_NO_WORD_BOUNDARY);
      case w.Op.PLB:
      case w.Op.NLB:
        return this.lookBehind(this.compile(e.subs[0]), e.lb);
      case w.Op.CAPTURE: {
        const t = this.cap(e.cap << 1), n = this.compile(e.subs[0]), s = this.cap(e.cap << 1 | 1);
        return this.cat(this.cat(t, n), s);
      }
      case w.Op.STAR:
        return this.star(this.compile(e.subs[0]), (e.flags & x.NON_GREEDY) !== 0);
      case w.Op.PLUS:
        return this.plus(this.compile(e.subs[0]), (e.flags & x.NON_GREEDY) !== 0);
      case w.Op.QUEST:
        return this.quest(this.compile(e.subs[0]), (e.flags & x.NON_GREEDY) !== 0);
      case w.Op.CONCAT:
        if (e.subs.length === 0) return this.nop();
        {
          let t = null;
          for (let n of e.subs) {
            const s = this.compile(n);
            t = t === null ? s : this.cat(t, s);
          }
          return t;
        }
      case w.Op.ALTERNATE:
        if (e.subs.length === 0) return this.nop();
        {
          let t = null;
          for (let n of e.subs) {
            const s = this.compile(n);
            t = t === null ? s : this.alt(t, s);
          }
          return t;
        }
      default:
        throw new Ap("regexp: unhandled case in compile");
    }
  }
}, Jp = class st {
  static simplify(e) {
    if (e === null) return null;
    switch (e.op) {
      case w.Op.PLB:
      case w.Op.NLB:
      case w.Op.CAPTURE: {
        const t = st.simplify(e.subs[0]);
        if (t !== e.subs[0]) {
          const n = w.fromRegexp(e);
          return n.runes = [], n.subs = [t], n;
        }
        return e;
      }
      case w.Op.CONCAT:
      case w.Op.ALTERNATE: {
        const t = [];
        let n = !1;
        for (let s = 0; s < e.subs.length; s++) {
          const i = e.subs[s], o = st.simplify(i);
          if (o !== i && (n = !0), e.op === w.Op.CONCAT) {
            if (o.op === w.Op.NO_MATCH) return new w(w.Op.NO_MATCH);
            if (o.op === w.Op.EMPTY_MATCH) {
              n = !0;
              continue;
            }
            if (o.op === w.Op.CONCAT) {
              n = !0;
              for (let B = 0; B < o.subs.length; B++) t.push(o.subs[B]);
              continue;
            }
          } else if (e.op === w.Op.ALTERNATE) {
            if (o.op === w.Op.NO_MATCH) {
              n = !0;
              continue;
            }
            if (o.op === w.Op.ALTERNATE) {
              n = !0;
              for (let B = 0; B < o.subs.length; B++) t.push(o.subs[B]);
              continue;
            }
          }
          t.push(o);
        }
        if (n) {
          if (t.length === 0) return new w(e.op === w.Op.CONCAT ? w.Op.EMPTY_MATCH : w.Op.NO_MATCH);
          if (t.length === 1) return t[0];
          const s = w.fromRegexp(e);
          return s.runes = [], s.subs = t, s;
        }
        return e;
      }
      case w.Op.CHAR_CLASS:
        return e.runes === null ? e : e.runes.length === 0 ? new w(w.Op.NO_MATCH) : e.runes.length === 2 && e.runes[0] === 0 && e.runes[1] === J.MAX_RUNE ? new w(w.Op.ANY_CHAR) : e.runes.length === 4 && e.runes[0] === 0 && e.runes[1] === N.CODES.get(`
`) - 1 && e.runes[2] === N.CODES.get(`
`) + 1 && e.runes[3] === J.MAX_RUNE ? new w(w.Op.ANY_CHAR_NOT_NL) : e;
      case w.Op.STAR:
      case w.Op.PLUS:
      case w.Op.QUEST: {
        const t = st.simplify(e.subs[0]);
        return st.simplify1(e.op, e.flags, t, e);
      }
      case w.Op.REPEAT: {
        if (e.min === 0 && e.max === 0) return new w(w.Op.EMPTY_MATCH);
        const t = st.simplify(e.subs[0]);
        if (e.max === -1) {
          if (e.min === 0) return st.simplify1(w.Op.STAR, e.flags, t, null);
          if (e.min === 1) return st.simplify1(w.Op.PLUS, e.flags, t, null);
          const s = new w(w.Op.CONCAT), i = [];
          for (let o = 0; o < e.min - 1; o++) i.push(t);
          return i.push(st.simplify1(w.Op.PLUS, e.flags, t, null)), s.subs = i.slice(0), st.simplify(s);
        }
        if (e.min === 1 && e.max === 1) return t;
        let n = null;
        if (e.min > 0) {
          n = [];
          for (let s = 0; s < e.min; s++) n.push(t);
        }
        if (e.max > e.min) {
          let s = st.simplify1(w.Op.QUEST, e.flags, t, null);
          for (let i = e.min + 1; i < e.max; i++) {
            const o = new w(w.Op.CONCAT);
            o.subs = [t, s], s = st.simplify1(w.Op.QUEST, e.flags, o, null);
          }
          if (n === null) return s;
          n.push(s);
        }
        if (n !== null) {
          const s = new w(w.Op.CONCAT);
          return s.subs = n.slice(0), st.simplify(s);
        }
        return new w(w.Op.NO_MATCH);
      }
    }
    return e;
  }
  static simplify1(e, t, n, s) {
    if (n.op === w.Op.EMPTY_MATCH) return n;
    if (n.op === w.Op.NO_MATCH)
      return e === w.Op.PLUS ? n : new w(w.Op.EMPTY_MATCH);
    if (e === n.op && (t & x.NON_GREEDY) === (n.flags & x.NON_GREEDY)) return n;
    if (s !== null && s.op === e && (s.flags & x.NON_GREEDY) === (t & x.NON_GREEDY) && n === s.subs[0]) return s;
    const i = new w(e);
    return i.flags = t, i.subs = [n], i;
  }
}, se = class {
  constructor(r, e) {
    this.sign = r, this.cls = e;
  }
};
const el = [48, 57], tl = [
  9,
  10,
  12,
  13,
  32,
  32
], nl = [
  48,
  57,
  65,
  90,
  95,
  95,
  97,
  122
], rl = /* @__PURE__ */ new Map([
  ["\\d", new se(1, el)],
  ["\\D", new se(-1, el)],
  ["\\s", new se(1, tl)],
  ["\\S", new se(-1, tl)],
  ["\\w", new se(1, nl)],
  ["\\W", new se(-1, nl)]
]), sl = [
  48,
  57,
  65,
  90,
  97,
  122
], il = [
  65,
  90,
  97,
  122
], ol = [0, 127], al = [
  9,
  9,
  32,
  32
], Bl = [
  0,
  31,
  127,
  127
], ul = [48, 57], ll = [33, 126], cl = [97, 122], hl = [32, 126], Cl = [
  33,
  47,
  58,
  64,
  91,
  96,
  123,
  126
], fl = [
  9,
  13,
  32,
  32
], dl = [65, 90], gl = [
  48,
  57,
  65,
  90,
  95,
  95,
  97,
  122
], pl = [
  48,
  57,
  65,
  70,
  97,
  102
], ml = /* @__PURE__ */ new Map([
  ["[:alnum:]", new se(1, sl)],
  ["[:^alnum:]", new se(-1, sl)],
  ["[:alpha:]", new se(1, il)],
  ["[:^alpha:]", new se(-1, il)],
  ["[:ascii:]", new se(1, ol)],
  ["[:^ascii:]", new se(-1, ol)],
  ["[:blank:]", new se(1, al)],
  ["[:^blank:]", new se(-1, al)],
  ["[:cntrl:]", new se(1, Bl)],
  ["[:^cntrl:]", new se(-1, Bl)],
  ["[:digit:]", new se(1, ul)],
  ["[:^digit:]", new se(-1, ul)],
  ["[:graph:]", new se(1, ll)],
  ["[:^graph:]", new se(-1, ll)],
  ["[:lower:]", new se(1, cl)],
  ["[:^lower:]", new se(-1, cl)],
  ["[:print:]", new se(1, hl)],
  ["[:^print:]", new se(-1, hl)],
  ["[:punct:]", new se(1, Cl)],
  ["[:^punct:]", new se(-1, Cl)],
  ["[:space:]", new se(1, fl)],
  ["[:^space:]", new se(-1, fl)],
  ["[:upper:]", new se(1, dl)],
  ["[:^upper:]", new se(-1, dl)],
  ["[:word:]", new se(1, gl)],
  ["[:^word:]", new se(-1, gl)],
  ["[:xdigit:]", new se(1, pl)],
  ["[:^xdigit:]", new se(-1, pl)]
]);
var Ht = class Ut {
  static charClassToString(e, t) {
    let n = "[";
    for (let s = 0; s < t; s += 2) {
      s > 0 && (n += " ");
      const i = e[s], o = e[s + 1];
      i === o ? n += `0x${i.toString(16)}` : n += `0x${i.toString(16)}-0x${o.toString(16)}`;
    }
    return n += "]", n;
  }
  static cmp(e, t, n, s) {
    const i = e[t] - n;
    return i !== 0 ? i : s - e[t + 1];
  }
  static qsortIntPair(e, t, n) {
    const s = ((t + n) / 2 | 0) & -2, i = e[s], o = e[s + 1];
    let B = t, u = n;
    for (; B <= u; ) {
      for (; B < n && Ut.cmp(e, B, i, o) < 0; ) B += 2;
      for (; u > t && Ut.cmp(e, u, i, o) > 0; ) u -= 2;
      if (B <= u) {
        if (B !== u) {
          let c = e[B];
          e[B] = e[u], e[u] = c, c = e[B + 1], e[B + 1] = e[u + 1], e[u + 1] = c;
        }
        B += 2, u -= 2;
      }
    }
    t < u && Ut.qsortIntPair(e, t, u), B < n && Ut.qsortIntPair(e, B, n);
  }
  constructor(e = K.emptyInts()) {
    this.r = e, this.len = e.length;
  }
  toArray() {
    return this.len === this.r.length ? this.r : this.r.slice(0, this.len);
  }
  cleanClass() {
    if (this.len < 4) return this;
    Ut.qsortIntPair(this.r, 0, this.len - 2);
    let e = 2;
    for (let t = 2; t < this.len; t += 2) {
      const n = this.r[t], s = this.r[t + 1];
      if (n <= this.r[e - 1] + 1) {
        s > this.r[e - 1] && (this.r[e - 1] = s);
        continue;
      }
      this.r[e] = n, this.r[e + 1] = s, e += 2;
    }
    return this.len = e, this;
  }
  appendLiteral(e, t) {
    return (t & x.FOLD_CASE) !== 0 ? this.appendFoldedRange(e, e) : this.appendRange(e, e);
  }
  appendRange(e, t) {
    if (this.len > 0) {
      for (let n = 2; n <= 4; n += 2) if (this.len >= n) {
        const s = this.r[this.len - n], i = this.r[this.len - n + 1];
        if (e <= i + 1 && s <= t + 1)
          return e < s && (this.r[this.len - n] = e), t > i && (this.r[this.len - n + 1] = t), this;
      }
    }
    return this.r[this.len++] = e, this.r[this.len++] = t, this;
  }
  appendFoldedRange(e, t) {
    if (e <= J.MIN_FOLD && t >= J.MAX_FOLD) return this.appendRange(e, t);
    if (t < J.MIN_FOLD || e > J.MAX_FOLD) return this.appendRange(e, t);
    e < J.MIN_FOLD && (this.appendRange(e, J.MIN_FOLD - 1), e = J.MIN_FOLD), t > J.MAX_FOLD && (this.appendRange(J.MAX_FOLD + 1, t), t = J.MAX_FOLD);
    for (let n = e; n <= t; n++) {
      this.appendRange(n, n);
      for (let s = J.simpleFold(n); s !== n; s = J.simpleFold(s)) this.appendRange(s, s);
    }
    return this;
  }
  appendClass(e) {
    for (let t = 0; t < e.length; t += 2) this.appendRange(e[t], e[t + 1]);
    return this;
  }
  appendFoldedClass(e) {
    for (let t = 0; t < e.length; t += 2) this.appendFoldedRange(e[t], e[t + 1]);
    return this;
  }
  appendNegatedClass(e) {
    let t = 0;
    for (let n = 0; n < e.length; n += 2) {
      const s = e[n], i = e[n + 1];
      t <= s - 1 && this.appendRange(t, s - 1), t = i + 1;
    }
    return t <= J.MAX_RUNE && this.appendRange(t, J.MAX_RUNE), this;
  }
  appendTable(e) {
    for (let t = 0; t < e.length; ++t) {
      const n = e.getLo(t), s = e.getHi(t), i = e.getStride(t);
      if (i === 1) {
        this.appendRange(n, s);
        continue;
      }
      for (let o = n; o <= s; o += i) this.appendRange(o, o);
    }
    return this;
  }
  appendNegatedTable(e) {
    let t = 0;
    for (let n = 0; n < e.length; ++n) {
      const s = e.getLo(n), i = e.getHi(n), o = e.getStride(n);
      if (o === 1) {
        t <= s - 1 && this.appendRange(t, s - 1), t = i + 1;
        continue;
      }
      for (let B = s; B <= i; B += o)
        t <= B - 1 && this.appendRange(t, B - 1), t = B + 1;
    }
    return t <= J.MAX_RUNE && this.appendRange(t, J.MAX_RUNE), this;
  }
  appendTableWithSign(e, t) {
    return t < 0 ? this.appendNegatedTable(e) : this.appendTable(e);
  }
  negateClass() {
    let e = 0, t = 0;
    for (let n = 0; n < this.len; n += 2) {
      const s = this.r[n], i = this.r[n + 1];
      e <= s - 1 && (this.r[t] = e, this.r[t + 1] = s - 1, t += 2), e = i + 1;
    }
    return this.len = t, e <= J.MAX_RUNE && (this.r[this.len++] = e, this.r[this.len++] = J.MAX_RUNE), this;
  }
  appendClassWithSign(e, t) {
    return t < 0 ? this.appendNegatedClass(e) : this.appendClass(e);
  }
  appendGroup(e, t) {
    let n = e.cls;
    return t && (n = new Ut().appendFoldedClass(n).cleanClass().toArray()), this.appendClassWithSign(n, e.sign);
  }
  toString() {
    return Ut.charClassToString(this.r, this.len);
  }
}, qp = class {
  constructor(r) {
    this.str = r, this.position = 0;
  }
  pos() {
    return this.position;
  }
  rewindTo(r) {
    this.position = r;
  }
  more() {
    return this.position < this.str.length;
  }
  peek() {
    return this.str.codePointAt(this.position);
  }
  skip(r) {
    this.position += r;
  }
  skipString(r) {
    this.position += r.length;
  }
  pop() {
    const r = this.str.codePointAt(this.position);
    return this.position += K.charCount(r), r;
  }
  lookingAt(r) {
    return this.str.startsWith(r, this.position);
  }
  rest() {
    return this.str.substring(this.position);
  }
  from(r) {
    return this.str.substring(r, this.position);
  }
  toString() {
    return this.rest();
  }
}, Kp = class q {
  static ERR_INTERNAL_ERROR = "regexp/syntax: internal error";
  static ERR_INVALID_CHAR_RANGE = "invalid character class range";
  static ERR_INVALID_ESCAPE = "invalid escape sequence";
  static ERR_INVALID_NAMED_CAPTURE = "invalid named capture";
  static ERR_INVALID_PERL_OP = "invalid or unsupported Perl syntax";
  static ERR_INVALID_REPEAT_OP = "invalid nested repetition operator";
  static ERR_INVALID_REPEAT_SIZE = "invalid repeat count";
  static ERR_MISSING_BRACKET = "missing closing ]";
  static ERR_MISSING_PAREN = "missing closing )";
  static ERR_MISSING_REPEAT_ARGUMENT = "missing argument to repetition operator";
  static ERR_TRAILING_BACKSLASH = "trailing backslash at end of expression";
  static ERR_DUPLICATE_NAMED_CAPTURE = "duplicate capture group name";
  static ERR_UNEXPECTED_PAREN = "unexpected )";
  static ERR_NESTING_DEPTH = "expression nests too deeply";
  static ERR_LARGE = "expression too large";
  static ERR_INVALID_CAPTURE_IN_LOOKBEHIND = "invalid capture in lookbehind";
  static MAX_HEIGHT = 1e3;
  static MAX_SIZE = 3355443;
  static MAX_RUNES = 33554432;
  static ANY_TABLE = new g(new Uint32Array([
    0,
    J.MAX_RUNE,
    1
  ]));
  static ASCII_TABLE = new g(new Uint32Array([
    0,
    127,
    1
  ]));
  static ASCII_FOLD_TABLE = new g(new Uint32Array([
    0,
    127,
    1,
    383,
    383,
    1,
    8490,
    8490,
    1
  ]));
  static unicodeTable(e) {
    return e === "Any" ? {
      tab: q.ANY_TABLE,
      fold: q.ANY_TABLE,
      sign: 1
    } : e === "Ascii" ? {
      tab: q.ASCII_TABLE,
      fold: q.ASCII_FOLD_TABLE,
      sign: 1
    } : e === "Assigned" ? {
      tab: $e.CATEGORIES.get("Cn"),
      fold: $e.CATEGORIES.get("Cn"),
      sign: -1
    } : e === "Lc" ? {
      tab: $e.CATEGORIES.get("LC"),
      fold: $e.FOLD_CATEGORIES.get("LC"),
      sign: 1
    } : $e.CATEGORIES.has(e) ? {
      tab: $e.CATEGORIES.get(e),
      fold: $e.FOLD_CATEGORIES.get(e),
      sign: 1
    } : $e.SCRIPTS.has(e) ? {
      tab: $e.SCRIPTS.get(e),
      fold: $e.FOLD_SCRIPT.get(e),
      sign: 1
    } : null;
  }
  static minFoldRune(e) {
    if (e < J.MIN_FOLD || e > J.MAX_FOLD) return e;
    let t = e;
    const n = e;
    for (e = J.simpleFold(e); e !== n; e = J.simpleFold(e)) t > e && (t = e);
    return t;
  }
  static leadingRegexp(e) {
    if (e.op === w.Op.EMPTY_MATCH) return null;
    if (e.op === w.Op.CONCAT && e.subs.length > 0) {
      const t = e.subs[0];
      return t.op === w.Op.EMPTY_MATCH ? null : t;
    }
    return e;
  }
  static literalRegexp(e, t) {
    const n = new w(w.Op.LITERAL);
    return n.flags = t, n.runes = K.stringToRunes(e), n;
  }
  /**
  * Parse regular expression pattern {@code pattern} with mode flags {@code flags}.
  * @param {string} pattern
  * @param {number} flags
  */
  static parse(e, t) {
    return new q(e, t).parseInternal();
  }
  static parseRepeat(e) {
    const t = e.pos();
    if (!e.more() || !e.lookingAt("{")) return -1;
    e.skip(1);
    const n = q.parseInt(e);
    if (n === -1 || !e.more()) return -1;
    let s;
    if (!e.lookingAt(",")) s = n;
    else {
      if (e.skip(1), !e.more()) return -1;
      if (e.lookingAt("}")) s = -1;
      else if ((s = q.parseInt(e)) === -1) return -1;
    }
    if (!e.more() || !e.lookingAt("}")) return -1;
    if (e.skip(1), n < 0 || n > 1e3 || s === -2 || s > 1e3 || s >= 0 && n > s) throw new he(q.ERR_INVALID_REPEAT_SIZE, e.from(t));
    return n << 16 | s & J.MAX_BMP;
  }
  static isValidCaptureName(e) {
    if (e.length === 0) return !1;
    for (let t = 0; t < e.length; t++) {
      const n = e.codePointAt(t);
      if (n !== N.CODES.get("_") && !K.isalnum(n)) return !1;
    }
    return !0;
  }
  static parseInt(e) {
    const t = e.pos();
    for (; e.more() && e.peek() >= N.CODES.get("0") && e.peek() <= N.CODES.get("9"); ) e.skip(1);
    const n = e.from(t);
    return n.length === 0 || n.length > 1 && n.codePointAt(0) === N.CODES.get("0") ? -1 : n.length > 8 ? -2 : parseInt(n, 10);
  }
  static isCharClass(e) {
    return e.op === w.Op.LITERAL && e.runes.length === 1 || e.op === w.Op.CHAR_CLASS || e.op === w.Op.ANY_CHAR_NOT_NL || e.op === w.Op.ANY_CHAR;
  }
  static matchRune(e, t) {
    switch (e.op) {
      case w.Op.LITERAL:
        return e.runes.length === 1 && e.runes[0] === t;
      case w.Op.CHAR_CLASS:
        for (let n = 0; n < e.runes.length; n += 2) if (e.runes[n] <= t && t <= e.runes[n + 1]) return !0;
        return !1;
      case w.Op.ANY_CHAR_NOT_NL:
        return t !== N.CODES.get(`
`);
      case w.Op.ANY_CHAR:
        return !0;
    }
    return !1;
  }
  static mergeCharClass(e, t) {
    switch (e.op) {
      case w.Op.ANY_CHAR:
        break;
      case w.Op.ANY_CHAR_NOT_NL:
        q.matchRune(t, N.CODES.get(`
`)) && (e.op = w.Op.ANY_CHAR);
        break;
      case w.Op.CHAR_CLASS:
        t.op === w.Op.LITERAL ? e.runes = new Ht(e.runes).appendLiteral(t.runes[0], t.flags).toArray() : e.runes = new Ht(e.runes).appendClass(t.runes).toArray();
        break;
      case w.Op.LITERAL:
        if (t.runes[0] === e.runes[0] && t.flags === e.flags) break;
        e.op = w.Op.CHAR_CLASS, e.runes = new Ht().appendLiteral(e.runes[0], e.flags).appendLiteral(t.runes[0], t.flags).toArray();
        break;
    }
  }
  static parseEscape(e) {
    const t = e.pos();
    if (e.skip(1), !e.more()) throw new he(q.ERR_TRAILING_BACKSLASH);
    let n = e.pop();
    e: switch (n) {
      case N.CODES.get("1"):
      case N.CODES.get("2"):
      case N.CODES.get("3"):
      case N.CODES.get("4"):
      case N.CODES.get("5"):
      case N.CODES.get("6"):
      case N.CODES.get("7"):
        if (!e.more() || e.peek() < N.CODES.get("0") || e.peek() > N.CODES.get("7")) break;
      case N.CODES.get("0"): {
        let s = n - N.CODES.get("0");
        for (let i = 1; i < 3 && !(!e.more() || e.peek() < N.CODES.get("0") || e.peek() > N.CODES.get("7")); i++)
          s = s * 8 + e.peek() - N.CODES.get("0"), e.skip(1);
        return s;
      }
      case N.CODES.get("x"): {
        if (!e.more()) break;
        if (n = e.pop(), n === N.CODES.get("{")) {
          let o = 0, B = 0;
          for (; ; ) {
            if (!e.more()) break e;
            if (n = e.pop(), n === N.CODES.get("}")) break;
            const u = K.unhex(n);
            if (u < 0 || (B = B * 16 + u, B > J.MAX_RUNE)) break e;
            o++;
          }
          if (o === 0) break e;
          return B;
        }
        const s = K.unhex(n);
        if (!e.more()) break;
        n = e.pop();
        const i = K.unhex(n);
        if (s < 0 || i < 0) break;
        return s * 16 + i;
      }
      case N.CODES.get("a"):
        return N.CODES.get("\x07");
      case N.CODES.get("f"):
        return N.CODES.get("\f");
      case N.CODES.get("n"):
        return N.CODES.get(`
`);
      case N.CODES.get("r"):
        return N.CODES.get("\r");
      case N.CODES.get("t"):
        return N.CODES.get("	");
      case N.CODES.get("v"):
        return N.CODES.get("\v");
      default:
        if (n <= J.MAX_ASCII && !K.isalnum(n)) return n;
        break;
    }
    throw new he(q.ERR_INVALID_ESCAPE, e.from(t));
  }
  static parseClassChar(e, t) {
    if (!e.more()) throw new he(q.ERR_MISSING_BRACKET, e.from(t));
    return e.lookingAt("\\") ? q.parseEscape(e) : e.pop();
  }
  static concatRunes(e, t) {
    for (let n = 0; n < t.length; n++) e.push(t[n]);
    return e;
  }
  static hasCapture(e) {
    if (e === null) return !1;
    if (e.op === w.Op.CAPTURE) return !0;
    if (e.subs) {
      for (let t of e.subs) if (q.hasCapture(t)) return !0;
    }
    return !1;
  }
  constructor(e, t = 0) {
    this.wholeRegexp = e, this.flags = t, this.numCap = 0, this.namedGroups = /* @__PURE__ */ Object.create(null), this.stack = [], this.free = null, this.numRegexp = 0, this.numRunes = 0, this.repeats = 0, this.height = null, this.size = null, this.nlb = 0;
  }
  newRegexp(e) {
    let t = this.free;
    return t !== null && t.subs !== null && t.subs.length > 0 ? (this.free = t.subs[0], t.reinit(), t.op = e) : (t = new w(e), this.numRegexp += 1), t;
  }
  reuse(e) {
    this.height !== null && this.height.has(e) && this.height.delete(e), e.subs !== null && e.subs.length > 0 && (e.subs[0] = this.free), this.free = e;
  }
  checkLimits(e) {
    if (this.numRunes > q.MAX_RUNES) throw new he(q.ERR_LARGE);
    this.checkSize(e), this.checkHeight(e);
  }
  checkSize(e) {
    if (this.size === null) {
      if (this.repeats === 0 && (this.repeats = 1), e.op === w.Op.REPEAT) {
        let t = e.max;
        t === -1 && (t = e.min), t <= 0 && (t = 1), t > Math.floor(q.MAX_SIZE / this.repeats) ? this.repeats = q.MAX_SIZE : this.repeats *= t;
      }
      if (this.numRegexp < Math.floor(q.MAX_SIZE / this.repeats)) return;
      this.size = /* @__PURE__ */ new Map();
      for (let t of this.stack) this.checkSize(t);
    }
    if (this.calcSize(e, !0) > q.MAX_SIZE) throw new he(q.ERR_LARGE);
  }
  calcSize(e, t = !1) {
    if (!t && this.size !== null && this.size.has(e))
      return this.size.get(e);
    let n = 0;
    switch (e.op) {
      case w.Op.LITERAL:
        n = e.runes.length;
        break;
      case w.Op.PLB:
      case w.Op.NLB:
      case w.Op.CAPTURE:
      case w.Op.STAR:
        n = 2 + this.calcSize(e.subs[0]);
        break;
      case w.Op.PLUS:
      case w.Op.QUEST:
        n = 1 + this.calcSize(e.subs[0]);
        break;
      case w.Op.CONCAT:
        for (let s of e.subs) n = n + this.calcSize(s);
        break;
      case w.Op.ALTERNATE:
        for (let s of e.subs) n = n + this.calcSize(s);
        e.subs.length > 1 && (n = n + e.subs.length - 1);
        break;
      case w.Op.REPEAT: {
        let s = this.calcSize(e.subs[0]);
        if (e.max === -1) {
          e.min === 0 ? n = 2 + s : n = 1 + e.min * s;
          break;
        }
        n = e.max * s + (e.max - e.min);
        break;
      }
    }
    return n = Math.max(1, n), this.size === null && (this.size = /* @__PURE__ */ new Map()), this.size.set(e, n), n;
  }
  checkHeight(e) {
    if (!(this.numRegexp < q.MAX_HEIGHT)) {
      if (this.height === null) {
        this.height = /* @__PURE__ */ new Map();
        for (let t of this.stack) this.checkHeight(t);
      }
      if (this.calcHeight(e, !0) > q.MAX_HEIGHT) throw new he(q.ERR_NESTING_DEPTH);
    }
  }
  calcHeight(e, t = !1) {
    if (!t && this.height !== null && this.height.has(e))
      return this.height.get(e);
    let n = 1;
    for (let s of e.subs) {
      const i = this.calcHeight(s);
      n < 1 + i && (n = 1 + i);
    }
    return this.height === null && (this.height = /* @__PURE__ */ new Map()), this.height.set(e, n), n;
  }
  pop() {
    return this.stack.pop();
  }
  popToPseudo() {
    const e = this.stack.length;
    let t = e;
    for (; t > 0 && !w.isPseudoOp(this.stack[t - 1].op); ) t--;
    const n = this.stack.slice(t, e);
    return this.stack = this.stack.slice(0, t), n;
  }
  push(e) {
    if (this.numRunes += e.runes.length, e.op === w.Op.CHAR_CLASS && e.runes.length === 2 && e.runes[0] === e.runes[1]) {
      if (this.maybeConcat(e.runes[0], this.flags & -2)) return null;
      e.op = w.Op.LITERAL, e.runes = [e.runes[0]], e.flags = this.flags & -2;
    } else if (e.op === w.Op.CHAR_CLASS && e.runes.length === 4 && e.runes[0] === e.runes[1] && e.runes[2] === e.runes[3] && J.simpleFold(e.runes[0]) === e.runes[2] && J.simpleFold(e.runes[2]) === e.runes[0] || e.op === w.Op.CHAR_CLASS && e.runes.length === 2 && e.runes[0] + 1 === e.runes[1] && J.simpleFold(e.runes[0]) === e.runes[1] && J.simpleFold(e.runes[1]) === e.runes[0]) {
      if (this.maybeConcat(e.runes[0], this.flags | x.FOLD_CASE)) return null;
      e.op = w.Op.LITERAL, e.runes = [e.runes[0]], e.flags = this.flags | x.FOLD_CASE;
    } else this.maybeConcat(-1, 0);
    return this.stack.push(e), this.checkLimits(e), e;
  }
  maybeConcat(e, t) {
    const n = this.stack.length;
    if (n < 2) return !1;
    const s = this.stack[n - 1], i = this.stack[n - 2];
    return s.op !== w.Op.LITERAL || i.op !== w.Op.LITERAL || (s.flags & x.FOLD_CASE) !== (i.flags & x.FOLD_CASE) ? !1 : (i.runes = q.concatRunes(i.runes, s.runes), e >= 0 ? (s.runes = [e], s.flags = t, !0) : (this.pop(), this.reuse(s), !1));
  }
  newLiteral(e, t) {
    const n = this.newRegexp(w.Op.LITERAL);
    return n.flags = t, (t & x.FOLD_CASE) !== 0 && (e = q.minFoldRune(e)), n.runes = [e], n;
  }
  literal(e) {
    this.push(this.newLiteral(e, this.flags));
  }
  op(e) {
    const t = this.newRegexp(e);
    return t.flags = this.flags, this.push(t);
  }
  repeat(e, t, n, s, i, o) {
    let B = this.flags;
    if ((B & x.PERL_X) !== 0 && (i.more() && i.lookingAt("?") && (i.skip(1), B ^= x.NON_GREEDY), o !== -1))
      throw new he(q.ERR_INVALID_REPEAT_OP, i.from(o));
    const u = this.stack.length;
    if (u === 0) throw new he(q.ERR_MISSING_REPEAT_ARGUMENT, i.from(s));
    const c = this.stack[u - 1];
    if (w.isPseudoOp(c.op)) throw new he(q.ERR_MISSING_REPEAT_ARGUMENT, i.from(s));
    const C = this.newRegexp(e);
    if (C.min = t, C.max = n, C.flags = B, C.subs = [c], this.stack[u - 1] = C, this.checkLimits(C), e === w.Op.REPEAT && (t >= 2 || n >= 2) && !this.repeatIsValid(C, 1e3)) throw new he(q.ERR_INVALID_REPEAT_SIZE, i.from(s));
  }
  repeatIsValid(e, t) {
    if (e.op === w.Op.REPEAT) {
      let n = e.max;
      if (n === 0) return !0;
      if (n < 0 && (n = e.min), n > t) return !1;
      n > 0 && (t = Math.trunc(t / n));
    }
    for (let n of e.subs) if (!this.repeatIsValid(n, t)) return !1;
    return !0;
  }
  concat() {
    this.maybeConcat(-1, 0);
    const e = this.popToPseudo();
    return e.length === 0 ? this.push(this.newRegexp(w.Op.EMPTY_MATCH)) : this.push(this.collapse(e, w.Op.CONCAT));
  }
  alternate() {
    const e = this.popToPseudo();
    return e.length > 0 && this.cleanAlt(e[e.length - 1]), e.length === 0 ? this.push(this.newRegexp(w.Op.NO_MATCH)) : this.push(this.collapse(e, w.Op.ALTERNATE));
  }
  cleanAlt(e) {
    e.op === w.Op.CHAR_CLASS && (e.runes = new Ht(e.runes).cleanClass().toArray(), e.runes.length === 2 && e.runes[0] === 0 && e.runes[1] === J.MAX_RUNE ? (e.runes = [], e.op = w.Op.ANY_CHAR) : e.runes.length === 4 && e.runes[0] === 0 && e.runes[1] === N.CODES.get(`
`) - 1 && e.runes[2] === N.CODES.get(`
`) + 1 && e.runes[3] === J.MAX_RUNE && (e.runes = [], e.op = w.Op.ANY_CHAR_NOT_NL));
  }
  collapse(e, t) {
    if (e.length === 1) return e[0];
    let n = 0;
    for (let B of e) n += B.op === t ? B.subs.length : 1;
    let s = new Array(n).fill(null), i = 0;
    for (let B of e) if (B.op === t) {
      for (let u = 0; u < B.subs.length; u++) s[i++] = B.subs[u];
      this.reuse(B);
    } else s[i++] = B;
    let o = this.newRegexp(t);
    if (o.subs = s, t === w.Op.ALTERNATE && (o.subs = this.factor(o.subs), o.subs.length === 1)) {
      const B = o;
      o = o.subs[0], this.reuse(B);
    }
    return o;
  }
  factor(e) {
    if (e.length < 2) return e;
    let t = 0, n = e.length, s = 0, i = null, o = 0, B = 0, u = 0;
    for (let C = 0; C <= n; C++) {
      let f = null, m = 0, y = 0;
      if (C < n) {
        let b = e[t + C];
        if (b.op === w.Op.CONCAT && b.subs.length > 0 && (b = b.subs[0]), b.op === w.Op.LITERAL && (f = b.runes, m = b.runes.length, y = b.flags & x.FOLD_CASE), y === B) {
          let V = 0;
          for (; V < o && V < m && i[V] === f[V]; ) V++;
          if (V > 0) {
            o = V;
            continue;
          }
        }
      }
      if (C !== u) if (C === u + 1) e[s++] = e[t + u];
      else {
        const b = this.newRegexp(w.Op.LITERAL);
        b.flags = B, b.runes = i.slice(0, o);
        for (let z = u; z < C; z++)
          e[t + z] = this.removeLeadingString(e[t + z], o), this.checkLimits(e[t + z]);
        const V = this.collapse(e.slice(t + u, t + C), w.Op.ALTERNATE), j = this.newRegexp(w.Op.CONCAT);
        j.subs = [b, V], e[s++] = j;
      }
      u = C, i = f, o = m, B = y;
    }
    n = s, t = 0, u = 0, s = 0;
    let c = null;
    for (let C = 0; C <= n; C++) {
      let f = null;
      if (!(C < n && (f = q.leadingRegexp(e[t + C]), c !== null && c.equals(f) && (q.isCharClass(c) || c.op === w.Op.REPEAT && c.min === c.max && q.isCharClass(c.subs[0]))))) {
        if (C !== u) if (C === u + 1) e[s++] = e[t + u];
        else {
          const m = c;
          for (let V = u; V < C; V++) {
            const j = V !== u;
            e[t + V] = this.removeLeadingRegexp(e[t + V], j), this.checkLimits(e[t + V]);
          }
          const y = this.collapse(e.slice(t + u, t + C), w.Op.ALTERNATE), b = this.newRegexp(w.Op.CONCAT);
          b.subs = [m, y], e[s++] = b;
        }
        u = C, c = f;
      }
    }
    n = s, t = 0, u = 0, s = 0;
    for (let C = 0; C <= n; C++)
      if (!(C < n && q.isCharClass(e[t + C]))) {
        if (C !== u) if (C === u + 1) e[s++] = e[t + u];
        else {
          let f = u;
          for (let y = u + 1; y < C; y++) {
            const b = e[t + f], V = e[t + y];
            (b.op < V.op || b.op === V.op && (b.runes !== null ? b.runes.length : 0) < (V.runes !== null ? V.runes.length : 0)) && (f = y);
          }
          const m = e[t + u];
          e[t + u] = e[t + f], e[t + f] = m;
          for (let y = u + 1; y < C; y++)
            q.mergeCharClass(e[t + u], e[t + y]), this.reuse(e[t + y]);
          this.cleanAlt(e[t + u]), e[s++] = e[t + u];
        }
        C < n && (e[s++] = e[t + C]), u = C + 1;
      }
    n = s, t = 0, u = 0, s = 0;
    for (let C = 0; C < n; ++C)
      C + 1 < n && e[t + C].op === w.Op.EMPTY_MATCH && e[t + C + 1].op === w.Op.EMPTY_MATCH || (e[s++] = e[t + C]);
    return n = s, t = 0, e.slice(t, n);
  }
  removeLeadingString(e, t) {
    if (e.op === w.Op.CONCAT && e.subs.length > 0) {
      const n = this.removeLeadingString(e.subs[0], t);
      if (e.subs[0] = n, n.op === w.Op.EMPTY_MATCH)
        switch (this.reuse(n), e.subs.length) {
          case 0:
          case 1:
            e.op = w.Op.EMPTY_MATCH, e.subs = w.emptySubs();
            break;
          case 2: {
            const s = e;
            e = e.subs[1], this.reuse(s);
            break;
          }
          default:
            e.subs = e.subs.slice(1, e.subs.length);
            break;
        }
      return e;
    }
    return e.op === w.Op.LITERAL && (e.runes = e.runes.slice(t, e.runes.length), e.runes.length === 0 && (e.op = w.Op.EMPTY_MATCH)), e;
  }
  removeLeadingRegexp(e, t) {
    if (e.op === w.Op.CONCAT && e.subs.length > 0) {
      switch (t && this.reuse(e.subs[0]), e.subs = e.subs.slice(1, e.subs.length), e.subs.length) {
        case 0:
          e.op = w.Op.EMPTY_MATCH, e.subs = w.emptySubs();
          break;
        case 1: {
          const n = e;
          e = e.subs[0], this.reuse(n);
          break;
        }
      }
      return e;
    }
    return t && this.reuse(e), this.newRegexp(w.Op.EMPTY_MATCH);
  }
  parseInternal() {
    if ((this.flags & x.LITERAL) !== 0) return q.literalRegexp(this.wholeRegexp, this.flags);
    let e = -1, t = -1, n = -1;
    const s = new qp(this.wholeRegexp);
    for (; s.more(); ) {
      let i = -1;
      e: switch (s.peek()) {
        case N.CODES.get("("):
          if ((this.flags & x.LOOKBEHIND) !== 0) {
            if (s.lookingAt("(?<=")) {
              this.parsePosLookBehind(), s.skip(4);
              break;
            }
            if (s.lookingAt("(?<!")) {
              this.parseNegLookBehind(), s.skip(4);
              break;
            }
          }
          if ((this.flags & x.PERL_X) !== 0 && s.lookingAt("(?")) {
            this.parsePerlFlags(s);
            break;
          }
          this.op(w.Op.LEFT_PAREN).cap = ++this.numCap, s.skip(1);
          break;
        case N.CODES.get("|"):
          this.parseVerticalBar(), s.skip(1);
          break;
        case N.CODES.get(")"):
          this.parseRightParen(), s.skip(1);
          break;
        case N.CODES.get("^"):
          (this.flags & x.ONE_LINE) !== 0 ? this.op(w.Op.BEGIN_TEXT) : this.op(w.Op.BEGIN_LINE), s.skip(1);
          break;
        case N.CODES.get("$"):
          (this.flags & x.ONE_LINE) !== 0 ? this.op(w.Op.END_TEXT).flags |= x.WAS_DOLLAR : this.op(w.Op.END_LINE), s.skip(1);
          break;
        case N.CODES.get("."):
          (this.flags & x.DOT_NL) !== 0 ? this.op(w.Op.ANY_CHAR) : this.op(w.Op.ANY_CHAR_NOT_NL), s.skip(1);
          break;
        case N.CODES.get("["):
          this.parseClass(s);
          break;
        case N.CODES.get("*"):
        case N.CODES.get("+"):
        case N.CODES.get("?"): {
          i = s.pos();
          let o = null;
          switch (s.pop()) {
            case N.CODES.get("*"):
              o = w.Op.STAR;
              break;
            case N.CODES.get("+"):
              o = w.Op.PLUS;
              break;
            case N.CODES.get("?"):
              o = w.Op.QUEST;
              break;
          }
          this.repeat(o, t, n, i, s, e);
          break;
        }
        case N.CODES.get("{"): {
          i = s.pos();
          const o = q.parseRepeat(s);
          if (o < 0) {
            s.rewindTo(i), this.literal(s.pop());
            break;
          }
          t = o >> 16, n = (o & J.MAX_BMP) << 16 >> 16, this.repeat(w.Op.REPEAT, t, n, i, s, e);
          break;
        }
        case N.CODES.get("\\"): {
          const o = s.pos();
          if (s.skip(1), (this.flags & x.PERL_X) !== 0 && s.more()) switch (s.pop()) {
            case N.CODES.get("A"):
              this.op(w.Op.BEGIN_TEXT);
              break e;
            case N.CODES.get("b"):
              this.op(w.Op.WORD_BOUNDARY);
              break e;
            case N.CODES.get("B"):
              this.op(w.Op.NO_WORD_BOUNDARY);
              break e;
            case N.CODES.get("C"):
              throw new he(q.ERR_INVALID_ESCAPE, "\\C");
            case N.CODES.get("Q"): {
              let c = s.rest();
              const C = c.indexOf("\\E");
              C >= 0 ? (c = c.substring(0, C), s.skipString(c), s.skipString("\\E")) : s.skipString(c);
              let f = 0;
              for (; f < c.length; ) {
                const m = c.codePointAt(f);
                this.literal(m), f += K.charCount(m);
              }
              break e;
            }
            case N.CODES.get("z"):
              this.op(w.Op.END_TEXT);
              break e;
            default:
              s.rewindTo(o);
              break;
          }
          else s.rewindTo(o);
          const B = this.newRegexp(w.Op.CHAR_CLASS);
          if (B.flags = this.flags, s.lookingAt("\\p") || s.lookingAt("\\P")) {
            const c = new Ht();
            if (this.parseUnicodeClass(s, c)) {
              B.runes = c.toArray(), this.push(B);
              break e;
            }
          }
          const u = new Ht();
          if (this.parsePerlClassEscape(s, u)) {
            B.runes = u.toArray(), this.push(B);
            break e;
          }
          s.rewindTo(o), this.reuse(B), this.literal(q.parseEscape(s));
          break;
        }
        default:
          this.literal(s.pop());
          break;
      }
      e = i;
    }
    if (this.concat(), this.swapVerticalBar() && this.pop(), this.alternate(), this.stack.length !== 1) throw new he(q.ERR_MISSING_PAREN, this.wholeRegexp);
    return this.stack[0].namedGroups = this.namedGroups, this.stack[0];
  }
  parsePerlFlags(e) {
    const t = e.pos(), n = e.rest();
    if (n.startsWith("(?P<") || n.startsWith("(?<")) {
      const B = n.charAt(2) === "P" ? 4 : 3, u = n.indexOf(">");
      if (u < 0) throw new he(q.ERR_INVALID_NAMED_CAPTURE, n);
      const c = n.substring(B, u);
      if (e.skipString(c), e.skip(B + 1), !q.isValidCaptureName(c)) throw new he(q.ERR_INVALID_NAMED_CAPTURE, n.substring(0, u + 1));
      const C = this.op(w.Op.LEFT_PAREN);
      if (C.cap = ++this.numCap, this.namedGroups[c]) throw new he(q.ERR_DUPLICATE_NAMED_CAPTURE, c);
      this.namedGroups[c] = this.numCap, C.name = c;
      return;
    }
    e.skip(2);
    let s = this.flags, i = 1, o = !1;
    e: for (; e.more(); ) {
      const B = e.pop();
      switch (B) {
        case N.CODES.get("i"):
          s |= x.FOLD_CASE, o = !0;
          break;
        case N.CODES.get("m"):
          s &= -17, o = !0;
          break;
        case N.CODES.get("s"):
          s |= x.DOT_NL, o = !0;
          break;
        case N.CODES.get("U"):
          s |= x.NON_GREEDY, o = !0;
          break;
        case N.CODES.get("-"):
          if (i < 0) break e;
          i = -1, s = ~s, o = !1;
          break;
        case N.CODES.get(":"):
        case N.CODES.get(")"):
          if (i < 0) {
            if (!o) break e;
            s = ~s;
          }
          B === N.CODES.get(":") && this.op(w.Op.LEFT_PAREN), this.flags = s;
          return;
        default:
          break e;
      }
    }
    throw new he(q.ERR_INVALID_PERL_OP, e.from(t));
  }
  parsePosLookBehind() {
    const e = this.newRegexp(w.Op.LEFT_PAREN);
    return e.flags = this.flags, e.lb = ++this.nlb, this.push(e);
  }
  parseNegLookBehind() {
    const e = this.newRegexp(w.Op.LEFT_PAREN);
    return e.flags = this.flags, e.lb = -++this.nlb, this.push(e);
  }
  parseVerticalBar() {
    this.concat(), this.swapVerticalBar() || this.op(w.Op.VERTICAL_BAR);
  }
  swapVerticalBar() {
    const e = this.stack.length;
    if (e >= 3 && this.stack[e - 2].op === w.Op.VERTICAL_BAR && q.isCharClass(this.stack[e - 1]) && q.isCharClass(this.stack[e - 3])) {
      let t = this.stack[e - 1], n = this.stack[e - 3];
      if (t.op > n.op) {
        const s = n;
        n = t, t = s, this.stack[e - 3] = n;
      }
      return q.mergeCharClass(n, t), this.reuse(t), this.pop(), !0;
    }
    if (e >= 2) {
      const t = this.stack[e - 1], n = this.stack[e - 2];
      if (n.op === w.Op.VERTICAL_BAR)
        return e >= 3 && this.cleanAlt(this.stack[e - 3]), this.stack[e - 2] = t, this.stack[e - 1] = n, !0;
    }
    return !1;
  }
  parseRightParen() {
    if (this.concat(), this.swapVerticalBar() && this.pop(), this.alternate(), this.stack.length < 2) throw new he(q.ERR_UNEXPECTED_PAREN, this.wholeRegexp);
    const e = this.pop(), t = this.pop();
    if (t.op !== w.Op.LEFT_PAREN) throw new he(q.ERR_UNEXPECTED_PAREN, this.wholeRegexp);
    if (this.flags = t.flags, t.lb !== 0) {
      if (q.hasCapture(e)) throw new he(q.ERR_INVALID_CAPTURE_IN_LOOKBEHIND, this.wholeRegexp);
      t.lb > 0 ? t.op = w.Op.PLB : t.op = w.Op.NLB, t.subs = [e], this.push(t);
      return;
    }
    t.cap === 0 ? this.push(e) : (t.op = w.Op.CAPTURE, t.subs = [e], this.push(t));
  }
  parsePerlClassEscape(e, t) {
    const n = e.pos();
    if ((this.flags & x.PERL_X) === 0 || !e.more() || e.pop() !== N.CODES.get("\\") || !e.more()) return !1;
    e.pop();
    const s = e.from(n), i = rl.has(s) ? rl.get(s) : null;
    return i === null ? !1 : (t.appendGroup(i, (this.flags & x.FOLD_CASE) !== 0), !0);
  }
  parseNamedClass(e, t) {
    const n = e.rest(), s = n.indexOf(":]");
    if (s < 0) return !1;
    const i = n.substring(0, s + 2);
    e.skipString(i);
    const o = ml.has(i) ? ml.get(i) : null;
    if (o === null) throw new he(q.ERR_INVALID_CHAR_RANGE, i);
    return t.appendGroup(o, (this.flags & x.FOLD_CASE) !== 0), !0;
  }
  parseUnicodeClass(e, t) {
    const n = e.pos();
    if ((this.flags & x.UNICODE_GROUPS) === 0 || !e.lookingAt("\\p") && !e.lookingAt("\\P")) return !1;
    e.skip(1);
    let s = 1, i = e.pop();
    if (i === N.CODES.get("P") && (s = -1), !e.more())
      throw e.rewindTo(n), new he(q.ERR_INVALID_CHAR_RANGE, e.rest());
    i = e.pop();
    let o;
    if (i !== N.CODES.get("{")) o = K.runeToString(i);
    else {
      const C = e.rest(), f = C.indexOf("}");
      if (f < 0)
        throw e.rewindTo(n), new he(q.ERR_INVALID_CHAR_RANGE, e.rest());
      o = C.substring(0, f), e.skipString(o), e.skip(1);
    }
    o.length !== 0 && o.codePointAt(0) === N.CODES.get("^") && (s = 0 - s, o = o.substring(1));
    const B = q.unicodeTable(o);
    if (B === null) throw new he(q.ERR_INVALID_CHAR_RANGE, e.from(n));
    B.sign < 0 && (s = 0 - s);
    const u = B.tab, c = B.fold;
    if ((this.flags & x.FOLD_CASE) === 0 || c === null) t.appendTableWithSign(u, s);
    else {
      const C = new Ht().appendTable(u).appendTable(c).cleanClass().toArray();
      t.appendClassWithSign(C, s);
    }
    return !0;
  }
  parseClass(e) {
    const t = e.pos();
    e.skip(1);
    const n = this.newRegexp(w.Op.CHAR_CLASS);
    n.flags = this.flags;
    const s = new Ht();
    let i = 1;
    e.more() && e.lookingAt("^") && (i = -1, e.skip(1), (this.flags & x.CLASS_NL) === 0 && s.appendRange(N.CODES.get(`
`), N.CODES.get(`
`)));
    let o = !0;
    for (; !e.more() || e.peek() !== N.CODES.get("]") || o; ) {
      if (e.more() && e.lookingAt("-") && (this.flags & x.PERL_X) === 0 && !o) {
        const C = e.rest();
        if (C === "-" || !C.startsWith("-]"))
          throw e.rewindTo(t), new he(q.ERR_INVALID_CHAR_RANGE, e.rest());
      }
      o = !1;
      const B = e.pos();
      if (e.lookingAt("[:")) {
        if (this.parseNamedClass(e, s)) continue;
        e.rewindTo(B);
      }
      if (this.parseUnicodeClass(e, s) || this.parsePerlClassEscape(e, s)) continue;
      e.rewindTo(B);
      const u = q.parseClassChar(e, t);
      let c = u;
      if (e.more() && e.lookingAt("-")) {
        if (e.skip(1), e.more() && e.lookingAt("]")) e.skip(-1);
        else if (c = q.parseClassChar(e, t), c < u) throw new he(q.ERR_INVALID_CHAR_RANGE, e.from(B));
      }
      (this.flags & x.FOLD_CASE) === 0 ? s.appendRange(u, c) : s.appendFoldedRange(u, c);
    }
    e.skip(1), s.cleanClass(), i < 0 && s.negateClass(), n.runes = s.toArray(), this.push(n);
  }
}, Qp = class pn {
  static initTest(e) {
    const t = pn.compile(e), n = new pn(t.expr, t.prog, t.numSubexp, t.longest);
    return n.cond = t.cond, n.prefix = t.prefix, n.prefixUTF8 = t.prefixUTF8, n.prefixComplete = t.prefixComplete, n.prefixRune = t.prefixRune, n.prefilter = t.prefilter, n;
  }
  /**
  * Parses a regular expression and returns, if successful, an {@code RE2} instance that can be
  * used to match against text.
  *
  * When matching against text, the regexp returns a match that begins as early as possible in the
  * input (leftmost), and among those it chooses the one that a backtracking search would have
  * found first. This so-called leftmost-first matching is the same semantics that Perl, Python,
  * and other implementations use, although this package implements it without the expense of
  * backtracking. For POSIX leftmost-longest matching, see {@link #compilePOSIX}.
  */
  static compile(e) {
    return pn.compileImpl(e, x.PERL, !1);
  }
  /**
  * {@code compilePOSIX} is like {@link #compile} but restricts the regular expression to POSIX ERE
  * (egrep) syntax and changes the match semantics to leftmost-longest.
  *
  * That is, when matching against text, the regexp returns a match that begins as early as
  * possible in the input (leftmost), and among those it chooses a match that is as long as
  * possible. This so-called leftmost-longest matching is the same semantics that early regular
  * expression implementations used and that POSIX specifies.
  *
  * However, there can be multiple leftmost-longest matches, with different submatch choices, and
  * here this package diverges from POSIX. Among the possible leftmost-longest matches, this
  * package chooses the one that a backtracking search would have found first, while POSIX
  * specifies that the match be chosen to maximize the length of the first subexpression, then the
  * second, and so on from left to right. The POSIX rule is computationally prohibitive and not
  * even well-defined. See http://swtch.com/~rsc/regexp/regexp2.html#posix
  */
  static compilePOSIX(e) {
    return pn.compileImpl(e, x.POSIX, !0);
  }
  static compileImpl(e, t, n) {
    let s = Kp.parse(e, t);
    const i = s.maxCap();
    s = Jp.simplify(s);
    const o = Hp.build(s), B = jp.compileRegexp(s), u = new pn(e, B, i, n);
    u.prefilter = o.type === ae.Type.NONE ? null : o;
    const [c, C] = B.prefix();
    return u.prefixComplete = c, u.prefix = C, u.prefixUTF8 = K.stringToUtf8ByteArray(u.prefix), u.prefix.length > 0 && (u.prefixRune = u.prefix.codePointAt(0)), u.namedGroups = s.namedGroups, u;
  }
  /**
  * Returns true iff textual regular expression {@code pattern} matches string {@code s}.
  *
  * More complicated queries need to use {@link #compile} and the full {@code RE2} interface.
  */
  static match(e, t) {
    return pn.compile(e).match(t);
  }
  constructor(e, t, n = 0, s = 0) {
    this.expr = e, this.prog = t, this.numSubexp = n, this.longest = s, this.cond = t.startCond(), this.prefix = null, this.prefixUTF8 = null, this.prefixComplete = !1, this.prefixRune = 0, this.machinePool = [], this.dfa = new Sp(this.prog), this.onepass = Xu.compile(this.prog), this.prefilter = null;
  }
  matchPrefixComplete(e, t, n, s) {
    if ((n === x.ANCHOR_START || n === x.ANCHOR_BOTH) && t !== 0) return null;
    let i = -1, o = -1;
    const B = e.prefixLength(this);
    if (n === x.UNANCHORED) {
      const u = e.index(this, t);
      if (u < 0) return null;
      i = t + u, o = i + B;
    } else if (n === x.ANCHOR_BOTH) {
      if (e.endPos() !== B || e.index(this, 0) !== 0) return null;
      i = 0, o = B;
    } else if (n === x.ANCHOR_START) {
      if (e.index(this, 0) !== 0) return null;
      i = 0, o = B;
    }
    if (i < 0) return null;
    if (s > 0) {
      const u = new Int32Array(s).fill(-1);
      return u[0] = i, u[1] = o, Array.from(u);
    }
    return [];
  }
  executeEngine(e, t, n, s) {
    if (this.prefixComplete && (s === 0 || this.numSubexp === 0)) return this.matchPrefixComplete(e, t, n, s);
    if (this.prefilter !== null && n === x.UNANCHORED && !this.prefilter.eval(e, t))
      return null;
    if (this.onepass !== null) return Xu.execute(this, e, t, n, s);
    if (s > 0)
      return this.prog.numLb === 0 && e.endPos() <= Gs.maxBitStateLen(this.prog) ? Gs.execute(this, e, t, n, s) : this.doExecuteNFA(e, t, n, s);
    if (this.prog.numLb === 0) {
      const i = this.dfa.match(e, t, n);
      if (i !== null) return i ? [] : null;
      if (e.endPos() <= Gs.maxBitStateLen(this.prog)) return Gs.execute(this, e, t, n, s);
    }
    return this.doExecuteNFA(e, t, n, s);
  }
  /**
  * Returns the number of parenthesized subexpressions in this regular expression.
  */
  numberOfCapturingGroups() {
    return this.numSubexp;
  }
  /**
  * Returns the number of instructions in this compiled regular expression program.
  */
  numberOfInstructions() {
    return this.prog.numInst();
  }
  get() {
    return this.machinePool.length > 0 ? this.machinePool.pop() : null;
  }
  reset() {
    this.machinePool.length = 0;
  }
  put(e) {
    this.machinePool.push(e);
  }
  toString() {
    return this.expr;
  }
  doExecuteNFA(e, t, n, s) {
    let i = this.get();
    i || (i = Rp.fromRE2(this)), i.init(s);
    const o = i.match(e, t, n) ? i.submatches() : null;
    return this.put(i), o;
  }
  match(e) {
    return this.executeEngine(fe.fromUTF16(e), 0, x.UNANCHORED, 0) !== null;
  }
  /**
  * Matches the regular expression against input starting at position start and ending at position
  * end, with the given anchoring. Records the submatch boundaries in group, which is [start, end)
  * pairs of byte offsets. The number of boundaries needed is inferred from the size of the group
  * array. It is most efficient not to ask for submatch boundaries.
  *
  * @param input the input byte array
  * @param start the beginning position in the input
  * @param end the end position in the input
  * @param anchor the anchoring flag (UNANCHORED, ANCHOR_START, ANCHOR_BOTH)
  * @param group the array to fill with submatch positions
  * @param ngroup the number of array pairs to fill in
  * @returns true if a match was found
  */
  matchWithGroup(e, t, n, s, i) {
    return e instanceof An || (K.isByteArray(e) ? e = En.utf8(e) : e = En.utf16(e)), this.matchMachineInput(e, t, n, s, i);
  }
  matchMachineInput(e, t, n, s, i) {
    if (t > n) return [!1, null];
    const o = e.isUTF16Encoding() ? fe.fromUTF16(e.asCharSequence(), 0, n) : fe.fromUTF8(e.asBytes(), 0, n), B = this.executeEngine(o, t, s, 2 * i);
    return B === null ? [!1, null] : [!0, B];
  }
  /**
  * Returns true iff this regexp matches the UTF-8 byte array {@code b}.
  */
  matchUTF8(e) {
    return this.executeEngine(fe.fromUTF8(e), 0, x.UNANCHORED, 0) !== null;
  }
  /**
  * Returns a copy of {@code src} in which all matches for this regexp have been replaced by
  * {@code repl}. No support is provided for expressions (e.g. {@code \1} or {@code $1}) in the
  * replacement string.
  */
  replaceAll(e, t) {
    return this.replaceAllFunc(e, () => t, 2 * e.length + 1);
  }
  /**
  * Returns a copy of {@code src} in which only the first match for this regexp has been replaced
  * by {@code repl}. No support is provided for expressions (e.g. {@code \1} or {@code $1}) in the
  * replacement string.
  */
  replaceFirst(e, t) {
    return this.replaceAllFunc(e, () => t, 1);
  }
  /**
  * Returns a copy of {@code src} in which at most {@code maxReplaces} matches for this regexp have
  * been replaced by the return value of of function {@code repl} (whose first argument is the
  * matched string). No support is provided for expressions (e.g. {@code \1} or {@code $1}) in the
  * replacement string.
  */
  replaceAllFunc(e, t, n) {
    let s = 0, i = 0, o = "";
    const B = fe.fromUTF16(e);
    let u = 0;
    for (; i <= e.length; ) {
      const c = this.executeEngine(B, i, x.UNANCHORED, 2);
      if (c === null || c.length === 0) break;
      o += e.substring(s, c[0]), (c[1] > s || c[0] === 0) && (o += t(e.substring(c[0], c[1])), u++), s = c[1];
      const C = B.step(i) & 7;
      if (i + C > c[1] ? i += C : i + 1 > c[1] ? i++ : i = c[1], u >= n) break;
    }
    return o += e.substring(s), o;
  }
  pad(e) {
    if (e === null) return null;
    let t = (1 + this.numSubexp) * 2;
    if (e.length < t) {
      let n = new Array(t).fill(-1);
      for (let s = 0; s < e.length; s++) n[s] = e[s];
      e = n;
    }
    return e;
  }
  allMatches(e, t, n = (s) => s) {
    let s = [];
    const i = e.endPos();
    t < 0 && (t = i + 1);
    let o = 0, B = 0, u = -1;
    for (; B < t && o <= i; ) {
      const c = this.executeEngine(e, o, x.UNANCHORED, this.prog.numCap);
      if (c === null || c.length === 0) break;
      let C = !0;
      if (c[1] === o) {
        c[0] === u && (C = !1);
        const f = e.step(o);
        f < 0 ? o = i + 1 : o += f & 7;
      } else o = c[1];
      u = c[1], C && (s.push(n(this.pad(c))), B++);
    }
    return s;
  }
  /**
  * Returns an array holding the text of the leftmost match in {@code b} of this regular
  * expression.
  *
  * A return value of null indicates no match.
  */
  findUTF8(e) {
    const t = this.executeEngine(fe.fromUTF8(e), 0, x.UNANCHORED, 2);
    return t === null ? null : e.slice(t[0], t[1]);
  }
  /**
  * Returns a two-element array of integers defining the location of the leftmost match in
  * {@code b} of this regular expression. The match itself is at {@code b[loc[0]...loc[1]]}.
  *
  * A return value of null indicates no match.
  */
  findUTF8Index(e) {
    const t = this.executeEngine(fe.fromUTF8(e), 0, x.UNANCHORED, 2);
    return t === null ? null : t.slice(0, 2);
  }
  /**
  * Returns a string holding the text of the leftmost match in {@code s} of this regular
  * expression.
  *
  * If there is no match, the return value is an empty string, but it will also be empty if the
  * regular expression successfully matches an empty string. Use {@link #findIndex} or
  * {@link #findSubmatch} if it is necessary to distinguish these cases.
  */
  find(e) {
    const t = this.executeEngine(fe.fromUTF16(e), 0, x.UNANCHORED, 2);
    return t === null ? "" : e.substring(t[0], t[1]);
  }
  /**
  * Returns a two-element array of integers defining the location of the leftmost match in
  * {@code s} of this regular expression. The match itself is at
  * {@code s.substring(loc[0], loc[1])}.
  *
  * A return value of null indicates no match.
  */
  findIndex(e) {
    return this.executeEngine(fe.fromUTF16(e), 0, x.UNANCHORED, 2);
  }
  /**
  * Returns an array of arrays the text of the leftmost match of the regular expression in
  * {@code b} and the matches, if any, of its subexpressions, as defined by the <a
  * href='#submatch'>Submatch</a> description above.
  *
  * A return value of null indicates no match.
  */
  findUTF8Submatch(e) {
    const t = this.executeEngine(fe.fromUTF8(e), 0, x.UNANCHORED, this.prog.numCap);
    if (t === null) return null;
    const n = new Array(1 + this.numSubexp).fill(null);
    for (let s = 0; s < n.length; s++) 2 * s < t.length && t[2 * s] >= 0 && (n[s] = e.slice(t[2 * s], t[2 * s + 1]));
    return n;
  }
  /**
  * Returns an array holding the index pairs identifying the leftmost match of this regular
  * expression in {@code b} and the matches, if any, of its subexpressions, as defined by the the
  * <a href='#submatch'>Submatch</a> and <a href='#index'>Index</a> descriptions above.
  *
  * A return value of null indicates no match.
  */
  findUTF8SubmatchIndex(e) {
    return this.pad(this.executeEngine(fe.fromUTF8(e), 0, x.UNANCHORED, this.prog.numCap));
  }
  /**
  * Returns an array of strings holding the text of the leftmost match of the regular expression in
  * {@code s} and the matches, if any, of its subexpressions, as defined by the <a
  * href='#submatch'>Submatch</a> description above.
  *
  * A return value of null indicates no match.
  */
  findSubmatch(e) {
    const t = this.executeEngine(fe.fromUTF16(e), 0, x.UNANCHORED, this.prog.numCap);
    if (t === null) return null;
    const n = new Array(1 + this.numSubexp).fill(null);
    for (let s = 0; s < n.length; s++) 2 * s < t.length && t[2 * s] >= 0 && (n[s] = e.substring(t[2 * s], t[2 * s + 1]));
    return n;
  }
  /**
  * Returns an array holding the index pairs identifying the leftmost match of this regular
  * expression in {@code s} and the matches, if any, of its subexpressions, as defined by the <a
  * href='#submatch'>Submatch</a> description above.
  *
  * A return value of null indicates no match.
  */
  findSubmatchIndex(e) {
    return this.pad(this.executeEngine(fe.fromUTF16(e), 0, x.UNANCHORED, this.prog.numCap));
  }
  /**
  * {@code findAllUTF8()} is the <a href='#all'>All</a> version of {@link #findUTF8}; it returns a
  * list of up to {@code n} successive matches of the expression, as defined by the <a
  * href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  *
  * TODO(adonovan): think about defining a byte slice view class, like a read-only Go slice backed
  * by |b|.
  */
  findAllUTF8(e, t) {
    const n = this.allMatches(fe.fromUTF8(e), t, (s) => e.slice(s[0], s[1]));
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAllUTF8Index} is the <a href='#all'>All</a> version of {@link #findUTF8Index}; it
  * returns a list of up to {@code n} successive matches of the expression, as defined by the <a
  * href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  */
  findAllUTF8Index(e, t) {
    const n = this.allMatches(fe.fromUTF8(e), t, (s) => s.slice(0, 2));
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAll} is the <a href='#all'>All</a> version of {@link #find}; it returns a list of up
  * to {@code n} successive matches of the expression, as defined by the <a href='#all'>All</a>
  * description above.
  *
  * A return value of null indicates no match.
  */
  findAll(e, t) {
    const n = this.allMatches(fe.fromUTF16(e), t, (s) => e.substring(s[0], s[1]));
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAllIndex} is the <a href='#all'>All</a> version of {@link #findIndex}; it returns a
  * list of up to {@code n} successive matches of the expression, as defined by the <a
  * href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  */
  findAllIndex(e, t) {
    const n = this.allMatches(fe.fromUTF16(e), t, (s) => s.slice(0, 2));
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAllUTF8Submatch} is the <a href='#all'>All</a> version of {@link #findUTF8Submatch};
  * it returns a list of up to {@code n} successive matches of the expression, as defined by the <a
  * href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  */
  findAllUTF8Submatch(e, t) {
    const n = this.allMatches(fe.fromUTF8(e), t, (s) => {
      let i = new Array(s.length / 2 | 0).fill(null);
      for (let o = 0; o < i.length; o++) s[2 * o] >= 0 && (i[o] = e.slice(s[2 * o], s[2 * o + 1]));
      return i;
    });
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAllUTF8SubmatchIndex} is the <a href='#all'>All</a> version of
  * {@link #findUTF8SubmatchIndex}; it returns a list of up to {@code n} successive matches of the
  * expression, as defined by the <a href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  */
  findAllUTF8SubmatchIndex(e, t) {
    const n = this.allMatches(fe.fromUTF8(e), t);
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAllSubmatch} is the <a href='#all'>All</a> version of {@link #findSubmatch}; it
  * returns a list of up to {@code n} successive matches of the expression, as defined by the <a
  * href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  */
  findAllSubmatch(e, t) {
    const n = this.allMatches(fe.fromUTF16(e), t, (s) => {
      let i = new Array(s.length / 2 | 0).fill(null);
      for (let o = 0; o < i.length; o++) s[2 * o] >= 0 && (i[o] = e.substring(s[2 * o], s[2 * o + 1]));
      return i;
    });
    return n.length === 0 ? null : n;
  }
  /**
  * {@code findAllSubmatchIndex} is the <a href='#all'>All</a> version of
  * {@link #findSubmatchIndex}; it returns a list of up to {@code n} successive matches of the
  * expression, as defined by the <a href='#all'>All</a> description above.
  *
  * A return value of null indicates no match.
  */
  findAllSubmatchIndex(e, t) {
    const n = this.allMatches(fe.fromUTF16(e), t);
    return n.length === 0 ? null : n;
  }
}, zp = class Vn {
  static isHexadecimal(e) {
    return "0" <= e && e <= "9" || "A" <= e && e <= "F" || "a" <= e && e <= "f";
  }
  static translate(e) {
    let t = "";
    if (e instanceof RegExp && (e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.dotAll && (t += "s"), e = e.source), typeof e != "string") return e;
    let n = "", s = !1, i = e.length;
    i === 0 && (n = "(?:)", s = !0);
    let o = !1, B = 0;
    for (; B < i; ) {
      let c = e[B];
      if (c === "\\") {
        if (B + 1 < i)
          switch (c = e[B + 1], c) {
            case "\\":
              n += "\\\\", B += 2;
              continue;
            case "c":
              if (B + 2 < i) {
                let m = e[B + 2].charCodeAt(0);
                if (m >= 65 && m <= 90 || m >= 97 && m <= 122) {
                  let y = m % 32;
                  n += "\\x", n += (y >> 4).toString(16).toUpperCase(), n += (y & 15).toString(16).toUpperCase(), B += 3, s = !0;
                  continue;
                }
              }
              n += "c", B += 2, s = !0;
              continue;
            case "u":
              if (B + 2 < i) {
                if (e[B + 2] === "{") {
                  let m = B + 3, y = !1, b = !1;
                  for (; m < i; ) {
                    const V = e[m];
                    if (V === "}") {
                      b = !0;
                      break;
                    }
                    if (!Vn.isHexadecimal(V)) break;
                    y = !0, m++;
                  }
                  if (b && y) {
                    n += "\\x", B += 2, s = !0;
                    continue;
                  }
                } else if (B + 5 < i) {
                  let m = !0;
                  for (let y = 0; y < 4; y++) if (!Vn.isHexadecimal(e[B + 2 + y])) {
                    m = !1;
                    break;
                  }
                  if (m) {
                    n += "\\x{" + e.substring(B + 2, B + 6) + "}", B += 6, s = !0;
                    continue;
                  }
                }
              }
              n += "u", B += 2, s = !0;
              continue;
            case "x": {
              let m = !1;
              if (B + 2 < i && e[B + 2] === "{") {
                let y = B + 3, b = !1, V = !1;
                for (; y < i; ) {
                  const j = e[y];
                  if (j === "}") {
                    V = !0;
                    break;
                  }
                  if (!Vn.isHexadecimal(j)) break;
                  b = !0, y++;
                }
                V && b && (m = !0);
              } else B + 3 < i && Vn.isHexadecimal(e[B + 2]) && Vn.isHexadecimal(e[B + 3]) && (m = !0);
              m ? (n += "\\x", B += 2) : (n += "x", B += 2, s = !0);
              continue;
            }
            case "n":
            case "r":
            case "t":
            case "a":
            case "f":
            case "v":
            case "d":
            case "D":
            case "s":
            case "S":
            case "w":
            case "W":
            case "b":
            case "B":
            case "p":
            case "P":
            case "A":
            case "z":
            case "Q":
            case "E":
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
              n += "\\" + c, B += 2;
              continue;
            default: {
              let m = e.codePointAt(B + 1);
              if (m >= 48 && m <= 57 || m >= 65 && m <= 90 || m >= 97 && m <= 122) {
                let y = K.charCount(m);
                n += e.substring(B + 1, B + 1 + y), B += y + 1, s = !0;
              } else {
                n += "\\";
                let y = K.charCount(m);
                n += e.substring(B + 1, B + 1 + y), B += y + 1;
              }
              continue;
            }
          }
      } else if (c === "/") {
        n += "\\/", B += 1, s = !0;
        continue;
      } else if (c === "[") o = !0;
      else if (c === "]") o = !1;
      else if (!o && c === "(" && B + 2 < i && e[B + 1] === "?" && e[B + 2] === "<" && B + 3 < i && !"=!>)".includes(e[B + 3])) {
        n += "(?P<", B += 3, s = !0;
        continue;
      }
      let C = e.codePointAt(B), f = K.charCount(C);
      n += e.substring(B, B + f), B += f;
    }
    const u = s ? n : e;
    return t.length > 0 ? `(?${t})${u}` : u;
  }
}, _a = class Et {
  /**
  * Flag: case insensitive matching.
  */
  static CASE_INSENSITIVE = Ln.CASE_INSENSITIVE;
  /**
  * Flag: dot ({@code .}) matches all characters, including newline.
  */
  static DOTALL = Ln.DOTALL;
  /**
  * Flag: multiline matching: {@code ^} and {@code $} match at beginning and end of line, not just
  * beginning and end of input.
  */
  static MULTILINE = Ln.MULTILINE;
  /**
  * Flag: Unicode groups (e.g. {@code \p\ Greek\} ) will be syntax errors.
  */
  static DISABLE_UNICODE_GROUPS = Ln.DISABLE_UNICODE_GROUPS;
  /**
  * Flag: matches longest possible string.
  */
  static LONGEST_MATCH = Ln.LONGEST_MATCH;
  /**
  * Flag: enable linear-time captureless lookbehinds.
  */
  static LOOKBEHINDS = Ln.LOOKBEHINDS;
  /**
  * Returns a literal pattern string for the specified string.
  *
  * This method produces a string that can be used to create a <code>RE2JS</code> that would
  * match the string <code>s</code> as if it were a literal pattern.
  *
  * Metacharacters or escape sequences in the input sequence will be given no special meaning.
  *
  * @param {string} str The string to be literalized
  * @returns {string} A literal string replacement
  */
  static quote(e) {
    return K.quoteMeta(e);
  }
  /**
  * Quotes '\' and '$' in {@code str}, so that the returned string could be used in
  * replacement methods as a literal replacement of {@code str}.
  *
  * This is a convenience delegation to {@link Matcher.quoteReplacement}.
  *
  * @param {string} str the string to be quoted
  * @param {boolean} [javaMode=false] whether the replacement will be used in javaMode
  * @returns {string} the quoted string
  */
  static quoteReplacement(e, t = !1) {
    return zu.quoteReplacement(e, t);
  }
  /**
  * Translates a given regular expression string to ensure compatibility with RE2JS.
  *
  * This function preprocesses the input regex string by applying necessary transformations,
  * such as escaping special characters (e.g., `/`), converting named capture groups to
  * RE2JS-compatible syntax, and handling Unicode sequences properly. It ensures that the
  * resulting regex is safe and properly formatted before compilation.
  *
  * @param {string|RegExp} expr - The regular expression string to be translated.
  * @returns {string} - The transformed regular expression string, ready for compilation.
  */
  static translateRegExp(e) {
    return zp.translate(e);
  }
  /**
  * Helper: create new RE2JS with given regex and flags. Flregex is the regex with flags applied.
  * @param {string} regex
  * @param {number} [flags=0]
  * @returns {RE2JS}
  */
  static compile(e, t = 0) {
    let n = e;
    if ((t & Et.CASE_INSENSITIVE) !== 0 && (n = `(?i)${n}`), (t & Et.DOTALL) !== 0 && (n = `(?s)${n}`), (t & Et.MULTILINE) !== 0 && (n = `(?m)${n}`), (t & -544) !== 0) throw new vp("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");
    let s = x.PERL;
    (t & Et.DISABLE_UNICODE_GROUPS) !== 0 && (s &= -129), (t & Et.LOOKBEHINDS) !== 0 && (s |= x.LOOKBEHIND);
    const i = new Et(e, t);
    return i.re2Input = Qp.compileImpl(n, s, (t & Et.LONGEST_MATCH) !== 0), i;
  }
  /**
  * Matches a string against a regular expression.
  *
  * @param {string} regex the regular expression
  * @param {string|number[]|Uint8Array} input the input
  * @returns {boolean} true if the regular expression matches the entire input
  * @throws RE2JSSyntaxException if the regular expression is malformed
  */
  static matches(e, t) {
    return Et.compile(e).testExact(t);
  }
  /**
  * This is visible for testing.
  * @private
  */
  static initTest(e, t, n) {
    if (e == null) throw new Error("pattern is null");
    if (n == null) throw new Error("re2 is null");
    const s = new Et(e, t);
    return s.re2Input = n, s;
  }
  /**
  *
  * @param {string} pattern
  * @param {number} flags
  */
  constructor(e, t) {
    this.patternInput = e, this.flagsInput = t, this.re2Input = null;
  }
  /**
  * Releases memory used by internal caches associated with this pattern. Does not change the
  * observable behaviour. Useful for tests that detect memory leaks via allocation tracking.
  */
  reset() {
    this.re2Input.reset();
  }
  /**
  * Returns the flags used in the constructor.
  * @returns {number}
  */
  flags() {
    return this.flagsInput;
  }
  /**
  * Returns the pattern used in the constructor.
  * @returns {string}
  */
  pattern() {
    return this.patternInput;
  }
  re2() {
    return this.re2Input;
  }
  /**
  * Matches a string against a regular expression.
  *
  * @param {string|number[]|Uint8Array} input the input
  * @returns {boolean} true if the regular expression matches the entire input
  */
  matches(e) {
    return this.testExact(e);
  }
  /**
  * Creates a new {@code Matcher} matching the pattern against the input.
  *
  * @param {string|number[]|Uint8Array|MatcherInputBase} input the input string
  * @returns {Matcher}
  */
  matcher(e) {
    return K.isByteArray(e) && (e = En.utf8(e)), new zu(this, e);
  }
  /**
  * Tests whether the regular expression matches any part of the input string.
  * Performance Note: This method is highly optimized. Because it only returns
  * a boolean and does not extract capture groups, it bypasses the `Matcher` overhead
  * and guarantees execution on the high-speed DFA engine whenever possible.
  *
  * @param {string|number[]|Uint8Array} input - The input string or UTF-8 byte array to test against.
  * @returns {boolean} `true` if the pattern is found anywhere in the input, `false` otherwise.
  */
  test(e) {
    return K.isByteArray(e) ? this.re2Input.matchUTF8(e) : this.re2Input.match(e);
  }
  /**
  * Tests whether the regular expression matches the ENTIRE input string.
  * * **Performance Note:** This operates identically to `.matches()`, but is significantly
  * faster because it does not request capture group data. By requesting 0 capture groups,
  * it securely routes execution through the DFA fast-path.
  *
  * @param {string|number[]|Uint8Array} input - The input string or UTF-8 byte array to test against.
  * @returns {boolean} `true` if the exact input string fully matches the pattern, `false` otherwise.
  */
  testExact(e) {
    const t = K.isByteArray(e) ? fe.fromUTF8(e) : fe.fromUTF16(e);
    return this.re2Input.executeEngine(t, 0, x.ANCHOR_BOTH, 0) !== null;
  }
  /**
  * Executes a search for a match in a specified string.
  * Returns a result array, or null if no match is found.
  * The returned array perfectly mirrors standard JavaScript `RegExpExecArray`,
  * including `.index`, `.input`, and `.groups` properties.
  *
  * @param {string|number[]|Uint8Array} input the input string or byte array
  * @returns {Array|null} the match array with index, input, and groups properties, or null
  */
  exec(e) {
    const t = this.matcher(e);
    if (!t.find()) return null;
    const n = [t.group(0)];
    for (let i = 1; i <= t.groupCount(); i++) {
      const o = t.group(i);
      n.push(o === null ? void 0 : o);
    }
    n.index = t.start(0), n.input = e;
    const s = this.namedGroups();
    if (Object.keys(s).length > 0) {
      const i = t.getNamedGroups();
      for (const o in i) i[o] === null && (i[o] = void 0);
      n.groups = i;
    } else n.groups = void 0;
    return n;
  }
  /**
  * Splits input around instances of the regular expression. It returns an array giving the strings
  * that occur before, between, and after instances of the regular expression.
  *
  * If {@code limit <= 0}, there is no limit on the size of the returned array. If
  * {@code limit == 0}, empty strings that would occur at the end of the array are omitted. If
  * {@code limit > 0}, at most limit strings are returned. The final string contains the remainder
  * of the input, possibly including additional matches of the pattern.
  *
  * @param {string} input the input string to be split
  * @param {number} [limit=0] the limit
  * @returns {string[]} the split strings
  */
  split(e, t = 0) {
    const n = this.matcher(e), s = [];
    let i = 0, o = 0;
    for (; n.find(); ) {
      if (o === 0 && n.end() === 0) {
        o = n.end();
        continue;
      }
      if (t > 0 && s.length === t - 1) break;
      if (o === n.start()) {
        if (t === 0) {
          i += 1, o = n.end();
          continue;
        }
      } else for (; i > 0; )
        s.push(""), i -= 1;
      s.push(n.substring(o, n.start())), o = n.end();
    }
    if (t === 0 && o !== n.inputLength()) {
      for (; i > 0; )
        s.push(""), i -= 1;
      s.push(n.substring(o, n.inputLength()));
    }
    return (t !== 0 || s.length === 0 && !(o === n.inputLength() && o > 0)) && s.push(n.substring(o, n.inputLength())), s;
  }
  /**
  * Returns an iterator of all results matching a string against the regular expression,
  * including capturing groups.
  *
  * @param {string|number[]|Uint8Array} input the input string or byte array
  * @returns {IterableIterator<RegExpMatchArray>}
  */
  *matchAll(e) {
    const t = this.matcher(e);
    for (; t.find(); ) {
      const n = [t.group(0)];
      for (let i = 1; i <= t.groupCount(); i++) {
        const o = t.group(i);
        n.push(o === null ? void 0 : o);
      }
      n.index = t.start(0), n.input = e;
      const s = this.namedGroups();
      if (Object.keys(s).length > 0) {
        const i = t.getNamedGroups();
        for (const o in i) i[o] === null && (i[o] = void 0);
        n.groups = i;
      } else n.groups = void 0;
      yield n;
    }
  }
  /**
  *
  * @returns {string}
  */
  toString() {
    return this.patternInput;
  }
  /**
  * Returns the program size of this pattern.
  *
  * <p>
  * Similar to the C++ implementation, the program size is a very approximate measure of a regexp's
  * "cost". Larger numbers are more expensive than smaller numbers.
  * </p>
  *
  * @returns {number} the program size of this pattern
  */
  programSize() {
    return this.re2Input.numberOfInstructions();
  }
  /**
  * Returns the number of capturing groups in this matcher's pattern. Group zero denotes the entire
  * pattern and is excluded from this count.
  *
  * @returns {number} the number of capturing groups in this pattern
  */
  groupCount() {
    return this.re2Input.numberOfCapturingGroups();
  }
  /**
  * Return a map of the capturing groups in this matcher's pattern, where key is the name and value
  * is the index of the group in the pattern.
  * @returns {Record<string, number>}
  */
  namedGroups() {
    return this.re2Input.namedGroups;
  }
  /**
  *
  * @param {*} other
  * @returns {boolean}
  */
  equals(e) {
    return this === e ? !0 : e === null || this.constructor !== e.constructor ? !1 : this.flagsInput === e.flagsInput && this.patternInput === e.patternInput;
  }
};
let sr = "12.19.0";
function $p(r) {
  sr = r;
}
const vn = new Mc("@firebase/firestore");
function Mn() {
  return vn.logLevel;
}
function U(r, ...e) {
  if (vn.logLevel <= ie.DEBUG) {
    const t = e.map(ya);
    vn.debug(`Firestore (${sr}): ${r}`, ...t);
  }
}
function Nt(r, ...e) {
  if (vn.logLevel <= ie.ERROR) {
    const t = e.map(ya);
    vn.error(`Firestore (${sr}): ${r}`, ...t);
  }
}
function dt(r, ...e) {
  if (vn.logLevel <= ie.WARN) {
    const t = e.map(ya);
    vn.warn(`Firestore (${sr}): ${r}`, ...t);
  }
}
function ya(r) {
  if (typeof r == "string") return r;
  try {
    return (function(t) {
      return JSON.stringify(t);
    })(r);
  } catch {
    return r;
  }
}
function X(r, e, t) {
  let n = "Unexpected state";
  typeof e == "string" ? n = e : t = e, rh(r, n, t);
}
function rh(r, e, t) {
  let n = `FIRESTORE (${sr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${r.toString(16)})`;
  if (t !== void 0) try {
    n += " CONTEXT: " + JSON.stringify(t);
  } catch {
    n += " CONTEXT: " + t;
  }
  throw Nt(n), new Error(n);
}
function $(r, e, t, n) {
  let s = "Unexpected state";
  typeof t == "string" ? s = t : n = t, r || rh(e, s, n);
}
function oe(r, e) {
  return r;
}
function Yp(r) {
  const e = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof self < "u" && (self.crypto || self.msCrypto)
  ), t = new Uint8Array(r);
  if (e && typeof e.getRandomValues == "function") e.getRandomValues(t);
  else
    for (let n = 0; n < r; n++) t[n] = Math.floor(256 * Math.random());
  return t;
}
class Ia {
  static newId() {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", t = 62 * Math.floor(4.129032258064516);
    let n = "";
    for (; n.length < 20; ) {
      const s = Yp(40);
      for (let i = 0; i < s.length; ++i)
        n.length < 20 && s[i] < t && (n += e.charAt(s[i] % 62));
    }
    return n;
  }
}
function te(r, e) {
  return r < e ? -1 : r > e ? 1 : 0;
}
function Xo(r, e) {
  const t = Math.min(r.length, e.length);
  for (let n = 0; n < t; n++) {
    const s = r.charAt(n), i = e.charAt(n);
    if (s !== i) return yo(s) === yo(i) ? te(s, i) : yo(s) ? 1 : -1;
  }
  return te(r.length, e.length);
}
const Wp = 55296, Xp = 57343;
function yo(r) {
  const e = r.charCodeAt(0);
  return e >= Wp && e <= Xp;
}
function $n(r, e, t) {
  return r.length === e.length && r.every(((n, s) => t(n, e[s])));
}
class me {
  constructor(e, t) {
    this.comparator = e, this.root = t || Le.EMPTY;
  }
  // Returns a copy of the map, with the specified key/value added or replaced.
  insert(e, t) {
    return new me(this.comparator, this.root.insert(e, t, this.comparator).copy(null, null, Le.BLACK, null, null));
  }
  // Returns a copy of the map, with the specified key removed.
  remove(e) {
    return new me(this.comparator, this.root.remove(e, this.comparator).copy(null, null, Le.BLACK, null, null));
  }
  // Returns the value of the node with the given key, or null.
  get(e) {
    let t = this.root;
    for (; !t.isEmpty(); ) {
      const n = this.comparator(e, t.key);
      if (n === 0) return t.value;
      n < 0 ? t = t.left : n > 0 && (t = t.right);
    }
    return null;
  }
  // Returns the index of the element in this sorted map, or -1 if it doesn't
  // exist.
  indexOf(e) {
    let t = 0, n = this.root;
    for (; !n.isEmpty(); ) {
      const s = this.comparator(e, n.key);
      if (s === 0) return t + n.left.size;
      s < 0 ? n = n.left : (
        // Count all nodes left of the node plus the node itself
        (t += n.left.size + 1, n = n.right)
      );
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  // Returns the total number of nodes in the map.
  get size() {
    return this.root.size;
  }
  // Returns the minimum key in the map.
  minKey() {
    return this.root.minKey();
  }
  // Returns the maximum key in the map.
  maxKey() {
    return this.root.maxKey();
  }
  // Traverses the map in key order and calls the specified action function
  // for each key/value pair. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  inorderTraversal(e) {
    return this.root.inorderTraversal(e);
  }
  forEach(e) {
    this.inorderTraversal(((t, n) => (e(t, n), !1)));
  }
  toString() {
    const e = [];
    return this.inorderTraversal(((t, n) => (e.push(`${t}:${n}`), !1))), `{${e.join(", ")}}`;
  }
  // Traverses the map in reverse key order and calls the specified action
  // function for each key/value pair. If action returns true, traversal is
  // aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  reverseTraversal(e) {
    return this.root.reverseTraversal(e);
  }
  // Returns an iterator over the SortedMap.
  getIterator() {
    return new Hs(this.root, null, this.comparator, !1);
  }
  getIteratorFrom(e) {
    return new Hs(this.root, e, this.comparator, !1);
  }
  getReverseIterator() {
    return new Hs(this.root, null, this.comparator, !0);
  }
  getReverseIteratorFrom(e) {
    return new Hs(this.root, e, this.comparator, !0);
  }
}
class Hs {
  constructor(e, t, n, s) {
    this.isReverse = s, this.nodeStack = [];
    let i = 1;
    for (; !e.isEmpty(); ) if (i = t ? n(e.key, t) : 1, // flip the comparison if we're going in reverse
    t && s && (i *= -1), i < 0)
      e = this.isReverse ? e.left : e.right;
    else {
      if (i === 0) {
        this.nodeStack.push(e);
        break;
      }
      this.nodeStack.push(e), e = this.isReverse ? e.right : e.left;
    }
  }
  getNext() {
    let e = this.nodeStack.pop();
    const t = {
      key: e.key,
      value: e.value
    };
    if (this.isReverse) for (e = e.left; !e.isEmpty(); ) this.nodeStack.push(e), e = e.right;
    else for (e = e.right; !e.isEmpty(); ) this.nodeStack.push(e), e = e.left;
    return t;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (this.nodeStack.length === 0) return null;
    const e = this.nodeStack[this.nodeStack.length - 1];
    return {
      key: e.key,
      value: e.value
    };
  }
}
class Le {
  constructor(e, t, n, s, i) {
    this.key = e, this.value = t, this.color = n ?? Le.RED, this.left = s ?? Le.EMPTY, this.right = i ?? Le.EMPTY, this.size = this.left.size + 1 + this.right.size;
  }
  // Returns a copy of the current node, optionally replacing pieces of it.
  copy(e, t, n, s, i) {
    return new Le(e ?? this.key, t ?? this.value, n ?? this.color, s ?? this.left, i ?? this.right);
  }
  isEmpty() {
    return !1;
  }
  // Traverses the tree in key order and calls the specified action function
  // for each node. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  inorderTraversal(e) {
    return this.left.inorderTraversal(e) || e(this.key, this.value) || this.right.inorderTraversal(e);
  }
  // Traverses the tree in reverse key order and calls the specified action
  // function for each node. If action returns true, traversal is aborted.
  // Returns the first truthy value returned by action, or the last falsey
  // value returned by action.
  reverseTraversal(e) {
    return this.right.reverseTraversal(e) || e(this.key, this.value) || this.left.reverseTraversal(e);
  }
  // Returns the minimum node in the tree.
  min() {
    return this.left.isEmpty() ? this : this.left.min();
  }
  // Returns the maximum key in the tree.
  minKey() {
    return this.min().key;
  }
  // Returns the maximum key in the tree.
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  // Returns new tree, with the key/value added.
  insert(e, t, n) {
    let s = this;
    const i = n(e, s.key);
    return s = i < 0 ? s.copy(null, null, null, s.left.insert(e, t, n), null) : i === 0 ? s.copy(null, t, null, null, null) : s.copy(null, null, null, null, s.right.insert(e, t, n)), s.fixUp();
  }
  removeMin() {
    if (this.left.isEmpty()) return Le.EMPTY;
    let e = this;
    return e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()), e = e.copy(null, null, null, e.left.removeMin(), null), e.fixUp();
  }
  // Returns new tree, with the specified item removed.
  remove(e, t) {
    let n, s = this;
    if (t(e, s.key) < 0) s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()), s = s.copy(null, null, null, s.left.remove(e, t), null);
    else {
      if (s.left.isRed() && (s = s.rotateRight()), s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()), t(e, s.key) === 0) {
        if (s.right.isEmpty()) return Le.EMPTY;
        n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.removeMin());
      }
      s = s.copy(null, null, null, null, s.right.remove(e, t));
    }
    return s.fixUp();
  }
  isRed() {
    return this.color;
  }
  // Returns new tree after performing any needed rotations.
  fixUp() {
    let e = this;
    return e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()), e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()), e.left.isRed() && e.right.isRed() && (e = e.colorFlip()), e;
  }
  moveRedLeft() {
    let e = this.colorFlip();
    return e.right.left.isRed() && (e = e.copy(null, null, null, null, e.right.rotateRight()), e = e.rotateLeft(), e = e.colorFlip()), e;
  }
  moveRedRight() {
    let e = this.colorFlip();
    return e.left.left.isRed() && (e = e.rotateRight(), e = e.colorFlip()), e;
  }
  rotateLeft() {
    const e = this.copy(null, null, Le.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, e, null);
  }
  rotateRight() {
    const e = this.copy(null, null, Le.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, e);
  }
  colorFlip() {
    const e = this.left.copy(null, null, !this.left.color, null, null), t = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, e, t);
  }
  // For testing.
  checkMaxDepth() {
    const e = this.check();
    return Math.pow(2, e) <= this.size + 1;
  }
  // In a balanced RB tree, the black-depth (number of black nodes) from root to
  // leaves is equal on both sides.  This function verifies that or asserts.
  check() {
    if (this.isRed() && this.left.isRed()) throw X(43730, {
      key: this.key,
      value: this.value
    });
    if (this.right.isRed()) throw X(14113, {
      key: this.key,
      value: this.value
    });
    const e = this.left.check();
    if (e !== this.right.check()) throw X(27949);
    return e + (this.isRed() ? 0 : 1);
  }
}
Le.EMPTY = null, Le.RED = !0, Le.BLACK = !1;
Le.EMPTY = new // Represents an empty node (a leaf node in the Red-Black Tree).
class {
  constructor() {
    this.size = 0;
  }
  get key() {
    throw X(57766);
  }
  get value() {
    throw X(16141);
  }
  get color() {
    throw X(16727);
  }
  get left() {
    throw X(29726);
  }
  get right() {
    throw X(36894);
  }
  // Returns a copy of the current node.
  copy(e, t, n, s, i) {
    return this;
  }
  // Returns a copy of the tree, with the specified key/value added.
  insert(e, t, n) {
    return new Le(e, t);
  }
  // Returns a copy of the tree, with the specified key removed.
  remove(e, t) {
    return this;
  }
  isEmpty() {
    return !0;
  }
  inorderTraversal(e) {
    return !1;
  }
  reverseTraversal(e) {
    return !1;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  isRed() {
    return !1;
  }
  // For testing.
  checkMaxDepth() {
    return !0;
  }
  check() {
    return 0;
  }
}();
class Te {
  constructor(e) {
    this.comparator = e, this.data = new me(this.comparator);
  }
  has(e) {
    return this.data.get(e) !== null;
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(e) {
    return this.data.indexOf(e);
  }
  /** Iterates elements in order defined by "comparator" */
  forEach(e) {
    this.data.inorderTraversal(((t, n) => (e(t), !1)));
  }
  /** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */
  forEachInRange(e, t) {
    const n = this.data.getIteratorFrom(e[0]);
    for (; n.hasNext(); ) {
      const s = n.getNext();
      if (this.comparator(s.key, e[1]) >= 0) return;
      t(s.key);
    }
  }
  /**
   * Iterates over `elem`s such that: start &lt;= elem until false is returned.
   */
  forEachWhile(e, t) {
    let n;
    for (n = t !== void 0 ? this.data.getIteratorFrom(t) : this.data.getIterator(); n.hasNext(); )
      if (!e(n.getNext().key)) return;
  }
  /** Finds the least element greater than or equal to `elem`. */
  firstAfterOrEqual(e) {
    const t = this.data.getIteratorFrom(e);
    return t.hasNext() ? t.getNext().key : null;
  }
  getIterator() {
    return new El(this.data.getIterator());
  }
  getIteratorFrom(e) {
    return new El(this.data.getIteratorFrom(e));
  }
  /** Inserts or updates an element */
  add(e) {
    return this.copy(this.data.remove(e).insert(e, !0));
  }
  /** Deletes an element */
  delete(e) {
    return this.has(e) ? this.copy(this.data.remove(e)) : this;
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(e) {
    let t = this;
    return t.size < e.size && (t = e, e = this), e.forEach(((n) => {
      t = t.add(n);
    })), t;
  }
  isEqual(e) {
    if (!(e instanceof Te) || this.size !== e.size) return !1;
    const t = this.data.getIterator(), n = e.data.getIterator();
    for (; t.hasNext(); ) {
      const s = t.getNext().key, i = n.getNext().key;
      if (this.comparator(s, i) !== 0) return !1;
    }
    return !0;
  }
  toArray() {
    const e = [];
    return this.forEach(((t) => {
      e.push(t);
    })), e;
  }
  toString() {
    const e = [];
    return this.forEach(((t) => e.push(t))), "SortedSet(" + e.toString() + ")";
  }
  copy(e) {
    const t = new Te(this.comparator);
    return t.data = e, t;
  }
}
class El {
  constructor(e) {
    this.iter = e;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
}
const M = {
  // Causes are copied from:
  // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
  /** Not an error; returned on success. */
  OK: "ok",
  /** The operation was cancelled (typically by the caller). */
  CANCELLED: "cancelled",
  /** Unknown error or an error from a different error domain. */
  UNKNOWN: "unknown",
  /**
   * Client specified an invalid argument. Note that this differs from
   * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
   * problematic regardless of the state of the system (e.g., a malformed file
   * name).
   */
  INVALID_ARGUMENT: "invalid-argument",
  /**
   * Deadline expired before operation could complete. For operations that
   * change the state of the system, this error may be returned even if the
   * operation has completed successfully. For example, a successful response
   * from a server could have been delayed long enough for the deadline to
   * expire.
   */
  DEADLINE_EXCEEDED: "deadline-exceeded",
  /** Some requested entity (e.g., file or directory) was not found. */
  NOT_FOUND: "not-found",
  /**
   * Some entity that we attempted to create (e.g., file or directory) already
   * exists.
   */
  ALREADY_EXISTS: "already-exists",
  /**
   * The caller does not have permission to execute the specified operation.
   * PERMISSION_DENIED must not be used for rejections caused by exhausting
   * some resource (use RESOURCE_EXHAUSTED instead for those errors).
   * PERMISSION_DENIED must not be used if the caller cannot be identified
   * (use UNAUTHENTICATED instead for those errors).
   */
  PERMISSION_DENIED: "permission-denied",
  /**
   * The request does not have valid authentication credentials for the
   * operation.
   */
  UNAUTHENTICATED: "unauthenticated",
  /**
   * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
   * entire file system is out of space.
   */
  RESOURCE_EXHAUSTED: "resource-exhausted",
  /**
   * Operation was rejected because the system is not in a state required for
   * the operation's execution. For example, directory to be deleted may be
   * non-empty, an rmdir operation is applied to a non-directory, etc.
   *
   * A litmus test that may help a service implementor in deciding
   * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
   *  (a) Use UNAVAILABLE if the client can retry just the failing call.
   *  (b) Use ABORTED if the client should retry at a higher-level
   *      (e.g., restarting a read-modify-write sequence).
   *  (c) Use FAILED_PRECONDITION if the client should not retry until
   *      the system state has been explicitly fixed. E.g., if an "rmdir"
   *      fails because the directory is non-empty, FAILED_PRECONDITION
   *      should be returned since the client should not retry unless
   *      they have first fixed up the directory by deleting files from it.
   *  (d) Use FAILED_PRECONDITION if the client performs conditional
   *      REST Get/Update/Delete on a resource and the resource on the
   *      server does not match the condition. E.g., conflicting
   *      read-modify-write on the same resource.
   */
  FAILED_PRECONDITION: "failed-precondition",
  /**
   * The operation was aborted, typically due to a concurrency issue like
   * sequencer check failures, transaction aborts, etc.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  ABORTED: "aborted",
  /**
   * Operation was attempted past the valid range. E.g., seeking or reading
   * past end of file.
   *
   * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
   * if the system state changes. For example, a 32-bit file system will
   * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
   * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
   * an offset past the current file size.
   *
   * There is a fair bit of overlap between FAILED_PRECONDITION and
   * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
   * when it applies so that callers who are iterating through a space can
   * easily look for an OUT_OF_RANGE error to detect when they are done.
   */
  OUT_OF_RANGE: "out-of-range",
  /** Operation is not implemented or not supported/enabled in this service. */
  UNIMPLEMENTED: "unimplemented",
  /**
   * Internal errors. Means some invariants expected by underlying System has
   * been broken. If you see one of these errors, Something is very broken.
   */
  INTERNAL: "internal",
  /**
   * The service is currently unavailable. This is a most likely a transient
   * condition and may be corrected by retrying with a backoff.
   *
   * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
   * and UNAVAILABLE.
   */
  UNAVAILABLE: "unavailable",
  /** Unrecoverable data loss or corruption. */
  DATA_LOSS: "data-loss"
};
class H extends rr {
  /** @hideconstructor */
  constructor(e, t) {
    super(e, t), this.code = e, this.message = t, // HACK: We write a toString property directly because Error is not a real
    // class and so inheritance does not work correctly. We could alternatively
    // do the same "back-door inheritance" trick that FirebaseError does.
    this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
}
const _t = "__name__";
class Dt {
  constructor(e, t, n) {
    t === void 0 ? t = 0 : t > e.length && X(637, {
      offset: t,
      range: e.length
    }), n === void 0 ? n = e.length - t : n > e.length - t && X(1746, {
      length: n,
      range: e.length - t
    }), this.segments = e, this.offset = t, this.len = n;
  }
  get length() {
    return this.len;
  }
  isEqual(e) {
    return Dt.comparator(this, e) === 0;
  }
  child(e) {
    const t = this.segments.slice(this.offset, this.limit());
    return e instanceof Dt ? e.forEach(((n) => {
      t.push(n);
    })) : t.push(e), this.construct(t);
  }
  /** The index of one past the last segment of the path. */
  limit() {
    return this.offset + this.length;
  }
  popFirst(e) {
    return e = e === void 0 ? 1 : e, this.construct(this.segments, this.offset + e, this.length - e);
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(e) {
    return this.segments[this.offset + e];
  }
  isEmpty() {
    return this.length === 0;
  }
  isPrefixOf(e) {
    if (e.length < this.length) return !1;
    for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
    return !0;
  }
  isImmediateParentOf(e) {
    if (this.length + 1 !== e.length) return !1;
    for (let t = 0; t < this.length; t++) if (this.get(t) !== e.get(t)) return !1;
    return !0;
  }
  forEach(e) {
    for (let t = this.offset, n = this.limit(); t < n; t++) e(this.segments[t]);
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  /**
   * Compare 2 paths segment by segment, prioritizing numeric IDs
   * (e.g., "__id123__") in numeric ascending order, followed by string
   * segments in lexicographical order.
   */
  static comparator(e, t) {
    const n = Math.min(e.length, t.length);
    for (let s = 0; s < n; s++) {
      const i = Dt.compareSegments(e.get(s), t.get(s));
      if (i !== 0) return i;
    }
    return te(e.length, t.length);
  }
  static compareSegments(e, t) {
    const n = Dt.isNumericId(e), s = Dt.isNumericId(t);
    return n && !s ? -1 : !n && s ? 1 : n && s ? Dt.extractNumericId(e).compare(Dt.extractNumericId(t)) : Xo(e, t);
  }
  // Checks if a segment is a numeric ID (starts with "__id" and ends with "__").
  static isNumericId(e) {
    return e.startsWith("__id") && e.endsWith("__");
  }
  static extractNumericId(e) {
    return $t.fromString(e.substring(4, e.length - 2));
  }
}
class Be extends Dt {
  construct(e, t, n) {
    return new Be(e, t, n);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  toStringWithLeadingSlash() {
    return `/${this.canonicalString()}`;
  }
  /**
   * Returns a string representation of this path
   * where each path segment has been encoded with
   * `encodeURIComponent`.
   */
  toUriEncodedString() {
    return this.toArray().map(encodeURIComponent).join("/");
  }
  /**
   * Creates a resource path from the given slash-delimited string. If multiple
   * arguments are provided, all components are combined. Leading and trailing
   * slashes from all components are ignored.
   */
  static fromString(...e) {
    const t = [];
    for (const n of e) {
      if (n.indexOf("//") >= 0) throw new H(M.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
      t.push(...n.split("/").filter(((s) => s.length > 0)));
    }
    return new Be(t);
  }
  static emptyPath() {
    return new Be([]);
  }
}
const Zp = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
let ht = class Gn extends Dt {
  construct(e, t, n) {
    return new Gn(e, t, n);
  }
  /**
   * Returns true if the string could be used as a segment in a field path
   * without escaping.
   */
  static isValidIdentifier(e) {
    return Zp.test(e);
  }
  canonicalString() {
    return this.toArray().map(((e) => (e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), Gn.isValidIdentifier(e) || (e = "`" + e + "`"), e))).join(".");
  }
  toString() {
    return this.canonicalString();
  }
  /**
   * Returns true if this field references the key of a document.
   */
  isKeyField() {
    return this.length === 1 && this.get(0) === _t;
  }
  /**
   * The field designating the key of a document.
   */
  static keyField() {
    return new Gn([_t]);
  }
  /**
   * Parses a field string from the given server-formatted string.
   *
   * - Splitting the empty string is not allowed (for now at least).
   * - Empty segments within the string (e.g. if there are two consecutive
   *   separators) are not allowed.
   *
   * TODO(b/37244157): we should make this more strict. Right now, it allows
   * non-identifier path components, even if they aren't escaped.
   */
  static fromServerFormat(e) {
    const t = [];
    let n = "", s = 0;
    const i = () => {
      if (n.length === 0) throw new H(M.INVALID_ARGUMENT, `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
      t.push(n), n = "";
    };
    let o = !1;
    for (; s < e.length; ) {
      const B = e[s];
      if (B === "\\") {
        if (s + 1 === e.length) throw new H(M.INVALID_ARGUMENT, "Path has trailing escape character: " + e);
        const u = e[s + 1];
        if (u !== "\\" && u !== "." && u !== "`") throw new H(M.INVALID_ARGUMENT, "Path has invalid escape sequence: " + e);
        n += u, s += 2;
      } else B === "`" ? (o = !o, s++) : B !== "." || o ? (n += B, s++) : (i(), s++);
    }
    if (i(), o) throw new H(M.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
    return new Gn(t);
  }
  static emptyPath() {
    return new Gn([]);
  }
};
class Kt {
  constructor(e) {
    this.fields = e, // TODO(dimond): validation of FieldMask
    // Sort the field mask to support `FieldMask.isEqual()` and assert below.
    e.sort(ht.comparator);
  }
  static empty() {
    return new Kt([]);
  }
  /**
   * Returns a new FieldMask object that is the result of adding all the given
   * fields paths to this field mask.
   */
  unionWith(e) {
    let t = new Te(ht.comparator);
    for (const n of this.fields) t = t.add(n);
    for (const n of e) t = t.add(n);
    return new Kt(t.toArray());
  }
  /**
   * Verifies that `fieldPath` is included by at least one field in this field
   * mask.
   *
   * This is an O(n) operation, where `n` is the size of the field mask.
   */
  covers(e) {
    for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
    return !1;
  }
  isEqual(e) {
    return $n(this.fields, e.fields, ((t, n) => t.isEqual(n)));
  }
}
function si(r) {
  let e = 0;
  for (const t in r) Object.prototype.hasOwnProperty.call(r, t) && e++;
  return e;
}
function ir(r, e) {
  for (const t in r) Object.prototype.hasOwnProperty.call(r, t) && e(t, r[t]);
}
function em(r, e) {
  const t = [];
  for (const n in r) Object.prototype.hasOwnProperty.call(r, n) && t.push(e(r[n], n, r));
  return t;
}
function sh(r) {
  for (const e in r) if (Object.prototype.hasOwnProperty.call(r, e)) return !1;
  return !0;
}
class Q {
  constructor(e) {
    this.path = e;
  }
  static fromPath(e) {
    return new Q(Be.fromString(e));
  }
  static fromName(e) {
    return new Q(Be.fromString(e).popFirst(5));
  }
  static empty() {
    return new Q(Be.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  /** Returns true if the document is in the specified collectionId. */
  hasCollectionId(e) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === e;
  }
  /** Returns the collection group (i.e. the name of the parent collection) for this key. */
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  /** Returns the fully qualified path to the parent collection. */
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(e) {
    return e !== null && Be.comparator(this.path, e.path) === 0;
  }
  toString() {
    return this.path.toString();
  }
  static comparator(e, t) {
    return Be.comparator(e.path, t.path);
  }
  static isDocumentKey(e) {
    return e.length % 2 == 0;
  }
  /**
   * Creates and returns a new document key with the given segments.
   *
   * @param segments - The segments of the path to the document
   * @returns A new instance of DocumentKey
   */
  static fromSegments(e) {
    return new Q(new Be(e.slice()));
  }
}
function ih(r, e, t) {
  if (!t) throw new H(M.INVALID_ARGUMENT, `Function ${r}() cannot be called with an empty ${e}.`);
}
function tm(r, e, t, n) {
  if (e === !0 && n === !0) throw new H(M.INVALID_ARGUMENT, `${r} and ${t} cannot be used together.`);
}
function Dl(r) {
  if (!Q.isDocumentKey(r)) throw new H(M.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`);
}
function _l(r) {
  if (Q.isDocumentKey(r)) throw new H(M.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`);
}
function cs(r) {
  return typeof r == "object" && r !== null && (Object.getPrototypeOf(r) === Object.prototype || Object.getPrototypeOf(r) === null);
}
function mi(r) {
  if (r === void 0) return "undefined";
  if (r === null) return "null";
  if (typeof r == "string") return r.length > 20 && (r = `${r.substring(0, 20)}...`), JSON.stringify(r);
  if (typeof r == "number" || typeof r == "boolean") return "" + r;
  if (typeof r == "object") {
    if (r instanceof Array) return "an array";
    {
      const e = (
        /** try to get the constructor name for an object. */
        (function(n) {
          return n.constructor ? n.constructor.name : null;
        })(r)
      );
      return e ? `a custom ${e} object` : "an object";
    }
  }
  return typeof r == "function" ? "a function" : X(12329, {
    type: typeof r
  });
}
function Wr(r, e) {
  if ("_delegate" in r && // Unwrap Compat types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (r = r._delegate), !(r instanceof e)) {
    if (e.name === r.constructor.name) throw new H(M.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const t = mi(r);
      throw new H(M.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${t}`);
    }
  }
  return r;
}
function Ie(r, e) {
  const t = {
    typeString: r
  };
  return e && (t.value = e), t;
}
function hs(r, e) {
  if (!cs(r)) throw new H(M.INVALID_ARGUMENT, "JSON must be an object");
  let t;
  for (const n in e) if (e[n]) {
    const s = e[n].typeString, i = "value" in e[n] ? {
      value: e[n].value
    } : void 0;
    if (!(n in r)) {
      t = `JSON missing required field: '${n}'`;
      break;
    }
    const o = r[n];
    if (s && typeof o !== s) {
      t = `JSON field '${n}' must be a ${s}.`;
      break;
    }
    if (i !== void 0 && o !== i.value) {
      t = `Expected '${n}' field to equal '${i.value}'`;
      break;
    }
  }
  if (t) throw new H(M.INVALID_ARGUMENT, t);
  return !0;
}
const yl = -62135596800, Il = 1e6;
class le {
  /**
   * Creates a new timestamp with the current date, with millisecond precision.
   *
   * @returns a new timestamp representing the current date.
   */
  static now() {
    return le.fromMillis(Date.now());
  }
  /**
   * Creates a new timestamp from the given date.
   *
   * @param date - The date to initialize the `Timestamp` from.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     date.
   */
  static fromDate(e) {
    return le.fromMillis(e.getTime());
  }
  /**
   * Creates a new timestamp from the given number of milliseconds.
   *
   * @param milliseconds - Number of milliseconds since Unix epoch
   *     1970-01-01T00:00:00Z.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     number of milliseconds.
   */
  static fromMillis(e) {
    const t = Math.floor(e / 1e3), n = Math.floor((e - 1e3 * t) * Il);
    return new le(t, n);
  }
  /**
   * Creates a new timestamp from the given `Temporal.Instant`.
   *
   * @param instant - The `Temporal.Instant` to initialize the `Timestamp` from.
   * @returns A new `Timestamp` representing the same point in time as the given
   *     instant.
   */
  static fromInstant(e) {
    if (!e || typeof e.t != "bigint") throw new H(M.INVALID_ARGUMENT, "Invalid Temporal.Instant object provided.");
    return le._fromEpochNanoseconds(e.t);
  }
  static _fromEpochNanoseconds(e) {
    let t, n;
    if (e >= 0n) t = Number(e / 1000000000n), n = Number(e % 1000000000n);
    else {
      const s = e % 1000000000n;
      s === 0n ? (t = Number(e / 1000000000n), n = 0) : (t = Number(e / 1000000000n - 1n), n = Number(s + 1000000000n));
    }
    return new le(t, n);
  }
  /**
   * Creates a new timestamp.
   *
   * @param seconds - The number of seconds of UTC time since Unix epoch
   *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
   *     9999-12-31T23:59:59Z inclusive.
   * @param nanoseconds - The non-negative fractions of a second at nanosecond
   *     resolution. Negative second values with fractions must still have
   *     non-negative nanoseconds values that count forward in time. Must be
   *     from 0 to 999,999,999 inclusive.
   */
  constructor(e, t) {
    if (this.seconds = e, this.nanoseconds = t, t < 0) throw new H(M.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
    if (t >= 1e9) throw new H(M.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + t);
    if (e < yl) throw new H(M.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
    if (e >= 253402300800) throw new H(M.INVALID_ARGUMENT, "Timestamp seconds out of range: " + e);
  }
  /**
   * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
   * causes a loss of precision since `Date` objects only support millisecond
   * precision.
   *
   * @returns JavaScript `Date` object representing the same point in time as
   *     this `Timestamp`, with millisecond precision.
   */
  toDate() {
    return new Date(this.toMillis());
  }
  /**
   * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
   * epoch). This operation causes a loss of precision.
   *
   * @returns The point in time corresponding to this timestamp, represented as
   *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
   */
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / Il;
  }
  /**
   * Converts a `Timestamp` to a `Temporal.Instant` object.
   *
   * @returns `Temporal.Instant` object representing the same point in time as
   *     this `Timestamp`.
   */
  toInstant() {
    if (typeof Temporal > "u" || !Temporal.Instant) throw new H(M.FAILED_PRECONDITION, "The Temporal object is not available in the current environment.");
    const e = 1000000000n * BigInt(this.seconds) + BigInt(this.nanoseconds);
    return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e);
  }
  _compareTo(e) {
    return this.seconds === e.seconds ? te(this.nanoseconds, e.nanoseconds) : te(this.seconds, e.seconds);
  }
  /**
   * Returns true if this `Timestamp` is equal to the provided one.
   *
   * @param other - The `Timestamp` to compare against.
   * @returns true if this `Timestamp` is equal to the provided one.
   */
  isEqual(e) {
    return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
  }
  /** Returns a textual representation of this `Timestamp`. */
  toString() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
  }
  /**
   * Returns a JSON-serializable representation of this `Timestamp`.
   */
  toJSON() {
    return {
      type: le._jsonSchemaVersion,
      seconds: this.seconds,
      nanoseconds: this.nanoseconds
    };
  }
  /**
   * Builds a `Timestamp` instance from a JSON object created by {@link Timestamp.toJSON}.
   */
  static fromJSON(e) {
    if (hs(e, le._jsonSchema)) return new le(e.seconds, e.nanoseconds);
  }
  /**
   * Converts this object to a primitive string, which allows `Timestamp` objects
   * to be compared using the `>`, `<=`, `>=` and `>` operators.
   */
  valueOf() {
    const e = this.seconds - yl;
    return String(e).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
  }
}
le._jsonSchemaVersion = "firestore/timestamp/1.0", le._jsonSchema = {
  type: Ie("string", le._jsonSchemaVersion),
  seconds: Ie("number"),
  nanoseconds: Ie("number")
};
class oh extends Error {
  constructor() {
    super(...arguments), this.name = "Base64DecodeError";
  }
}
class Ae {
  constructor(e) {
    this.binaryString = e;
  }
  static fromBase64String(e) {
    const t = (function(s) {
      try {
        return atob(s);
      } catch (i) {
        throw typeof DOMException < "u" && i instanceof DOMException ? new oh("Invalid base64 string: " + i) : i;
      }
    })(e);
    return new Ae(t);
  }
  static fromUint8Array(e) {
    const t = (
      /**
      * Helper function to convert an Uint8array to a binary string.
      */
      (function(s) {
        let i = "";
        for (let o = 0; o < s.length; ++o) i += String.fromCharCode(s[o]);
        return i;
      })(e)
    );
    return new Ae(t);
  }
  [Symbol.iterator]() {
    let e = 0;
    return {
      next: () => e < this.binaryString.length ? {
        value: this.binaryString.charCodeAt(e++),
        done: !1
      } : {
        value: void 0,
        done: !0
      }
    };
  }
  toBase64() {
    return (function(t) {
      return btoa(t);
    })(this.binaryString);
  }
  toUint8Array() {
    return (function(t) {
      const n = new Uint8Array(t.length);
      for (let s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
      return n;
    })(this.binaryString);
  }
  approximateByteSize() {
    return 2 * this.binaryString.length;
  }
  compareTo(e) {
    return te(this.binaryString, e.binaryString);
  }
  isEqual(e) {
    return this.binaryString === e.binaryString;
  }
}
Ae.EMPTY_BYTE_STRING = new Ae("");
const nm = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function en(r) {
  if ($(!!r, 39018), typeof r == "string") {
    let e = 0;
    const t = nm.exec(r);
    if ($(!!t, 46558, {
      timestamp: r
    }), t[1]) {
      let s = t[1];
      s = (s + "000000000").substr(0, 9), e = Number(s);
    }
    const n = new Date(r);
    return {
      seconds: Math.floor(n.getTime() / 1e3),
      nanos: e
    };
  }
  return {
    seconds: ge(r.seconds),
    nanos: ge(r.nanos)
  };
}
function ge(r) {
  return typeof r == "number" ? r : typeof r == "string" ? Number(r) : 0;
}
function tn(r) {
  return typeof r == "string" ? Ae.fromBase64String(r) : Ae.fromUint8Array(r);
}
const ah = "server_timestamp", Bh = "__type__", uh = "__previous_value__", lh = "__local_write_time__";
function Ei(r) {
  return (r?.mapValue?.fields || {})[Bh]?.stringValue === ah;
}
function Cs(r) {
  const e = r.mapValue.fields[uh];
  return Ei(e) ? Cs(e) : e;
}
function Yn(r) {
  const e = en(r.mapValue.fields[lh].timestampValue);
  return new le(e.seconds, e.nanos);
}
class rm {
  /**
   * Constructs a DatabaseInfo using the provided host, databaseId and
   * persistenceKey.
   *
   * @param databaseId - The database to use.
   * @param appId - The Firebase App Id.
   * @param persistenceKey - A unique identifier for this Firestore's local
   * storage (used in conjunction with the databaseId).
   * @param host - The Firestore backend host to connect to.
   * @param ssl - Whether to use SSL when connecting.
   * @param forceLongPolling - Whether to use the forceLongPolling option
   * when using WebChannel as the network transport.
   * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
   * option when using WebChannel as the network transport.
   * @param longPollingOptions - Options that configure long-polling.
   * @param useFetchStreams - Whether to use the Fetch API instead of
   * XMLHTTPRequest
   */
  constructor(e, t, n, s, i, o, B, u, c, C, f, m, y) {
    this.databaseId = e, this.appId = t, this.persistenceKey = n, this.host = s, this.ssl = i, this.forceLongPolling = o, this.autoDetectLongPolling = B, this.longPollingOptions = u, this.useFetchStreams = c, this.isUsingEmulator = C, this.apiKey = f, this._customHeaders = m, this.grpcFlowControlWindow = y;
  }
}
const ii = "(default)";
class Xr {
  constructor(e, t) {
    this.projectId = e, this.database = t || ii;
  }
  static empty() {
    return new Xr("", "");
  }
  get isDefaultDatabase() {
    return this.database === ii;
  }
  isEqual(e) {
    return e instanceof Xr && e.projectId === this.projectId && e.database === this.database;
  }
}
function sm(r, e) {
  if (!Object.prototype.hasOwnProperty.apply(r.options, ["projectId"])) throw new H(M.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
  return new Xr(r.options.projectId, e);
}
const im = -1;
function Di(r) {
  return r == null;
}
function Zr(r) {
  return r === 0 && 1 / r == -1 / 0;
}
function om(r) {
  return typeof r == "number" && Number.isInteger(r) && !Zr(r) && r <= Number.MAX_SAFE_INTEGER && r >= Number.MIN_SAFE_INTEGER;
}
function am(r) {
  return typeof r == "string";
}
const ch = "__type__", Bm = "__max__", Us = {
  mapValue: {}
}, hh = "__vector__", es = "value", Wn = {
  nullValue: "NULL_VALUE"
}, Xe = {
  booleanValue: !0
}, Pe = {
  booleanValue: !1
};
function ve(r) {
  return "nullValue" in r ? 0 : "booleanValue" in r ? 1 : "integerValue" in r || "doubleValue" in r ? 2 : "timestampValue" in r ? 3 : "stringValue" in r ? 5 : "bytesValue" in r ? 6 : "referenceValue" in r ? 7 : "geoPointValue" in r ? 8 : "arrayValue" in r ? 9 : "mapValue" in r ? Ei(r) ? 4 : um(r) ? 9007199254740991 : oi(r) ? 10 : 11 : X(28295, {
    value: r
  });
}
function Ct(r, e, t) {
  if (r === e) return !0;
  const n = ve(r);
  if (n !== ve(e)) return !1;
  switch (n) {
    case 0:
    case 9007199254740991:
      return !0;
    case 1:
      return r.booleanValue === e.booleanValue;
    case 4:
      return Yn(r).isEqual(Yn(e));
    case 3:
      return (function(i, o) {
        if (typeof i.timestampValue == "string" && typeof o.timestampValue == "string" && i.timestampValue.length === o.timestampValue.length)
          return i.timestampValue === o.timestampValue;
        const B = en(i.timestampValue), u = en(o.timestampValue);
        return B.seconds === u.seconds && B.nanos === u.nanos;
      })(r, e);
    case 5:
      return r.stringValue === e.stringValue;
    case 6:
      return (function(i, o) {
        return tn(i.bytesValue).isEqual(tn(o.bytesValue));
      })(r, e);
    case 7:
      return r.referenceValue === e.referenceValue;
    case 8:
      return (function(i, o) {
        return ge(i.geoPointValue.latitude) === ge(o.geoPointValue.latitude) && ge(i.geoPointValue.longitude) === ge(o.geoPointValue.longitude);
      })(r, e);
    case 2:
      return (function(i, o, B) {
        if ("integerValue" in i && "integerValue" in o) return ge(i.integerValue) === ge(o.integerValue);
        let u, c;
        if ("doubleValue" in i && "doubleValue" in o) u = ge(i.doubleValue), c = ge(o.doubleValue);
        else {
          if (!B?.i) return !1;
          u = ge(i.integerValue ?? i.doubleValue), c = ge(o.integerValue ?? o.doubleValue);
        }
        return u === c ? !!B?.o || Zr(u) === Zr(c) : !!(B === void 0 || B.u) && isNaN(u) && isNaN(c);
      })(r, e, t);
    case 9:
      return $n(r.arrayValue.values || [], e.arrayValue.values || [], ((s, i) => Ct(s, i, t)));
    case 10:
    case 11:
      return (function(i, o, B) {
        const u = i.mapValue.fields || {}, c = o.mapValue.fields || {};
        if (si(u) !== si(c)) return !1;
        for (const C in u) if (u.hasOwnProperty(C) && (c[C] === void 0 || !Ct(u[C], c[C], B))) return !1;
        return !0;
      })(r, e, t);
    default:
      return X(52216, {
        left: r
      });
  }
}
function ts(r, e) {
  return (r.values || []).find(((t) => Ct(t, e))) !== void 0;
}
function Ze(r, e) {
  if (r === e) return 0;
  const t = ve(r), n = ve(e);
  if (t !== n) return te(t, n);
  switch (t) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return te(r.booleanValue, e.booleanValue);
    case 2:
      return (function(i, o) {
        const B = ge(i.integerValue || i.doubleValue), u = ge(o.integerValue || o.doubleValue);
        return B < u ? -1 : B > u ? 1 : B === u ? 0 : (
          // one or both are NaN.
          isNaN(B) ? isNaN(u) ? 0 : -1 : 1
        );
      })(r, e);
    case 3:
      return wl(r.timestampValue, e.timestampValue);
    case 4:
      return wl(Yn(r), Yn(e));
    case 5:
      return Xo(r.stringValue, e.stringValue);
    case 6:
      return (function(i, o) {
        const B = tn(i), u = tn(o);
        return B.compareTo(u);
      })(r.bytesValue, e.bytesValue);
    case 7:
      return (function(i, o) {
        const B = i.split("/"), u = o.split("/");
        for (let c = 0; c < B.length && c < u.length; c++) {
          const C = te(B[c], u[c]);
          if (C !== 0) return C;
        }
        return te(B.length, u.length);
      })(r.referenceValue, e.referenceValue);
    case 8:
      return (function(i, o) {
        const B = te(ge(i.latitude), ge(o.latitude));
        return B !== 0 ? B : te(ge(i.longitude), ge(o.longitude));
      })(r.geoPointValue, e.geoPointValue);
    case 9:
      return Tl(r.arrayValue, e.arrayValue);
    case 10:
      return (function(i, o) {
        const B = i.fields || {}, u = o.fields || {}, c = B[es]?.arrayValue, C = u[es]?.arrayValue, f = te(c?.values?.length || 0, C?.values?.length || 0);
        return f !== 0 ? f : Tl(c, C);
      })(r.mapValue, e.mapValue);
    case 11:
      return (function(i, o) {
        if (i === Us.mapValue && o === Us.mapValue) return 0;
        if (i === Us.mapValue) return 1;
        if (o === Us.mapValue) return -1;
        const B = i.fields || {}, u = Object.keys(B), c = o.fields || {}, C = Object.keys(c);
        u.sort(), C.sort();
        for (let f = 0; f < u.length && f < C.length; ++f) {
          const m = Xo(u[f], C[f]);
          if (m !== 0) return m;
          const y = Ze(B[u[f]], c[C[f]]);
          if (y !== 0) return y;
        }
        return te(u.length, C.length);
      })(r.mapValue, e.mapValue);
    default:
      throw X(23264, {
        l: t
      });
  }
}
function wl(r, e) {
  if (typeof r == "string" && typeof e == "string" && r.length === e.length) return te(r, e);
  const t = en(r), n = en(e), s = te(t.seconds, n.seconds);
  return s !== 0 ? s : te(t.nanos, n.nanos);
}
function Tl(r, e) {
  const t = r.values || [], n = e.values || [];
  for (let s = 0; s < t.length && s < n.length; ++s) {
    const i = Ze(t[s], n[s]);
    if (i !== void 0 && i !== 0) return i;
  }
  return te(t.length, n.length);
}
function Xn(r) {
  return Zo(r);
}
function Zo(r) {
  return "nullValue" in r ? "null" : "booleanValue" in r ? "" + r.booleanValue : "integerValue" in r ? "" + r.integerValue : "doubleValue" in r ? "" + r.doubleValue : "timestampValue" in r ? (function(t) {
    const n = en(t);
    return `time(${n.seconds},${n.nanos})`;
  })(r.timestampValue) : "stringValue" in r ? r.stringValue : "bytesValue" in r ? (function(t) {
    return tn(t).toBase64();
  })(r.bytesValue) : "referenceValue" in r ? (function(t) {
    return Q.fromName(t).toString();
  })(r.referenceValue) : "geoPointValue" in r ? (function(t) {
    return `geo(${t.latitude},${t.longitude})`;
  })(r.geoPointValue) : "arrayValue" in r ? (function(t) {
    let n = "[", s = !0;
    for (const i of t.values || []) s ? s = !1 : n += ",", n += Zo(i);
    return n + "]";
  })(r.arrayValue) : "mapValue" in r ? (function(t) {
    const n = Object.keys(t.fields || {}).sort();
    let s = "{", i = !0;
    for (const o of n) i ? i = !1 : s += ",", s += `${o}:${Zo(t.fields[o])}`;
    return s + "}";
  })(r.mapValue) : X(61005, {
    value: r
  });
}
function $s(r) {
  switch (ve(r)) {
    case 0:
    case 1:
      return 4;
    case 2:
      return 8;
    case 3:
    case 8:
      return 16;
    case 4:
      const e = Cs(r);
      return e ? 16 + $s(e) : 16;
    case 5:
      return 2 * r.stringValue.length;
    case 6:
      return tn(r.bytesValue).approximateByteSize();
    case 7:
      return r.referenceValue.length;
    case 9:
      return (function(n) {
        return (n.values || []).reduce(((s, i) => s + $s(i)), 0);
      })(r.arrayValue);
    case 10:
    case 11:
      return (function(n) {
        let s = 0;
        return ir(n.fields, ((i, o) => {
          s += i.length + $s(o);
        })), s;
      })(r.mapValue);
    default:
      throw X(13486, {
        value: r
      });
  }
}
function Al(r, e) {
  return {
    referenceValue: `projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`
  };
}
function yt(r) {
  return !!r && "integerValue" in r;
}
function Dn(r) {
  return !!r && "doubleValue" in r;
}
function nn(r) {
  return yt(r) || Dn(r);
}
function Zn(r) {
  return !!r && "arrayValue" in r;
}
function ot(r) {
  return !!r && "nullValue" in r;
}
function et(r) {
  return !!r && "doubleValue" in r && isNaN(Number(r.doubleValue));
}
function Jn(r) {
  return !!r && "mapValue" in r;
}
function oi(r) {
  return (r?.mapValue?.fields || {})[ch]?.stringValue === hh;
}
function ea(r) {
  return (r?.mapValue?.fields || {})[es]?.arrayValue;
}
function Mr(r) {
  if (r.geoPointValue) return {
    geoPointValue: {
      ...r.geoPointValue
    }
  };
  if (r.timestampValue && typeof r.timestampValue == "object") return {
    timestampValue: {
      ...r.timestampValue
    }
  };
  if (r.mapValue) {
    const e = {
      mapValue: {
        fields: {}
      }
    };
    return ir(r.mapValue.fields, ((t, n) => e.mapValue.fields[t] = Mr(n))), e;
  }
  if (r.arrayValue) {
    const e = {
      arrayValue: {
        values: []
      }
    };
    for (let t = 0; t < (r.arrayValue.values || []).length; ++t) e.arrayValue.values[t] = Mr(r.arrayValue.values[t]);
    return e;
  }
  return {
    ...r
  };
}
function um(r) {
  return (((r.mapValue || {}).fields || {}).__type__ || {}).stringValue === Bm;
}
class ft {
  constructor(e) {
    this.value = e;
  }
  static empty() {
    return new ft({
      mapValue: {}
    });
  }
  /**
   * Returns the value at the given path or null.
   *
   * @param path - the path to search
   * @returns The value at the path or null if the path is not set.
   */
  field(e) {
    if (e.isEmpty()) return this.value;
    {
      let t = this.value;
      for (let n = 0; n < e.length - 1; ++n) if (t = (t.mapValue.fields || {})[e.get(n)], !Jn(t)) return null;
      return t = (t.mapValue.fields || {})[e.lastSegment()], t || null;
    }
  }
  /**
   * Sets the field to the provided value.
   *
   * @param path - The field path to set.
   * @param value - The value to set.
   */
  set(e, t) {
    this.getFieldsMap(e.popLast())[e.lastSegment()] = Mr(t);
  }
  /**
   * Sets the provided fields to the provided values.
   *
   * @param data - A map of fields to values (or null for deletes).
   */
  setAll(e) {
    let t = ht.emptyPath(), n = {}, s = [];
    e.forEach(((o, B) => {
      if (!t.isImmediateParentOf(B)) {
        const u = this.getFieldsMap(t);
        this.applyChanges(u, n, s), n = {}, s = [], t = B.popLast();
      }
      o ? n[B.lastSegment()] = Mr(o) : s.push(B.lastSegment());
    }));
    const i = this.getFieldsMap(t);
    this.applyChanges(i, n, s);
  }
  /**
   * Removes the field at the specified path. If there is no field at the
   * specified path, nothing is changed.
   *
   * @param path - The field path to remove.
   */
  delete(e) {
    const t = this.field(e.popLast());
    Jn(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
  }
  isEqual(e) {
    return Ct(this.value, e.value);
  }
  /**
   * Returns the map that contains the leaf element of `path`. If the parent
   * entry does not yet exist, or if it is not a map, a new map will be created.
   */
  getFieldsMap(e) {
    let t = this.value;
    t.mapValue.fields || (t.mapValue = {
      fields: {}
    });
    for (let n = 0; n < e.length; ++n) {
      let s = t.mapValue.fields[e.get(n)];
      Jn(s) && s.mapValue.fields || (s = {
        mapValue: {
          fields: {}
        }
      }, t.mapValue.fields[e.get(n)] = s), t = s;
    }
    return t.mapValue.fields;
  }
  /**
   * Modifies `fieldsMap` by adding, replacing or deleting the specified
   * entries.
   */
  applyChanges(e, t, n) {
    ir(t, ((s, i) => e[s] = i));
    for (const s of n) delete e[s];
  }
  clone() {
    return new ft(Mr(this.value));
  }
}
function _i(r, e) {
  if (r.useProto3Json) {
    if (isNaN(e)) return {
      doubleValue: "NaN"
    };
    if (e === 1 / 0) return {
      doubleValue: "Infinity"
    };
    if (e === -1 / 0) return {
      doubleValue: "-Infinity"
    };
  }
  return {
    doubleValue: Zr(e) ? "-0" : e
  };
}
function wa(r) {
  return {
    integerValue: "" + r
  };
}
function Ta(r, e, t) {
  return om(e) ? wa(e) : _i(r, e);
}
class yi {
  constructor() {
    this._ = void 0;
  }
}
function lm(r, e, t) {
  return r instanceof ta ? (function(s, i) {
    const o = {
      fields: {
        [Bh]: {
          stringValue: ah
        },
        [lh]: {
          timestampValue: {
            seconds: s.seconds,
            nanos: s.nanoseconds
          }
        }
      }
    };
    return i && Ei(i) && (i = Cs(i)), i && (o.fields[uh] = i), {
      mapValue: o
    };
  })(t, e) : r instanceof ai ? Ch(r, e) : r instanceof Bi ? fh(r, e) : r instanceof ui ? (function(s, i) {
    const o = hm(s, i), B = li(o) + li(s.h);
    return yt(o) && yt(s.h) ? wa(B) : _i(s.serializer, B);
  })(r, e) : r instanceof na ? (function(s, i) {
    return vl(s, i, Math.min);
  })(r, e) : r instanceof ra ? (function(s, i) {
    return vl(s, i, Math.max);
  })(r, e) : void 0;
}
function cm(r, e, t) {
  return r instanceof ai ? Ch(r, e) : r instanceof Bi ? fh(r, e) : t;
}
function hm(r, e) {
  return r instanceof ui ? nn(e) ? e : {
    integerValue: 0
  } : null;
}
class ta extends yi {
}
class ai extends yi {
  constructor(e) {
    super(), this.elements = e;
  }
}
function Ch(r, e) {
  const t = dh(e);
  for (const n of r.elements) t.some(((s) => Ct(s, n))) || t.push(n);
  return {
    arrayValue: {
      values: t
    }
  };
}
class Bi extends yi {
  constructor(e) {
    super(), this.elements = e;
  }
}
function fh(r, e) {
  let t = dh(e);
  for (const n of r.elements) t = t.filter(((s) => !Ct(s, n)));
  return {
    arrayValue: {
      values: t
    }
  };
}
class Aa extends yi {
  constructor(e, t) {
    super(), this.serializer = e, this.h = t;
  }
}
class ui extends Aa {
}
class na extends Aa {
}
class ra extends Aa {
}
function vl(r, e, t) {
  if (!nn(e)) return r.h;
  const n = t(li(e), li(r.h));
  return yt(e) && yt(r.h) ? wa(n) : _i(r.serializer, n);
}
function li(r) {
  return ge(r.integerValue || r.doubleValue);
}
function dh(r) {
  return Zn(r) && r.arrayValue.values ? r.arrayValue.values.slice() : [];
}
function Cm(r, e) {
  return r.field.isEqual(e.field) && (function(n, s) {
    return n instanceof ai && s instanceof ai || n instanceof Bi && s instanceof Bi ? $n(n.elements, s.elements, Ct) : n instanceof ui && s instanceof ui || n instanceof na && s instanceof na || n instanceof ra && s instanceof ra ? Ct(n.h, s.h) : n instanceof ta && s instanceof ta;
  })(r.transform, e.transform);
}
class yn {
  constructor(e, t) {
    this.updateTime = e, this.exists = t;
  }
  /** Creates a new empty Precondition. */
  static none() {
    return new yn();
  }
  /** Creates a new Precondition with an exists flag. */
  static exists(e) {
    return new yn(void 0, e);
  }
  /** Creates a new Precondition based on a version a document exists at. */
  static updateTime(e) {
    return new yn(e);
  }
  /** Returns whether this Precondition is empty. */
  get isNone() {
    return this.updateTime === void 0 && this.exists === void 0;
  }
  isEqual(e) {
    return this.exists === e.exists && (this.updateTime ? !!e.updateTime && this.updateTime.isEqual(e.updateTime) : !e.updateTime);
  }
}
function Ys(r, e) {
  return r.updateTime !== void 0 ? e.isFoundDocument() && e.version.isEqual(r.updateTime) : r.exists === void 0 || r.exists === e.isFoundDocument();
}
class va {
}
function gh(r, e) {
  if (!r.hasLocalMutations || e && e.fields.length === 0) return null;
  if (e === null) return r.isNoDocument() ? new dm(r.key, yn.none()) : new Ra(r.key, r.data, yn.none());
  {
    const t = r.data, n = ft.empty();
    let s = new Te(ht.comparator);
    for (let i of e.fields) if (!s.has(i)) {
      let o = t.field(i);
      o === null && i.length > 1 && (i = i.popLast(), o = t.field(i)), o === null ? n.delete(i) : n.set(i, o), s = s.add(i);
    }
    return new Ii(r.key, n, new Kt(s.toArray()), yn.none());
  }
}
function fm(r, e, t) {
  r instanceof Ra ? (function(s, i, o) {
    const B = s.value.clone(), u = bl(s.fieldTransforms, i, o.transformResults);
    B.setAll(u), i.convertToFoundDocument(o.version, B).setHasCommittedMutations();
  })(r, e, t) : r instanceof Ii ? (function(s, i, o) {
    if (!Ys(s.precondition, i))
      return void i.convertToUnknownDocument(o.version);
    const B = bl(s.fieldTransforms, i, o.transformResults), u = i.data;
    u.setAll(ph(s)), u.setAll(B), i.convertToFoundDocument(o.version, u).setHasCommittedMutations();
  })(r, e, t) : (function(s, i, o) {
    i.convertToNoDocument(o.version).setHasCommittedMutations();
  })(0, e, t);
}
function Gr(r, e, t, n) {
  return r instanceof Ra ? (function(i, o, B, u) {
    if (!Ys(i.precondition, o))
      return B;
    const c = i.value.clone(), C = Ol(i.fieldTransforms, u, o);
    return c.setAll(C), o.convertToFoundDocument(o.version, c).setHasLocalMutations(), null;
  })(r, e, t, n) : r instanceof Ii ? (function(i, o, B, u) {
    if (!Ys(i.precondition, o)) return B;
    const c = Ol(i.fieldTransforms, u, o), C = o.data;
    return C.setAll(ph(i)), C.setAll(c), o.convertToFoundDocument(o.version, C).setHasLocalMutations(), B === null ? null : B.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(((f) => f.field)));
  })(r, e, t, n) : (function(i, o, B) {
    return Ys(i.precondition, o) ? (o.convertToNoDocument(o.version).setHasLocalMutations(), null) : B;
  })(r, e, t);
}
function Rl(r, e) {
  return r.type === e.type && !!r.key.isEqual(e.key) && !!r.precondition.isEqual(e.precondition) && !!(function(n, s) {
    return n === void 0 && s === void 0 || !(!n || !s) && $n(n, s, ((i, o) => Cm(i, o)));
  })(r.fieldTransforms, e.fieldTransforms) && (r.type === 0 ? r.value.isEqual(e.value) : r.type !== 1 || r.data.isEqual(e.data) && r.fieldMask.isEqual(e.fieldMask));
}
class Ra extends va {
  constructor(e, t, n, s = []) {
    super(), this.key = e, this.value = t, this.precondition = n, this.fieldTransforms = s, this.type = 0;
  }
  getFieldMask() {
    return null;
  }
}
class Ii extends va {
  constructor(e, t, n, s, i = []) {
    super(), this.key = e, this.data = t, this.fieldMask = n, this.precondition = s, this.fieldTransforms = i, this.type = 1;
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function ph(r) {
  const e = /* @__PURE__ */ new Map();
  return r.fieldMask.fields.forEach(((t) => {
    if (!t.isEmpty()) {
      const n = r.data.field(t);
      e.set(t, n);
    }
  })), e;
}
function bl(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  $(r.length === t.length, 32656, {
    T: t.length,
    P: r.length
  });
  for (let s = 0; s < t.length; s++) {
    const i = r[s], o = i.transform, B = e.data.field(i.field);
    n.set(i.field, cm(o, B, t[s]));
  }
  return n;
}
function Ol(r, e, t) {
  const n = /* @__PURE__ */ new Map();
  for (const s of r) {
    const i = s.transform, o = t.data.field(s.field);
    n.set(s.field, lm(i, o, e));
  }
  return n;
}
class dm extends va {
  constructor(e, t) {
    super(), this.key = e, this.precondition = t, this.type = 2, this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}
class ci {
  constructor(e, t) {
    this.position = e, this.inclusive = t;
  }
}
function Sl(r, e, t) {
  let n = 0;
  for (let s = 0; s < r.position.length; s++) {
    const i = e[s], o = r.position[s];
    if (i.field.isKeyField() ? n = Q.comparator(Q.fromName(o.referenceValue), t.key) : n = Ze(o, t.data.field(i.field)), i.dir === "desc" && (n *= -1), n !== 0) break;
  }
  return n;
}
function Nl(r, e) {
  if (r === null) return e === null;
  if (e === null || r.inclusive !== e.inclusive || r.position.length !== e.position.length) return !1;
  for (let t = 0; t < r.position.length; t++)
    if (!Ct(r.position[t], e.position[t])) return !1;
  return !0;
}
class mh {
}
class ye extends mh {
  constructor(e, t, n) {
    super(), this.field = e, this.op = t, this.value = n;
  }
  /**
   * Creates a filter based on the provided arguments.
   */
  static create(e, t, n) {
    return e.isKeyField() ? t === "in" || t === "not-in" ? this.createKeyFieldInFilter(e, t, n) : new pm(e, t, n) : t === "array-contains" ? new Dm(e, n) : t === "in" ? new _m(e, n) : t === "not-in" ? new ym(e, n) : t === "array-contains-any" ? new Im(e, n) : new ye(e, t, n);
  }
  static createKeyFieldInFilter(e, t, n) {
    return t === "in" ? new mm(e, n) : new Em(e, n);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return this.op === "!=" ? t !== null && t.nullValue === void 0 && this.matchesComparison(Ze(t, this.value)) : t !== null && ve(this.value) === ve(t) && this.matchesComparison(Ze(t, this.value));
  }
  matchesComparison(e) {
    switch (this.op) {
      case "<":
        return e < 0;
      case "<=":
        return e <= 0;
      case "==":
        return e === 0;
      case "!=":
        return e !== 0;
      case ">":
        return e > 0;
      case ">=":
        return e >= 0;
      default:
        return X(47266, {
          operator: this.op
        });
    }
  }
  isInequality() {
    return [
      "<",
      "<=",
      ">",
      ">=",
      "!=",
      "not-in"
      /* Operator.NOT_IN */
    ].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
}
class gt extends mh {
  constructor(e, t) {
    super(), this.filters = e, this.op = t, this.I = null;
  }
  /**
   * Creates a filter based on the provided arguments.
   */
  static create(e, t) {
    return new gt(e, t);
  }
  matches(e) {
    return Eh(this) ? this.filters.find(((t) => !t.matches(e))) === void 0 : this.filters.find(((t) => t.matches(e))) !== void 0;
  }
  getFlattenedFilters() {
    return this.I !== null || (this.I = this.filters.reduce(((e, t) => e.concat(t.getFlattenedFilters())), [])), this.I;
  }
  // Returns a mutable copy of `this.filters`
  getFilters() {
    return Object.assign([], this.filters);
  }
}
function Eh(r) {
  return r.op === "and";
}
function Dh(r) {
  return gm(r) && Eh(r);
}
function gm(r) {
  for (const e of r.filters) if (e instanceof gt) return !1;
  return !0;
}
function sa(r) {
  if (r instanceof ye)
    return r.field.canonicalString() + r.op.toString() + Xn(r.value);
  if (Dh(r))
    return r.filters.map(((e) => sa(e))).join(",");
  {
    const e = r.filters.map(((t) => sa(t))).join(",");
    return `${r.op}(${e})`;
  }
}
function _h(r, e) {
  return r instanceof ye ? (function(n, s) {
    return s instanceof ye && n.op === s.op && n.field.isEqual(s.field) && Ct(n.value, s.value);
  })(r, e) : r instanceof gt ? (function(n, s) {
    return s instanceof gt && n.op === s.op && n.filters.length === s.filters.length ? n.filters.reduce(((i, o, B) => i && _h(o, s.filters[B])), !0) : !1;
  })(r, e) : void X(19439);
}
function yh(r) {
  return r instanceof ye ? (function(t) {
    return `${t.field.canonicalString()} ${t.op} ${Xn(t.value)}`;
  })(r) : r instanceof gt ? (function(t) {
    return t.op.toString() + " {" + t.getFilters().map(yh).join(" ,") + "}";
  })(r) : "Filter";
}
class pm extends ye {
  constructor(e, t, n) {
    super(e, t, n), this.key = Q.fromName(n.referenceValue);
  }
  matches(e) {
    const t = Q.comparator(e.key, this.key);
    return this.matchesComparison(t);
  }
}
class mm extends ye {
  constructor(e, t) {
    super(e, "in", t), this.keys = Ih("in", t);
  }
  matches(e) {
    return this.keys.some(((t) => t.isEqual(e.key)));
  }
}
class Em extends ye {
  constructor(e, t) {
    super(e, "not-in", t), this.keys = Ih("not-in", t);
  }
  matches(e) {
    return !this.keys.some(((t) => t.isEqual(e.key)));
  }
}
function Ih(r, e) {
  return (e.arrayValue?.values || []).map(((t) => Q.fromName(t.referenceValue)));
}
class Dm extends ye {
  constructor(e, t) {
    super(e, "array-contains", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return Zn(t) && ts(t.arrayValue, this.value);
  }
}
class _m extends ye {
  constructor(e, t) {
    super(e, "in", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return t !== null && ts(this.value.arrayValue, t);
  }
}
class ym extends ye {
  constructor(e, t) {
    super(e, "not-in", t);
  }
  matches(e) {
    if (ts(this.value.arrayValue, {
      nullValue: "NULL_VALUE"
    })) return !1;
    const t = e.data.field(this.field);
    return t !== null && t.nullValue === void 0 && !ts(this.value.arrayValue, t);
  }
}
class Im extends ye {
  constructor(e, t) {
    super(e, "array-contains-any", t);
  }
  matches(e) {
    const t = e.data.field(this.field);
    return !(!Zn(t) || !t.arrayValue.values) && t.arrayValue.values.some(((n) => ts(this.value.arrayValue, n)));
  }
}
class hi {
  constructor(e, t = "asc") {
    this.field = e, this.dir = t;
  }
}
function wm(r, e) {
  return r.dir === e.dir && r.field.isEqual(e.field);
}
class Z {
  static fromTimestamp(e) {
    return new Z(e);
  }
  static min() {
    return new Z(new le(0, 0));
  }
  static max() {
    return new Z(new le(253402300799, 999999999));
  }
  constructor(e) {
    this.timestamp = e;
  }
  compareTo(e) {
    return this.timestamp._compareTo(e.timestamp);
  }
  isEqual(e) {
    return this.timestamp.isEqual(e.timestamp);
  }
  /** Returns a number representation of the version for use in spec tests. */
  toMicroseconds() {
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
  }
  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }
  toTimestamp() {
    return this.timestamp;
  }
}
class ke {
  constructor(e, t, n, s, i, o, B) {
    this.key = e, this.documentType = t, this.version = n, this.readTime = s, this.createTime = i, this.data = o, this.documentState = B;
  }
  /**
   * Creates a document with no known version or data, but which can serve as
   * base document for mutations.
   */
  static newInvalidDocument(e) {
    return new ke(
      e,
      0,
      /* version */
      Z.min(),
      /* readTime */
      Z.min(),
      /* createTime */
      Z.min(),
      ft.empty(),
      0
      /* DocumentState.SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist with the given data at the
   * given version.
   */
  static newFoundDocument(e, t, n, s) {
    return new ke(
      e,
      1,
      /* version */
      t,
      /* readTime */
      Z.min(),
      /* createTime */
      n,
      s,
      0
      /* DocumentState.SYNCED */
    );
  }
  /** Creates a new document that is known to not exist at the given version. */
  static newNoDocument(e, t) {
    return new ke(
      e,
      2,
      /* version */
      t,
      /* readTime */
      Z.min(),
      /* createTime */
      Z.min(),
      ft.empty(),
      0
      /* DocumentState.SYNCED */
    );
  }
  /**
   * Creates a new document that is known to exist at the given version but
   * whose data is not known (e.g. a document that was updated without a known
   * base document).
   */
  static newUnknownDocument(e, t) {
    return new ke(
      e,
      3,
      /* version */
      t,
      /* readTime */
      Z.min(),
      /* createTime */
      Z.min(),
      ft.empty(),
      2
      /* DocumentState.HAS_COMMITTED_MUTATIONS */
    );
  }
  /**
   * Changes the document type to indicate that it exists and that its version
   * and data are known.
   */
  convertToFoundDocument(e, t) {
    return !this.createTime.isEqual(Z.min()) || this.documentType !== 2 && this.documentType !== 0 || (this.createTime = e), this.version = e, this.documentType = 1, this.data = t, this.documentState = 0, this;
  }
  /**
   * Changes the document type to indicate that it doesn't exist at the given
   * version.
   */
  convertToNoDocument(e) {
    return this.version = e, this.documentType = 2, this.data = ft.empty(), this.documentState = 0, this;
  }
  /**
   * Changes the document type to indicate that it exists at a given version but
   * that its data is not known (e.g. a document that was updated without a known
   * base document).
   */
  convertToUnknownDocument(e) {
    return this.version = e, this.documentType = 3, this.data = ft.empty(), this.documentState = 2, this;
  }
  setHasCommittedMutations() {
    return this.documentState = 2, this;
  }
  setHasLocalMutations() {
    return this.documentState = 1, this.version = Z.min(), this;
  }
  setReadTime(e) {
    return this.readTime = e, this;
  }
  get hasLocalMutations() {
    return this.documentState === 1;
  }
  get hasCommittedMutations() {
    return this.documentState === 2;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return this.documentType !== 0;
  }
  isFoundDocument() {
    return this.documentType === 1;
  }
  isNoDocument() {
    return this.documentType === 2;
  }
  isUnknownDocument() {
    return this.documentType === 3;
  }
  isEqual(e) {
    return e instanceof ke && this.key.isEqual(e.key) && this.version.isEqual(e.version) && this.documentType === e.documentType && this.documentState === e.documentState && this.data.isEqual(e.data);
  }
  mutableCopy() {
    return new ke(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
  }
}
const ns = -1;
function Tm(r, e) {
  const t = r.toTimestamp().seconds, n = r.toTimestamp().nanoseconds + 1, s = Z.fromTimestamp(n === 1e9 ? new le(t + 1, 0) : new le(t, n));
  return new rn(s, Q.empty(), e);
}
function Am(r) {
  return new rn(r.readTime, r.key, ns);
}
class rn {
  constructor(e, t, n) {
    this.readTime = e, this.documentKey = t, this.largestBatchId = n;
  }
  /** Returns an offset that sorts before all regular offsets. */
  static min() {
    return new rn(Z.min(), Q.empty(), ns);
  }
  /** Returns an offset that sorts after all regular offsets. */
  static max() {
    return new rn(Z.max(), Q.empty(), ns);
  }
}
function vm(r, e) {
  let t = r.readTime.compareTo(e.readTime);
  return t !== 0 ? t : (t = Q.comparator(r.documentKey, e.documentKey), t !== 0 ? t : te(r.largestBatchId, e.largestBatchId));
}
class Rm {
  constructor(e, t = null, n = [], s = [], i = null, o = null, B = null) {
    this.path = e, this.collectionGroup = t, this.orderBy = n, this.filters = s, this.limit = i, this.startAt = o, this.endAt = B, this.R = null;
  }
}
function Fl(r, e = null, t = [], n = [], s = null, i = null, o = null) {
  return new Rm(r, e, t, n, s, i, o);
}
function wh(r) {
  const e = oe(r);
  if (e.R === null) {
    let t = e.path.canonicalString();
    e.collectionGroup !== null && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map(((n) => sa(n))).join(","), t += "|ob:", t += e.orderBy.map(((n) => (function(i) {
      return i.field.canonicalString() + i.dir;
    })(n))).join(","), Di(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", t += e.startAt.inclusive ? "b:" : "a:", t += e.startAt.position.map(((n) => Xn(n))).join(",")), e.endAt && (t += "|ub:", t += e.endAt.inclusive ? "a:" : "b:", t += e.endAt.position.map(((n) => Xn(n))).join(",")), e.R = t;
  }
  return e.R;
}
function Th(r, e) {
  if (r.limit !== e.limit || r.orderBy.length !== e.orderBy.length) return !1;
  for (let t = 0; t < r.orderBy.length; t++) if (!wm(r.orderBy[t], e.orderBy[t])) return !1;
  if (r.filters.length !== e.filters.length) return !1;
  for (let t = 0; t < r.filters.length; t++) if (!_h(r.filters[t], e.filters[t])) return !1;
  return r.collectionGroup === e.collectionGroup && !!r.path.isEqual(e.path) && !!Nl(r.startAt, e.startAt) && Nl(r.endAt, e.endAt);
}
function mn(r) {
  return !!r.isCorePipeline;
}
function Ah(r) {
  return !!r.path && Q.isDocumentKey(r.path) && r.collectionGroup === null && r.filters.length === 0;
}
class fs {
  /**
   * Initializes a Query with a path and optional additional query constraints.
   * Path must currently be empty if this is a collection group query.
   */
  constructor(e, t = null, n = [], s = [], i = null, o = "F", B = null, u = null) {
    this.path = e, this.collectionGroup = t, this.explicitOrderBy = n, this.filters = s, this.limit = i, this.limitType = o, this.startAt = B, this.endAt = u, this.A = null, // The corresponding `Target` of this `Query` instance, for use with
    // non-aggregate queries.
    this.V = null, // The corresponding `Target` of this `Query` instance, for use with
    // aggregate queries. Unlike targets for non-aggregate queries,
    // aggregate query targets do not contain normalized order-bys, they only
    // contain explicit order-bys.
    this.m = null, this.startAt, this.endAt;
  }
}
function bm(r, e, t, n, s, i, o, B) {
  return new fs(r, e, t, n, s, i, o, B);
}
function ba(r) {
  return new fs(r);
}
function Pl(r) {
  return r.filters.length === 0 && r.limit === null && r.startAt == null && r.endAt == null && (r.explicitOrderBy.length === 0 || r.explicitOrderBy.length === 1 && r.explicitOrderBy[0].field.isKeyField());
}
function Om(r) {
  return Q.isDocumentKey(r.path) && r.collectionGroup === null && r.filters.length === 0;
}
function vh(r) {
  return r.collectionGroup !== null;
}
function kr(r) {
  const e = oe(r);
  if (e.A === null) {
    e.A = [];
    const t = /* @__PURE__ */ new Set();
    for (const i of e.explicitOrderBy) e.A.push(i), t.add(i.field.canonicalString());
    const n = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
    (function(o) {
      let B = new Te(ht.comparator);
      return o.filters.forEach(((u) => {
        u.getFlattenedFilters().forEach(((c) => {
          c.isInequality() && (B = B.add(c.field));
        }));
      })), B;
    })(e).forEach(((i) => {
      t.has(i.canonicalString()) || i.isKeyField() || e.A.push(new hi(i, n));
    })), // Add the document key field to the last if it is not explicitly ordered.
    t.has(ht.keyField().canonicalString()) || e.A.push(new hi(ht.keyField(), n));
  }
  return e.A;
}
function It(r) {
  const e = oe(r);
  return e.V || (e.V = Sm(e, kr(r))), e.V;
}
function Sm(r, e) {
  if (r.limitType === "F") return Fl(r.path, r.collectionGroup, e, r.filters, r.limit, r.startAt, r.endAt);
  {
    e = e.map(((s) => {
      const i = s.dir === "desc" ? "asc" : "desc";
      return new hi(s.field, i);
    }));
    const t = r.endAt ? new ci(r.endAt.position, r.endAt.inclusive) : null, n = r.startAt ? new ci(r.startAt.position, r.startAt.inclusive) : null;
    return Fl(r.path, r.collectionGroup, e, r.filters, r.limit, t, n);
  }
}
function ia(r, e) {
  const t = r.filters.concat([e]);
  return new fs(r.path, r.collectionGroup, r.explicitOrderBy.slice(), t, r.limit, r.limitType, r.startAt, r.endAt);
}
function oa(r, e, t) {
  return new fs(r.path, r.collectionGroup, r.explicitOrderBy.slice(), r.filters.slice(), e, t, r.startAt, r.endAt);
}
function Nm(r, e) {
  return Th(It(r), It(e)) && r.limitType === e.limitType;
}
function Hr(r) {
  return `Query(target=${(function(t) {
    let n = t.path.canonicalString();
    return t.collectionGroup !== null && (n += " collectionGroup=" + t.collectionGroup), t.filters.length > 0 && (n += `, filters: [${t.filters.map(((s) => yh(s))).join(", ")}]`), Di(t.limit) || (n += ", limit: " + t.limit), t.orderBy.length > 0 && (n += `, orderBy: [${t.orderBy.map(((s) => (function(o) {
      return `${o.field.canonicalString()} (${o.dir})`;
    })(s))).join(", ")}]`), t.startAt && (n += ", startAt: ", n += t.startAt.inclusive ? "b:" : "a:", n += t.startAt.position.map(((s) => Xn(s))).join(",")), t.endAt && (n += ", endAt: ", n += t.endAt.inclusive ? "a:" : "b:", n += t.endAt.position.map(((s) => Xn(s))).join(",")), `Target(${n})`;
  })(It(r))}; limitType=${r.limitType})`;
}
function wi(r, e) {
  return e.isFoundDocument() && (function(n, s) {
    const i = s.key.path;
    return n.collectionGroup !== null ? s.key.hasCollectionId(n.collectionGroup) && n.path.isPrefixOf(i) : Q.isDocumentKey(n.path) ? n.path.isEqual(i) : n.path.isImmediateParentOf(i);
  })(r, e) && (function(n, s) {
    for (const i of kr(n))
      if (!i.field.isKeyField() && s.data.field(i.field) === null) return !1;
    return !0;
  })(r, e) && (function(n, s) {
    for (const i of n.filters) if (!i.matches(s)) return !1;
    return !0;
  })(r, e) && (function(n, s) {
    return !(n.startAt && !/**
    * Returns true if a document sorts before a bound using the provided sort
    * order.
    */
    (function(o, B, u) {
      const c = Sl(o, B, u);
      return o.inclusive ? c <= 0 : c < 0;
    })(n.startAt, kr(n), s) || n.endAt && !(function(o, B, u) {
      const c = Sl(o, B, u);
      return o.inclusive ? c >= 0 : c > 0;
    })(n.endAt, kr(n), s));
  })(r, e);
}
function Oa(r) {
  return (e, t) => {
    let n = !1;
    for (const s of kr(r)) {
      const i = Fm(s, e, t);
      if (i !== 0) return i;
      n = n || s.field.isKeyField();
    }
    return 0;
  };
}
function Fm(r, e, t) {
  const n = r.field.isKeyField() ? Q.comparator(e.key, t.key) : (function(i, o, B) {
    const u = o.data.field(i), c = B.data.field(i);
    return u !== null && c !== null ? Ze(u, c) : X(42886);
  })(r.field, e, t);
  switch (r.dir) {
    case "asc":
      return n;
    case "desc":
      return -1 * n;
    default:
      return X(19790, {
        direction: r.dir
      });
  }
}
class Pm {
  constructor(e, t) {
    this.count = e, this.unchangedNames = t;
  }
}
var _e, re;
function Rh(r) {
  if (r === void 0)
    return Nt("GRPC error has no .code"), M.UNKNOWN;
  switch (r) {
    case _e.OK:
      return M.OK;
    case _e.CANCELLED:
      return M.CANCELLED;
    case _e.UNKNOWN:
      return M.UNKNOWN;
    case _e.DEADLINE_EXCEEDED:
      return M.DEADLINE_EXCEEDED;
    case _e.RESOURCE_EXHAUSTED:
      return M.RESOURCE_EXHAUSTED;
    case _e.INTERNAL:
      return M.INTERNAL;
    case _e.UNAVAILABLE:
      return M.UNAVAILABLE;
    case _e.UNAUTHENTICATED:
      return M.UNAUTHENTICATED;
    case _e.INVALID_ARGUMENT:
      return M.INVALID_ARGUMENT;
    case _e.NOT_FOUND:
      return M.NOT_FOUND;
    case _e.ALREADY_EXISTS:
      return M.ALREADY_EXISTS;
    case _e.PERMISSION_DENIED:
      return M.PERMISSION_DENIED;
    case _e.FAILED_PRECONDITION:
      return M.FAILED_PRECONDITION;
    case _e.ABORTED:
      return M.ABORTED;
    case _e.OUT_OF_RANGE:
      return M.OUT_OF_RANGE;
    case _e.UNIMPLEMENTED:
      return M.UNIMPLEMENTED;
    case _e.DATA_LOSS:
      return M.DATA_LOSS;
    default:
      return X(39323, {
        code: r
      });
  }
}
(re = _e || (_e = {}))[re.OK = 0] = "OK", re[re.CANCELLED = 1] = "CANCELLED", re[re.UNKNOWN = 2] = "UNKNOWN", re[re.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", re[re.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", re[re.NOT_FOUND = 5] = "NOT_FOUND", re[re.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", re[re.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", re[re.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", re[re.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", re[re.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", re[re.ABORTED = 10] = "ABORTED", re[re.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", re[re.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", re[re.INTERNAL = 13] = "INTERNAL", re[re.UNAVAILABLE = 14] = "UNAVAILABLE", re[re.DATA_LOSS = 15] = "DATA_LOSS";
class bn {
  constructor(e, t) {
    this.mapKeyFn = e, this.equalsFn = t, /**
     * The inner map for a key/value pair. Due to the possibility of collisions we
     * keep a list of entries that we do a linear search through to find an actual
     * match. Note that collisions should be rare, so we still expect near
     * constant time lookups in practice.
     */
    this.inner = {}, /** The number of entries stored in the map */
    this.innerSize = 0;
  }
  /** Get a value for this key, or undefined if it does not exist. */
  get(e) {
    const t = this.mapKeyFn(e), n = this.inner[t];
    if (n !== void 0) {
      for (const [s, i] of n) if (this.equalsFn(s, e)) return i;
    }
  }
  has(e) {
    return this.get(e) !== void 0;
  }
  /** Put this key and value in the map. */
  set(e, t) {
    const n = this.mapKeyFn(e), s = this.inner[n];
    if (s === void 0) return this.inner[n] = [[e, t]], void this.innerSize++;
    for (let i = 0; i < s.length; i++) if (this.equalsFn(s[i][0], e))
      return void (s[i] = [e, t]);
    s.push([e, t]), this.innerSize++;
  }
  /**
   * Remove this key from the map. Returns a boolean if anything was deleted.
   */
  delete(e) {
    const t = this.mapKeyFn(e), n = this.inner[t];
    if (n === void 0) return !1;
    for (let s = 0; s < n.length; s++) if (this.equalsFn(n[s][0], e)) return n.length === 1 ? delete this.inner[t] : n.splice(s, 1), this.innerSize--, !0;
    return !1;
  }
  forEach(e) {
    ir(this.inner, ((t, n) => {
      for (const [s, i] of n) e(s, i);
    }));
  }
  isEmpty() {
    return sh(this.inner);
  }
  size() {
    return this.innerSize;
  }
}
const Lm = new me(Q.comparator);
function at() {
  return Lm;
}
const bh = new me(Q.comparator);
function kn(...r) {
  let e = bh;
  for (const t of r) e = e.insert(t.key, t);
  return e;
}
function xm(r) {
  let e = bh;
  return r.forEach(((t, n) => e = e.insert(t, n.overlayedDocument))), e;
}
function qt() {
  return Ur();
}
function Oh() {
  return Ur();
}
function Ur() {
  return new bn(((r) => r.toString()), ((r, e) => r.isEqual(e)));
}
const Vm = new Te(Q.comparator);
function ne(...r) {
  let e = Vm;
  for (const t of r) e = e.add(t);
  return e;
}
const Mm = new Te(te);
function Gm() {
  return Mm;
}
function km() {
  return new TextEncoder();
}
const Hm = new $t([4294967295, 4294967295], 0);
function Ll(r) {
  const e = km().encode(r), t = new Jc();
  return t.update(e), new Uint8Array(t.digest());
}
function xl(r) {
  const e = new DataView(r.buffer), t = e.getUint32(
    0,
    /* littleEndian= */
    !0
  ), n = e.getUint32(
    4,
    /* littleEndian= */
    !0
  ), s = e.getUint32(
    8,
    /* littleEndian= */
    !0
  ), i = e.getUint32(
    12,
    /* littleEndian= */
    !0
  );
  return [new $t([t, n], 0), new $t([s, i], 0)];
}
class Sa {
  constructor(e, t, n) {
    if (this.bitmap = e, this.padding = t, this.hashCount = n, t < 0 || t >= 8) throw new Fr(`Invalid padding: ${t}`);
    if (n < 0) throw new Fr(`Invalid hash count: ${n}`);
    if (e.length > 0 && this.hashCount === 0)
      throw new Fr(`Invalid hash count: ${n}`);
    if (e.length === 0 && t !== 0)
      throw new Fr(`Invalid padding when bitmap length is 0: ${t}`);
    this.p = 8 * e.length - t, // Set the bit count in Integer to avoid repetition in mightContain().
    this.S = $t.fromNumber(this.p);
  }
  // Calculate the ith hash value based on the hashed 64bit integers,
  // and calculate its corresponding bit index in the bitmap to be checked.
  v(e, t, n) {
    let s = e.add(t.multiply($t.fromNumber(n)));
    return s.compare(Hm) === 1 && (s = new $t([s.getBits(0), s.getBits(1)], 0)), s.modulo(this.S).toNumber();
  }
  // Return whether the bit on the given index in the bitmap is set to 1.
  D(e) {
    return !!(this.bitmap[Math.floor(e / 8)] & 1 << e % 8);
  }
  mightContain(e) {
    if (this.p === 0) return !1;
    const t = Ll(e), [n, s] = xl(t);
    for (let i = 0; i < this.hashCount; i++) {
      const o = this.v(n, s, i);
      if (!this.D(o)) return !1;
    }
    return !0;
  }
  /** Create bloom filter for testing purposes only. */
  static create(e, t, n) {
    const s = e % 8 == 0 ? 0 : 8 - e % 8, i = new Uint8Array(Math.ceil(e / 8)), o = new Sa(i, s, t);
    return n.forEach(((B) => o.insert(B))), o;
  }
  insert(e) {
    if (this.p === 0) return;
    const t = Ll(e), [n, s] = xl(t);
    for (let i = 0; i < this.hashCount; i++) {
      const o = this.v(n, s, i);
      this.C(o);
    }
  }
  C(e) {
    const t = Math.floor(e / 8), n = e % 8;
    this.bitmap[t] |= 1 << n;
  }
}
class Fr extends Error {
  constructor() {
    super(...arguments), this.name = "BloomFilterError";
  }
}
class ds {
  constructor(e, t, n, s, i, o) {
    this.snapshotVersion = e, this.targetChanges = t, this.targetMismatches = n, this.documentUpdates = s, this.augmentedDocumentUpdates = i, this.resolvedLimboDocuments = o;
  }
  /**
   * HACK: Views require RemoteEvents in order to determine whether the view is
   * CURRENT, but secondary tabs don't receive remote events. So this method is
   * used to create a synthesized RemoteEvent that can be used to apply a
   * CURRENT status change to a View, for queries executed in a different tab.
   */
  // PORTING NOTE: Multi-tab only
  static createSynthesizedRemoteEventForCurrentChange(e, t, n) {
    const s = /* @__PURE__ */ new Map();
    return s.set(e, gs.createSynthesizedTargetChangeForCurrentChange(e, t, n)), new ds(Z.min(), s, new me(te), at(), at(), ne());
  }
}
class gs {
  constructor(e, t, n, s, i) {
    this.resumeToken = e, this.current = t, this.addedDocuments = n, this.modifiedDocuments = s, this.removedDocuments = i;
  }
  /**
   * This method is used to create a synthesized TargetChanges that can be used to
   * apply a CURRENT status change to a View (for queries executed in a different
   * tab) or for new queries (to raise snapshots with correct CURRENT status).
   */
  static createSynthesizedTargetChangeForCurrentChange(e, t, n) {
    return new gs(n, t, ne(), ne(), ne());
  }
}
class Ws {
  constructor(e, t, n, s) {
    this.F = e, this.removedTargetIds = t, this.key = n, this.O = s;
  }
}
class Sh {
  constructor(e, t) {
    this.targetId = e, this.M = t;
  }
}
class Nh {
  constructor(e, t, n = Ae.EMPTY_BYTE_STRING, s = null) {
    this.state = e, this.targetIds = t, this.resumeToken = n, this.cause = s;
  }
}
class Vl {
  /**
   * Track the targetId for logging.
   */
  constructor(e) {
    this.targetId = e, /**
     * The number of pending responses (adds or removes) that we are waiting on.
     * We only consider targets active that have no pending responses.
     */
    this.N = 0, /**
     * Keeps track of the document changes since the last raised snapshot.
     *
     * These changes are continuously updated as we receive document updates and
     * always reflect the current set of changes against the last issued snapshot.
     */
    this.L = Ml(), /** See public getters for explanations of these fields. */
    this.B = Ae.EMPTY_BYTE_STRING, this.U = !1, /**
     * Whether this target state should be included in the next snapshot. We
     * initialize to true so that newly-added targets are included in the next
     * RemoteEvent.
     */
    this.k = !0;
  }
  /**
   * Whether this target has been marked 'current'.
   *
   * 'Current' has special meaning in the RPC protocol: It implies that the
   * Watch backend has sent us all changes up to the point at which the target
   * was added and that the target is consistent with the rest of the watch
   * stream.
   */
  get current() {
    return this.U;
  }
  /** The last resume token sent to us for this target. */
  get resumeToken() {
    return this.B;
  }
  /** Whether this target has pending target adds or target removes. */
  get q() {
    return this.N !== 0;
  }
  /** Whether we have modified any state that should trigger a snapshot. */
  get $() {
    return this.k;
  }
  /**
   * Applies the resume token to the TargetChange, but only when it has a new
   * value. Empty resumeTokens are discarded.
   */
  K(e) {
    e.approximateByteSize() > 0 && (this.k = !0, this.B = e);
  }
  /**
   * Creates a target change from the current set of changes.
   *
   * To reset the document changes after raising this snapshot, call
   * `clearPendingChanges()`.
   */
  W() {
    let e = ne(), t = ne(), n = ne();
    return this.L.forEach(((s, i) => {
      switch (i) {
        case 0:
          e = e.add(s);
          break;
        case 2:
          t = t.add(s);
          break;
        case 1:
          n = n.add(s);
          break;
        default:
          X(38017, {
            changeType: i
          });
      }
    })), new gs(this.B, this.U, e, t, n);
  }
  /**
   * Resets the document changes and sets `hasPendingChanges` to false.
   */
  G() {
    this.k = !1, this.L = Ml();
  }
  j(e, t) {
    this.k = !0, this.L = this.L.insert(e, t);
  }
  H(e) {
    this.k = !0, this.L = this.L.remove(e);
  }
  J() {
    this.N += 1;
  }
  Y() {
    this.N -= 1, $(this.N >= 0, 3241, {
      N: this.N,
      targetId: this.targetId
    });
  }
  Z() {
    this.k = !0, this.U = !0;
  }
}
const br = "WatchChangeAggregator";
class Um {
  constructor(e) {
    this.X = e, /**
     * The internal state of all tracked targets.
     *
     * Targets have the following lifecycle of [states] within the WatchChangeAggregator:
     * [unknown] -> recordPendingTargetRequest(t)
     *           -> [pending]
     *           -> handleTargetChange(t, Added)
     *           -> [added / !pending]
     *           -> recordPendingTargetRequest(t)
     *           -> [pending]
     *           -> handleTargetChange(t, Removed)
     *           -> [unknown]
     *
     * A reset on an [added] target leaves the target in an [added] state.
     * [added / !pending] -> handleTargetChange(t, Reset)
     *                    -> [added / !pending]
     *
     * [active]: is a substate of [added], where also `remoteStore.listenTargets.has(t) === true`.
     *           Generally it is expected that when a target is [active / !pending]
     *           then it is also [active], but the implementation does not guarantee
     *           this will always be true.
     *
     */
    this.ee = /* @__PURE__ */ new Map(), /** Keeps track of the documents to update since the last raised snapshot. */
    this.te = at(), this.ne = js(), /** Keeps track of the augmented documents to update since the last raised snapshot. */
    this.re = at(), /** A mapping of document keys to their set of target IDs. */
    this.ie = js(), /**
     * A map of targets with existence filter mismatches. These targets are
     * known to be inconsistent and their listens needs to be re-established by
     * RemoteStore.
     */
    this.se = new me(te);
  }
  /**
   * Processes and adds the DocumentWatchChange to the current set of changes.
   */
  _e(e) {
    for (const t of e.F) e.O && e.O.isFoundDocument() ? this.oe(t, e.O) : this.ae(t, e.key, e.O);
    for (const t of e.removedTargetIds) this.ae(t, e.key, e.O);
  }
  /** Processes and adds the WatchTargetChange to the current set of changes. */
  ue(e) {
    this.forEachTarget(e, ((t) => {
      const n = this.ee.get(t);
      if (n) switch (e.state) {
        case 0:
          this.ce(t) && n.K(e.resumeToken);
          break;
        case 1:
          n.Y(), n.q || // We have a freshly added target, so we need to reset any state
          // that we had previously. This can happen e.g. when remove and add
          // back a target for existence filter mismatches.
          n.G(), n.K(e.resumeToken);
          break;
        case 2:
          n.Y(), n.q || this.removeTarget(t);
          break;
        case 3:
          this.ce(t) && (n.Z(), n.K(e.resumeToken));
          break;
        case 4:
          this.ce(t) && // Reset the target and synthesizes removes for all existing
          // documents. The backend will re-add any documents that still
          // match the target before it sends the next global snapshot.
          (this.le(t), n.K(e.resumeToken));
          break;
        default:
          X(56790, {
            state: e.state
          });
      }
      else U(br, `handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`);
    }));
  }
  /**
   * Iterates over all targetIds that the watch change applies to: either the
   * targetIds explicitly listed in the change or the targetIds of all currently
   * active targets.
   */
  forEachTarget(e, t) {
    e.targetIds.length > 0 ? e.targetIds.forEach(t) : this.ee.forEach(((n, s) => {
      this.ce(s) && t(s);
    }));
  }
  Ee(e) {
    return mn(e) ? e.getPipelineSourceType() === "documents" && e.getPipelineDocuments()?.length === 1 : Ah(e);
  }
  /**
   * Handles existence filters and synthesizes deletes for filter mismatches.
   * Targets that are invalidated by filter mismatches are added to
   * `pendingTargetResets`.
   */
  he(e) {
    const t = e.targetId, n = e.M.count, s = this.Te(t);
    if (s) {
      const i = s.target;
      if (this.Ee(i)) if (n === 0) {
        const o = new Q(mn(i) ? Be.fromString(i.getPipelineDocuments()[0]) : i.path);
        this.ae(t, o, ke.newNoDocument(o, Z.min()));
      } else $(n === 1, 20013, "Single document existence filter with count: " + n);
      else {
        const o = this.Pe(t);
        if (o !== n) {
          const B = this.Ie(e), u = B ? this.Re(B, e, o) : 1;
          if (u !== 0) {
            this.le(t);
            const c = u === 2 ? "TargetPurposeExistenceFilterMismatchBloom" : "TargetPurposeExistenceFilterMismatch";
            this.se = this.se.insert(t, c);
          }
        }
      }
    }
  }
  /**
   * Parse the bloom filter from the "unchanged_names" field of an existence
   * filter.
   */
  Ie(e) {
    const t = e.M.unchangedNames;
    if (!t || !t.bits) return null;
    const { bits: { bitmap: n = "", padding: s = 0 }, hashCount: i = 0 } = t;
    let o, B;
    try {
      o = tn(n).toUint8Array();
    } catch (u) {
      if (u instanceof oh) return dt("Decoding the base64 bloom filter in existence filter failed (" + u.message + "); ignoring the bloom filter and falling back to full re-query."), null;
      throw u;
    }
    try {
      B = new Sa(o, s, i);
    } catch (u) {
      return dt(u instanceof Fr ? "BloomFilter error: " : "Applying bloom filter failed: ", u), null;
    }
    return B.p === 0 ? null : B;
  }
  /**
   * Apply bloom filter to remove the deleted documents, and return the
   * application status.
   */
  Re(e, t, n) {
    return t.M.count === n - this.de(e, t.targetId) ? 0 : 2;
  }
  /**
   * Filter out removed documents based on bloom filter membership result and
   * return number of documents removed.
   */
  de(e, t) {
    const n = this.X.getRemoteKeysForTarget(t);
    let s = 0;
    return n.forEach(((i) => {
      const o = this.X.Ve(), B = `projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;
      e.mightContain(B) || (this.ae(
        t,
        i,
        /*updatedDocument=*/
        null
      ), s++);
    })), s;
  }
  /**
   * Converts the currently accumulated state into a remote event at the
   * provided snapshot version. Resets the accumulated changes before returning.
   */
  fe(e) {
    const t = /* @__PURE__ */ new Map();
    this.ee.forEach(((i, o) => {
      const B = this.Te(o);
      if (B) {
        if (i.current && this.Ee(B.target)) {
          const u = mn(B.target) ? Be.fromString(B.target.getPipelineDocuments()[0]) : B.target.path, c = new Q(u);
          this.me(c).has(o) || this.pe(o, c) || this.ae(o, c, ke.newNoDocument(c, e));
        }
        i.$ && (t.set(o, i.W()), i.G());
      }
    }));
    let n = ne();
    this.ie.forEach(((i, o) => {
      let B = !0;
      o.forEachWhile(((u) => {
        const c = this.Te(u);
        return !c || c.purpose === "TargetPurposeLimboResolution" || (B = !1, !1);
      })), B && (n = n.add(i));
    })), this.te.forEach(((i, o) => o.setReadTime(e))), this.re.forEach(((i, o) => o.setReadTime(e)));
    const s = new ds(e, t, this.se, this.te, this.re, n);
    return this.te = at(), this.ne = js(), this.re = at(), this.ie = js(), this.se = new me(te), s;
  }
  /**
   * Adds the provided document to the internal list of document updates and
   * its document key to the given target's mapping.
   */
  // Visible for testing.
  oe(e, t) {
    const n = this.ee.get(e);
    if (!n || !this.ce(e)) return void U(br, `addDocumentToTarget received document for unknown inactive target (${e})`);
    const s = this.pe(e, t.key) ? 2 : 0;
    n.j(t.key, s), mn(this.Te(e).target) && this.Te(e).target.getPipelineFlavor() !== "exact" ? this.re = this.re.insert(t.key, t) : this.te = this.te.insert(t.key, t), this.ne = this.ne.insert(t.key, this.me(t.key).add(e)), this.ie = this.ie.insert(t.key, this.ge(t.key).add(e));
  }
  /**
   * Removes the provided document from the target mapping. If the
   * document no longer matches the target, but the document's state is still
   * known (e.g. we know that the document was deleted or we received the change
   * that caused the filter mismatch), the new document can be provided
   * to update the remote document cache.
   */
  // Visible for testing.
  ae(e, t, n) {
    const s = this.ee.get(e);
    s && this.ce(e) ? (this.pe(e, t) ? s.j(
      t,
      1
      /* ChangeType.Removed */
    ) : (
      // The document may have entered and left the target before we raised a
      // snapshot, so we can just ignore the change.
      s.H(t)
    ), this.ie = this.ie.insert(t, this.ge(t).delete(e)), this.ie = this.ie.insert(t, this.ge(t).add(e)), n && (mn(this.Te(e).target) && this.Te(e).target.getPipelineFlavor() !== "exact" ? this.re = this.re.insert(t, n) : this.te = this.te.insert(t, n))) : U(br, `removeDocumentFromTarget received document for unknown or inactive target (${e})`);
  }
  removeTarget(e) {
    this.ee.delete(e);
  }
  /**
   * Returns the current count of documents in the target. This includes both
   * the number of documents that the LocalStore considers to be part of the
   * target as well as any accumulated changes.
   */
  Pe(e) {
    const t = this.ee.get(e);
    if (!t) return 0;
    const n = t.W();
    return this.X.getRemoteKeysForTarget(e).size + n.addedDocuments.size - n.removedDocuments.size;
  }
  /**
   * Increment the number of acks needed from watch before we can consider the
   * server to be 'in-sync' with the client's active targets.
   */
  J(e) {
    let t = this.ee.get(e);
    t || (U(br, `recordPendingTargetRequest set up tracking for target ID ${e}`), t = new Vl(e), this.ee.set(e, t)), t.J();
  }
  ge(e) {
    let t = this.ie.get(e);
    return t || (t = new Te(te), this.ie = this.ie.insert(e, t)), t;
  }
  me(e) {
    let t = this.ne.get(e);
    return t || (t = new Te(te), this.ne = this.ne.insert(e, t)), t;
  }
  /**
   * Verifies that the user is still interested in this target (by calling
   * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
   * from watch.
   */
  ce(e) {
    const t = this.Te(e) !== null;
    return t || U(br, "Detected inactive target", e), t;
  }
  /**
   * Returns the TargetData for an active target (i.e. a target that the user
   * is still interested in that has no outstanding target change requests).
   */
  Te(e) {
    const t = this.ee.get(e);
    return t === void 0 || t.q ? null : this.X.ye(e);
  }
  /**
   * Resets the state of a Watch target to its initial state (e.g. sets
   * 'current' to false, clears the resume token and removes its target mapping
   * from all documents).
   */
  le(e) {
    this.ee.set(e, new Vl(e)), this.X.getRemoteKeysForTarget(e).forEach(((t) => {
      this.ae(
        e,
        t,
        /*updatedDocument=*/
        null
      );
    }));
  }
  /**
   * Returns whether the LocalStore considers the document to be part of the
   * specified target.
   */
  pe(e, t) {
    return this.X.getRemoteKeysForTarget(e).has(t);
  }
}
function js() {
  return new me(Q.comparator);
}
function Ml() {
  return new me(Q.comparator);
}
const jm = {
  asc: "ASCENDING",
  desc: "DESCENDING"
}, Jm = {
  "<": "LESS_THAN",
  "<=": "LESS_THAN_OR_EQUAL",
  ">": "GREATER_THAN",
  ">=": "GREATER_THAN_OR_EQUAL",
  "==": "EQUAL",
  "!=": "NOT_EQUAL",
  "array-contains": "ARRAY_CONTAINS",
  in: "IN",
  "not-in": "NOT_IN",
  "array-contains-any": "ARRAY_CONTAINS_ANY"
}, qm = {
  and: "AND",
  or: "OR"
};
class Km {
  constructor(e, t) {
    this.databaseId = e, this.useProto3Json = t;
  }
}
function aa(r, e) {
  return r.useProto3Json || Di(e) ? e : {
    value: e
  };
}
function jr(r, e) {
  return r.useProto3Json ? `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z` : {
    seconds: "" + e.seconds,
    nanos: e.nanoseconds
  };
}
function Na(r) {
  const e = en(r);
  return new le(e.seconds, e.nanos);
}
function Fh(r, e) {
  return r.useProto3Json ? e.toBase64() : e.toUint8Array();
}
function Io(r, e) {
  return jr(r, e.toTimestamp());
}
function qn(r) {
  return $(!!r, 49232), Z.fromTimestamp(Na(r));
}
function Fa(r, e) {
  return Ba(r, e).canonicalString();
}
function Ba(r, e) {
  const t = (function(s) {
    return new Be(["projects", s.projectId, "databases", s.database]);
  })(r).child("documents");
  return e === void 0 ? t : t.child(e);
}
function Ph(r) {
  const e = Be.fromString(r);
  return $(Gh(e), 10190, {
    key: e.toString()
  }), e;
}
function Qm(r, e) {
  return Fa(r.databaseId, e.path);
}
function wo(r, e) {
  const t = Ph(e);
  if (t.get(1) !== r.databaseId.projectId) throw new H(M.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + t.get(1) + " vs " + r.databaseId.projectId);
  if (t.get(3) !== r.databaseId.database) throw new H(M.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + t.get(3) + " vs " + r.databaseId.database);
  return new Q(xh(t));
}
function Lh(r, e) {
  return Fa(r.databaseId, e);
}
function zm(r) {
  const e = Ph(r);
  return e.length === 4 ? Be.emptyPath() : xh(e);
}
function Gl(r) {
  return new Be(["projects", r.databaseId.projectId, "databases", r.databaseId.database]).canonicalString();
}
function xh(r) {
  return $(r.length > 4 && r.get(4) === "documents", 29091, {
    key: r.toString()
  }), r.popFirst(5);
}
function $m(r, e) {
  let t;
  if ("targetChange" in e) {
    e.targetChange;
    const n = (function(c) {
      return c === "NO_CHANGE" ? 0 : c === "ADD" ? 1 : c === "REMOVE" ? 2 : c === "CURRENT" ? 3 : c === "RESET" ? 4 : X(39313, {
        state: c
      });
    })(e.targetChange.targetChangeType || "NO_CHANGE"), s = e.targetChange.targetIds || [], i = (function(c, C) {
      return c.useProto3Json ? ($(C === void 0 || typeof C == "string", 58123), Ae.fromBase64String(C || "")) : ($(C === void 0 || // Check if the value is an instance of both Buffer and Uint8Array,
      // despite the fact that Buffer extends Uint8Array. In some
      // environments, such as jsdom, the prototype chain of Buffer
      // does not indicate that it extends Uint8Array.
      C instanceof Buffer || C instanceof Uint8Array, 16193), Ae.fromUint8Array(C || new Uint8Array()));
    })(r, e.targetChange.resumeToken), o = e.targetChange.cause, B = o && (function(c) {
      const C = c.code === void 0 ? M.UNKNOWN : Rh(c.code);
      return new H(C, c.message || "");
    })(o);
    t = new Nh(n, s, i, B || null);
  } else if ("documentChange" in e) {
    e.documentChange;
    const n = e.documentChange;
    n.document, n.document.name, n.document.updateTime;
    const s = wo(r, n.document.name), i = qn(n.document.updateTime), o = n.document.createTime ? qn(n.document.createTime) : Z.min(), B = new ft({
      mapValue: {
        fields: n.document.fields
      }
    }), u = ke.newFoundDocument(s, i, o, B), c = n.targetIds || [], C = n.removedTargetIds || [];
    t = new Ws(c, C, u.key, u);
  } else if ("documentDelete" in e) {
    e.documentDelete;
    const n = e.documentDelete;
    n.document;
    const s = wo(r, n.document), i = n.readTime ? qn(n.readTime) : Z.min(), o = ke.newNoDocument(s, i), B = n.removedTargetIds || [];
    t = new Ws([], B, o.key, o);
  } else if ("documentRemove" in e) {
    e.documentRemove;
    const n = e.documentRemove;
    n.document;
    const s = wo(r, n.document), i = n.removedTargetIds || [];
    t = new Ws([], i, s, null);
  } else {
    if (!("filter" in e)) return X(11601, {
      we: e
    });
    {
      e.filter;
      const n = e.filter;
      n.targetId;
      const { count: s = 0, unchangedNames: i } = n, o = new Pm(s, i), B = n.targetId;
      t = new Sh(B, o);
    }
  }
  return t;
}
function Ym(r, e) {
  return {
    documents: [Lh(r, e.path)]
  };
}
function Wm(r, e) {
  const t = {
    structuredQuery: {}
  }, n = e.path;
  let s;
  e.collectionGroup !== null ? (s = n, t.structuredQuery.from = [{
    collectionId: e.collectionGroup,
    allDescendants: !0
  }]) : (s = n.popLast(), t.structuredQuery.from = [{
    collectionId: n.lastSegment()
  }]), t.parent = Lh(r, s);
  const i = (function(c) {
    if (c.length !== 0)
      return Mh(gt.create(
        c,
        "and"
        /* CompositeOperator.AND */
      ));
  })(e.filters);
  i && (t.structuredQuery.where = i);
  const o = (function(c) {
    if (c.length !== 0)
      return c.map(((C) => (
        // visible for testing
        (function(m) {
          return {
            field: Hn(m.field),
            direction: tE(m.dir)
          };
        })(C)
      )));
  })(e.orderBy);
  o && (t.structuredQuery.orderBy = o);
  const B = aa(r, e.limit);
  return B !== null && (t.structuredQuery.limit = B), e.startAt && (t.structuredQuery.startAt = (function(c) {
    return {
      before: c.inclusive,
      values: c.position
    };
  })(e.startAt)), e.endAt && (t.structuredQuery.endAt = (function(c) {
    return {
      before: !c.inclusive,
      values: c.position
    };
  })(e.endAt)), {
    Se: t,
    parent: s
  };
}
function Xm(r) {
  let e = zm(r.parent);
  const t = r.structuredQuery, n = t.from ? t.from.length : 0;
  let s = null;
  if (n > 0) {
    $(n === 1, 65062);
    const C = t.from[0];
    C.allDescendants ? s = C.collectionId : e = e.child(C.collectionId);
  }
  let i = [];
  t.where && (i = (function(f) {
    const m = Vh(f);
    return m instanceof gt && Dh(m) ? m.getFilters() : [m];
  })(t.where));
  let o = [];
  t.orderBy && (o = (function(f) {
    return f.map(((m) => (function(b) {
      return new hi(
        Un(b.field),
        // visible for testing
        (function(j) {
          switch (j) {
            case "ASCENDING":
              return "asc";
            case "DESCENDING":
              return "desc";
            default:
              return;
          }
        })(b.direction)
      );
    })(m)));
  })(t.orderBy));
  let B = null;
  t.limit && (B = (function(f) {
    let m;
    return m = typeof f == "object" ? f.value : f, Di(m) ? null : m;
  })(t.limit));
  let u = null;
  t.startAt && (u = (function(f) {
    const m = !!f.before, y = f.values || [];
    return new ci(y, m);
  })(t.startAt));
  let c = null;
  return t.endAt && (c = (function(f) {
    const m = !f.before, y = f.values || [];
    return new ci(y, m);
  })(t.endAt)), bm(e, s, o, i, B, "F", u, c);
}
function Zm(r, e) {
  const t = (function(s) {
    switch (s) {
      case "TargetPurposeListen":
        return null;
      case "TargetPurposeExistenceFilterMismatch":
        return "existence-filter-mismatch";
      case "TargetPurposeExistenceFilterMismatchBloom":
        return "existence-filter-mismatch-bloom";
      case "TargetPurposeLimboResolution":
        return "limbo-document";
      default:
        return X(28987, {
          purpose: s
        });
    }
  })(e.purpose);
  return t == null ? null : {
    "goog-listen-tags": t
  };
}
function eE(r, e) {
  return {
    structuredPipeline: {
      pipeline: {
        stages: e.stages.map(((t) => t._toProto(r)))
      }
    }
  };
}
function Vh(r) {
  return r.unaryFilter !== void 0 ? (function(t) {
    switch (t.unaryFilter.op) {
      case "IS_NAN":
        const n = Un(t.unaryFilter.field);
        return ye.create(n, "==", {
          doubleValue: NaN
        });
      case "IS_NULL":
        const s = Un(t.unaryFilter.field);
        return ye.create(s, "==", {
          nullValue: "NULL_VALUE"
        });
      case "IS_NOT_NAN":
        const i = Un(t.unaryFilter.field);
        return ye.create(i, "!=", {
          doubleValue: NaN
        });
      case "IS_NOT_NULL":
        const o = Un(t.unaryFilter.field);
        return ye.create(o, "!=", {
          nullValue: "NULL_VALUE"
        });
      case "OPERATOR_UNSPECIFIED":
        return X(61313);
      default:
        return X(60726);
    }
  })(r) : r.fieldFilter !== void 0 ? (function(t) {
    return ye.create(Un(t.fieldFilter.field), (function(s) {
      switch (s) {
        case "EQUAL":
          return "==";
        case "NOT_EQUAL":
          return "!=";
        case "GREATER_THAN":
          return ">";
        case "GREATER_THAN_OR_EQUAL":
          return ">=";
        case "LESS_THAN":
          return "<";
        case "LESS_THAN_OR_EQUAL":
          return "<=";
        case "ARRAY_CONTAINS":
          return "array-contains";
        case "IN":
          return "in";
        case "NOT_IN":
          return "not-in";
        case "ARRAY_CONTAINS_ANY":
          return "array-contains-any";
        case "OPERATOR_UNSPECIFIED":
          return X(58110);
        default:
          return X(50506);
      }
    })(t.fieldFilter.op), t.fieldFilter.value);
  })(r) : r.compositeFilter !== void 0 ? (function(t) {
    return gt.create(t.compositeFilter.filters.map(((n) => Vh(n))), (function(s) {
      switch (s) {
        case "AND":
          return "and";
        case "OR":
          return "or";
        default:
          return X(1026);
      }
    })(t.compositeFilter.op));
  })(r) : X(30097, {
    filter: r
  });
}
function tE(r) {
  return jm[r];
}
function nE(r) {
  return Jm[r];
}
function rE(r) {
  return qm[r];
}
function Hn(r) {
  return {
    fieldPath: r.canonicalString()
  };
}
function Un(r) {
  return ht.fromServerFormat(r.fieldPath);
}
function Mh(r) {
  return r instanceof ye ? (function(t) {
    if (t.op === "==") {
      if (et(t.value)) return {
        unaryFilter: {
          field: Hn(t.field),
          op: "IS_NAN"
        }
      };
      if (ot(t.value)) return {
        unaryFilter: {
          field: Hn(t.field),
          op: "IS_NULL"
        }
      };
    } else if (t.op === "!=") {
      if (et(t.value)) return {
        unaryFilter: {
          field: Hn(t.field),
          op: "IS_NOT_NAN"
        }
      };
      if (ot(t.value)) return {
        unaryFilter: {
          field: Hn(t.field),
          op: "IS_NOT_NULL"
        }
      };
    }
    return {
      fieldFilter: {
        field: Hn(t.field),
        op: nE(t.op),
        value: t.value
      }
    };
  })(r) : r instanceof gt ? (function(t) {
    const n = t.getFilters().map(((s) => Mh(s)));
    return n.length === 1 ? n[0] : {
      compositeFilter: {
        op: rE(t.op),
        filters: n
      }
    };
  })(r) : X(54877, {
    filter: r
  });
}
function Gh(r) {
  return r.length >= 4 && r.get(0) === "projects" && r.get(2) === "databases";
}
function kh(r) {
  return !!r && typeof r._toProto == "function" && r._protoValueType === "ProtoValue";
}
function rs(r, e) {
  const t = {
    fields: {}
  };
  return e.forEach(((n, s) => {
    if (typeof s != "string") throw new Error(`Cannot encode map with non-string key: ${s}`);
    t.fields[s] = n._toProto(r);
  })), {
    mapValue: t
  };
}
function Hh(r) {
  return {
    stringValue: r
  };
}
function Ti(r) {
  return new Km(
    r,
    /* useProto3Json= */
    !0
  );
}
class ct {
  /** @hideconstructor */
  constructor(e) {
    this._byteString = e;
  }
  /**
   * Creates a new `Bytes` object from the given Base64 string, converting it to
   * bytes.
   *
   * @param base64 - The Base64 string used to create the `Bytes` object.
   */
  static fromBase64String(e) {
    try {
      return new ct(Ae.fromBase64String(e));
    } catch (t) {
      throw new H(M.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t);
    }
  }
  /**
   * Creates a new `Bytes` object from the given Uint8Array.
   *
   * @param array - The Uint8Array used to create the `Bytes` object.
   */
  static fromUint8Array(e) {
    return new ct(Ae.fromUint8Array(e));
  }
  /**
   * Returns the underlying bytes as a Base64-encoded string.
   *
   * @returns The Base64-encoded string created from the `Bytes` object.
   */
  toBase64() {
    return this._byteString.toBase64();
  }
  /**
   * Returns the underlying bytes in a new `Uint8Array`.
   *
   * @returns The Uint8Array created from the `Bytes` object.
   */
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  /**
   * Returns a string representation of the `Bytes` object.
   *
   * @returns A string representation of the `Bytes` object.
   */
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  /**
   * Returns true if this `Bytes` object is equal to the provided one.
   *
   * @param other - The `Bytes` object to compare against.
   * @returns true if this `Bytes` object is equal to the provided one.
   */
  isEqual(e) {
    return this._byteString.isEqual(e._byteString);
  }
  /**
   * Returns a JSON-serializable representation of this `Bytes` instance.
   *
   * @returns a JSON representation of this object.
   */
  toJSON() {
    return {
      type: ct._jsonSchemaVersion,
      bytes: this.toBase64()
    };
  }
  /**
   * Builds a `Bytes` instance from a JSON object created by {@link Bytes.toJSON}.
   *
   * @param json - a JSON object represention of a `Bytes` instance
   * @returns an instance of {@link Bytes} if the JSON object could be parsed. Throws a
   * {@link FirestoreError} if an error occurs.
   */
  static fromJSON(e) {
    if (hs(e, ct._jsonSchema)) return ct.fromBase64String(e.bytes);
  }
}
ct._jsonSchemaVersion = "firestore/bytes/1.0", ct._jsonSchema = {
  type: Ie("string", ct._jsonSchemaVersion),
  bytes: Ie("string")
};
class Pa {
  /**
   * Creates a `FieldPath` from the provided field names. If more than one field
   * name is provided, the path will point to a nested field in a document.
   *
   * @param fieldNames - A list of field names.
   */
  constructor(...e) {
    for (let t = 0; t < e.length; ++t) if (e[t].length === 0) throw new H(M.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
    this._internalPath = new ht(e);
  }
  /**
   * Returns true if this `FieldPath` is equal to the provided one.
   *
   * @param other - The `FieldPath` to compare against.
   * @returns true if this `FieldPath` is equal to the provided one.
   */
  isEqual(e) {
    return this._internalPath.isEqual(e._internalPath);
  }
}
function sE() {
  return new Pa(_t);
}
class Uh {
  /**
   * @param _methodName - The public API endpoint that returns this class.
   * @hideconstructor
   */
  constructor(e) {
    this._methodName = e;
  }
}
class wt {
  /**
   * Creates a new immutable `GeoPoint` object with the provided latitude and
   * longitude values.
   * @param latitude - The latitude as number between -90 and 90.
   * @param longitude - The longitude as number between -180 and 180.
   */
  constructor(e, t) {
    if (!isFinite(e) || e < -90 || e > 90) throw new H(M.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + e);
    if (!isFinite(t) || t < -180 || t > 180) throw new H(M.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + t);
    this._lat = e, this._long = t;
  }
  /**
   * The latitude of this `GeoPoint` instance.
   */
  get latitude() {
    return this._lat;
  }
  /**
   * The longitude of this `GeoPoint` instance.
   */
  get longitude() {
    return this._long;
  }
  /**
   * Returns true if this `GeoPoint` is equal to the provided one.
   *
   * @param other - The `GeoPoint` to compare against.
   * @returns true if this `GeoPoint` is equal to the provided one.
   */
  isEqual(e) {
    return this._lat === e._lat && this._long === e._long;
  }
  /**
   * Actually private to JS consumers of our API, so this function is prefixed
   * with an underscore.
   */
  _compareTo(e) {
    return te(this._lat, e._lat) || te(this._long, e._long);
  }
  /**
   * Returns a JSON-serializable representation of this `GeoPoint` instance.
   *
   * @returns a JSON representation of this object.
   */
  toJSON() {
    return {
      latitude: this._lat,
      longitude: this._long,
      type: wt._jsonSchemaVersion
    };
  }
  /**
   * Builds a `GeoPoint` instance from a JSON object created by {@link GeoPoint.toJSON}.
   *
   * @param json - a JSON object represention of a `GeoPoint` instance
   * @returns an instance of {@link GeoPoint} if the JSON object could be parsed. Throws a
   * {@link FirestoreError} if an error occurs.
   */
  static fromJSON(e) {
    if (hs(e, wt._jsonSchema)) return new wt(e.latitude, e.longitude);
  }
}
wt._jsonSchemaVersion = "firestore/geoPoint/1.0", wt._jsonSchema = {
  type: Ie("string", wt._jsonSchemaVersion),
  latitude: Ie("number"),
  longitude: Ie("number")
};
class Ge {
  constructor(e) {
    this.uid = e;
  }
  isAuthenticated() {
    return this.uid != null;
  }
  /**
   * Returns a key representing this user, suitable for inclusion in a
   * dictionary.
   */
  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }
  isEqual(e) {
    return e.uid === this.uid;
  }
}
Ge.UNAUTHENTICATED = new Ge(null), // TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
Ge.GOOGLE_CREDENTIALS = new Ge("google-credentials-uid"), Ge.FIRST_PARTY = new Ge("first-party-uid"), Ge.MOCK_USER = new Ge("mock-user");
class Yt {
  constructor() {
    this.promise = new Promise(((e, t) => {
      this.resolve = e, this.reject = t;
    }));
  }
}
class jh {
  constructor(e, t) {
    this.user = t, this.type = "OAuth", this.headers = /* @__PURE__ */ new Map(), this.headers.set("Authorization", `Bearer ${e}`);
  }
}
class iE {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {
  }
  start(e, t) {
    e.enqueueRetryable((() => t(Ge.UNAUTHENTICATED)));
  }
  shutdown() {
  }
}
class oE {
  constructor(e) {
    this.token = e, /**
     * Stores the listener registered with setChangeListener()
     * This isn't actually necessary since the UID never changes, but we use this
     * to verify the listen contract is adhered to in tests.
     */
    this.changeListener = null;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {
  }
  start(e, t) {
    this.changeListener = t, // Fire with initial user.
    e.enqueueRetryable((() => t(this.token.user)));
  }
  shutdown() {
    this.changeListener = null;
  }
}
class aE {
  constructor(e) {
    this.De = e, /** Tracks the current User. */
    this.currentUser = Ge.UNAUTHENTICATED, /**
     * Counter used to detect if the token changed while a getToken request was
     * outstanding.
     */
    this.xe = 0, this.forceRefresh = !1, this.auth = null;
  }
  start(e, t) {
    $(this.Ce === void 0, 42304);
    let n = this.xe;
    const s = (u) => this.xe !== n ? (n = this.xe, t(u)) : Promise.resolve();
    let i = new Yt();
    this.Ce = () => {
      this.xe++, this.currentUser = this.Fe(), i.resolve(), i = new Yt(), e.enqueueRetryable((() => s(this.currentUser)));
    };
    const o = () => {
      const u = i;
      e.enqueueRetryable((async () => {
        await u.promise, await s(this.currentUser);
      }));
    }, B = (u) => {
      U("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = u, this.Ce && (this.auth.addAuthTokenListener(this.Ce), o());
    };
    this.De.onInit(((u) => B(u))), // Our users can initialize Auth right after Firestore, so we give it
    // a chance to register itself with the component framework before we
    // determine whether to start up in unauthenticated mode.
    setTimeout((() => {
      if (!this.auth) {
        const u = this.De.getImmediate({
          optional: !0
        });
        u ? B(u) : (
          // If auth is still not available, proceed with `null` user
          (U("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new Yt())
        );
      }
    }), 0), o();
  }
  getToken() {
    const e = this.xe, t = this.forceRefresh;
    return this.forceRefresh = !1, this.auth ? this.auth.getToken(t).then(((n) => (
      // Cancel the request since the token changed while the request was
      // outstanding so the response is potentially for a previous user (which
      // user, we can't be sure).
      this.xe !== e ? (U("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : n ? ($(typeof n.accessToken == "string", 31837, {
        Oe: n
      }), new jh(n.accessToken, this.currentUser)) : null
    ))) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    this.auth && this.Ce && this.auth.removeAuthTokenListener(this.Ce), this.Ce = void 0;
  }
  // Auth.getUid() can return null even with a user logged in. It is because
  // getUid() is synchronous, but the auth code populating Uid is asynchronous.
  // This method should only be called in the AuthTokenListener callback
  // to guarantee to get the actual user.
  Fe() {
    const e = this.auth && this.auth.getUid();
    return $(e === null || typeof e == "string", 2055, {
      Me: e
    }), new Ge(e);
  }
}
class BE {
  constructor(e, t, n) {
    this.Ne = e, this.Le = t, this.Be = n, this.type = "FirstParty", this.user = Ge.FIRST_PARTY, this.Ue = /* @__PURE__ */ new Map();
  }
  /**
   * Gets an authorization token, using a provided factory function, or return
   * null.
   */
  ke() {
    return this.Be ? this.Be() : null;
  }
  get headers() {
    this.Ue.set("X-Goog-AuthUser", this.Ne);
    const e = this.ke();
    return e && this.Ue.set("Authorization", e), this.Le && this.Ue.set("X-Goog-Iam-Authorization-Token", this.Le), this.Ue;
  }
}
class uE {
  constructor(e, t, n) {
    this.Ne = e, this.Le = t, this.Be = n;
  }
  getToken() {
    return Promise.resolve(new BE(this.Ne, this.Le, this.Be));
  }
  start(e, t) {
    e.enqueueRetryable((() => t(Ge.FIRST_PARTY)));
  }
  shutdown() {
  }
  invalidateToken() {
  }
}
class kl {
  constructor(e) {
    this.value = e, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), e && e.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }
}
class lE {
  constructor(e, t) {
    this.qe = t, this.forceRefresh = !1, this.appCheck = null, this.$e = null, this.Ke = null, ap(e) && e.settings.appCheckToken && (this.Ke = e.settings.appCheckToken);
  }
  start(e, t) {
    $(this.Ce === void 0, 3512);
    const n = (i) => {
      i.error != null && U("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);
      const o = i.token !== this.$e;
      return this.$e = i.token, U("FirebaseAppCheckTokenProvider", `Received ${o ? "new" : "existing"} token.`), o ? t(i.token) : Promise.resolve();
    };
    this.Ce = (i) => {
      e.enqueueRetryable((() => n(i)));
    };
    const s = (i) => {
      U("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = i, this.Ce && this.appCheck.addTokenListener(this.Ce);
    };
    this.qe.onInit(((i) => s(i))), // Our users can initialize AppCheck after Firestore, so we give it
    // a chance to register itself with the component framework.
    setTimeout((() => {
      if (!this.appCheck) {
        const i = this.qe.getImmediate({
          optional: !0
        });
        i ? s(i) : (
          // If AppCheck is still not available, proceed without it.
          U("FirebaseAppCheckTokenProvider", "AppCheck not yet detected")
        );
      }
    }), 0);
  }
  getToken() {
    if (this.Ke) return Promise.resolve(new kl(this.Ke));
    const e = this.forceRefresh;
    return this.forceRefresh = !1, this.appCheck ? this.appCheck.getToken(e).then(((t) => t ? ($(typeof t.token == "string", 44558, {
      tokenResult: t
    }), this.$e = t.token, new kl(t.token)) : null)) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = !0;
  }
  shutdown() {
    this.appCheck && this.Ce && this.appCheck.removeTokenListener(this.Ce), this.Ce = void 0;
  }
}
function Jh(r) {
  const e = {};
  return r.timeoutSeconds !== void 0 && (e.timeoutSeconds = r.timeoutSeconds), e;
}
class cE {
  Qe(e) {
  }
  shutdown() {
  }
}
const Hl = "ConnectivityMonitor";
class Ul {
  constructor() {
    this.We = () => this.Ge(), this.ze = () => this.je(), this.He = [], this.Je();
  }
  Qe(e) {
    this.He.push(e);
  }
  shutdown() {
    window.removeEventListener("online", this.We), window.removeEventListener("offline", this.ze);
  }
  Je() {
    window.addEventListener("online", this.We), window.addEventListener("offline", this.ze);
  }
  Ge() {
    U(Hl, "Network connectivity changed: AVAILABLE");
    for (const e of this.He) e(
      0
      /* NetworkStatus.AVAILABLE */
    );
  }
  je() {
    U(Hl, "Network connectivity changed: UNAVAILABLE");
    for (const e of this.He) e(
      1
      /* NetworkStatus.UNAVAILABLE */
    );
  }
  // TODO(chenbrian): Consider passing in window either into this component or
  // here for testing via FakeWindow.
  /** Checks that all used attributes of window are available. */
  static Ye() {
    return typeof window < "u" && window.addEventListener !== void 0 && window.removeEventListener !== void 0;
  }
}
let Js = null;
function ua() {
  return Js === null ? Js = (function() {
    return 268435456 + Math.round(2147483648 * Math.random());
  })() : Js++, "0x" + Js.toString(16);
}
const To = "RestConnection", hE = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery",
  RunAggregationQuery: "runAggregationQuery",
  ExecutePipeline: "executePipeline"
};
class CE {
  get Ze() {
    return !1;
  }
  constructor(e) {
    this.databaseInfo = e, this.databaseId = e.databaseId;
    const t = e.ssl ? "https" : "http", n = encodeURIComponent(this.databaseId.projectId), s = encodeURIComponent(this.databaseId.database);
    this.Xe = t + "://" + e.host, this.et = `projects/${n}/databases/${s}`, this.tt = this.databaseId.database === ii ? `project_id=${n}` : `project_id=${n}&database_id=${s}`;
  }
  nt(e, t, n, s, i) {
    const o = ua(), B = this.rt(e, t.toUriEncodedString());
    U(To, `Sending RPC '${e}' ${o}:`, B, n);
    const u = {
      "google-cloud-resource-prefix": this.et,
      "x-goog-request-params": this.tt
    };
    this.it(u, s, i);
    const { host: c } = new URL(B), C = Vc(c);
    return this.st(e, B, u, n, C).then(((f) => (U(To, `Received RPC '${e}' ${o}: `, f), f)), ((f) => {
      throw dt(To, `RPC '${e}' ${o} failed with error: `, f, "url: ", B, "request:", n), f;
    }));
  }
  _t(e, t, n, s, i, o) {
    return this.nt(e, t, n, s, i);
  }
  /**
   * Modifies the headers for a request, adding any authorization token if
   * present and any additional headers for the request.
   */
  it(e, t, n) {
    if (e["X-Goog-Api-Client"] = // SDK_VERSION is updated to different value at runtime depending on the entry point,
    // so we need to get its value when we need it in a function.
    (function() {
      return "gl-js/ fire/" + sr;
    })(), // Content-Type: text/plain will avoid preflight requests which might
    // mess with CORS and redirects by proxies. If we add custom headers
    // we will need to change this code to potentially use the $httpOverwrite
    // parameter supported by ESF to avoid triggering preflight requests.
    e["Content-Type"] = "text/plain", this.databaseInfo.appId && (e["X-Firebase-GMPID"] = this.databaseInfo.appId), t && t.headers.forEach(((s, i) => e[i] = s)), n && n.headers.forEach(((s, i) => e[i] = s)), this.databaseInfo._customHeaders) for (const s of Object.keys(this.databaseInfo._customHeaders)) e[s] = this.databaseInfo._customHeaders[s];
  }
  rt(e, t) {
    const n = hE[e];
    let s = `${this.Xe}/v1/${t}:${n}`;
    return this.databaseInfo.apiKey && (s = `${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`), s;
  }
  /**
   * Closes and cleans up any resources associated with the connection. This
   * implementation is a no-op because there are no resources associated
   * with the RestConnection that need to be cleaned up.
   */
  terminate() {
  }
}
class fE {
  constructor(e) {
    this.ot = e.ot, this.ut = e.ut;
  }
  ct(e) {
    this.lt = e;
  }
  Et(e) {
    this.ht = e;
  }
  Tt(e) {
    this.Pt = e;
  }
  onMessage(e) {
    this.It = e;
  }
  close() {
    this.ut();
  }
  send(e) {
    this.ot(e);
  }
  Rt() {
    this.lt();
  }
  At() {
    this.ht();
  }
  Vt(e) {
    this.Pt(e);
  }
  dt(e) {
    this.It(e);
  }
}
const Me = "WebChannelConnection", Or = (r, e, t) => {
  r.listen(e, ((n) => {
    try {
      t(n);
    } catch (s) {
      setTimeout((() => {
        throw s;
      }), 0);
    }
  }));
};
class Kn extends CE {
  constructor(e) {
    super(e), /** A collection of open WebChannel instances */
    this.ft = [], this.forceLongPolling = e.forceLongPolling, this.autoDetectLongPolling = e.autoDetectLongPolling, this.useFetchStreams = e.useFetchStreams, this.longPollingOptions = e.longPollingOptions;
  }
  /**
   * Initialize STAT_EVENT listener once. Subsequent calls are a no-op.
   * getStatEventTarget() returns the same target every time.
   */
  static gt() {
    if (!Kn.yt) {
      const e = zc();
      Or(e, Qc.STAT_EVENT, ((t) => {
        t.stat === Ko.PROXY ? U(Me, "STAT_EVENT: detected buffering proxy") : t.stat === Ko.NOPROXY && U(Me, "STAT_EVENT: detected no buffering proxy");
      })), Kn.yt = !0;
    }
  }
  st(e, t, n, s, i) {
    const o = ua();
    return new Promise(((B, u) => {
      const c = new qc();
      c.setWithCredentials(!0), c.listenOnce(Kc.COMPLETE, (() => {
        try {
          switch (c.getLastErrorCode()) {
            case zs.NO_ERROR:
              const f = c.getResponseJson();
              U(Me, `XHR for RPC '${e}' ${o} received:`, JSON.stringify(f)), B(f);
              break;
            case zs.TIMEOUT:
              U(Me, `RPC '${e}' ${o} timed out`), u(new H(M.DEADLINE_EXCEEDED, "Request time out"));
              break;
            case zs.HTTP_ERROR:
              const m = c.getStatus();
              if (U(Me, `RPC '${e}' ${o} failed with status:`, m, "response text:", c.getResponseText()), m > 0) {
                let y = c.getResponseJson();
                Array.isArray(y) && (y = y[0]);
                const b = y?.error;
                if (b && b.status && b.message) {
                  const V = (function(z) {
                    const ue = z.toLowerCase().replace(/_/g, "-");
                    return Object.values(M).indexOf(ue) >= 0 ? ue : M.UNKNOWN;
                  })(b.status);
                  u(new H(V, b.message));
                } else u(new H(M.UNKNOWN, "Server responded with status " + c.getStatus()));
              } else
                u(new H(M.UNAVAILABLE, "Connection failed."));
              break;
            default:
              X(9055, {
                wt: e,
                streamId: o,
                bt: c.getLastErrorCode(),
                St: c.getLastError()
              });
          }
        } finally {
          U(Me, `RPC '${e}' ${o} completed.`);
        }
      }));
      const C = JSON.stringify(s);
      U(Me, `RPC '${e}' ${o} sending request:`, s), c.send(t, "POST", C, n, 15);
    }));
  }
  vt(e, t, n) {
    const s = ua(), i = [this.Xe, "/", "google.firestore.v1.Firestore", "/", e, "/channel"], o = this.createWebChannelTransport(), B = {
      // Required for backend stickiness, routing behavior is based on this
      // parameter.
      httpSessionIdParam: "gsessionid",
      initMessageHeaders: {},
      messageUrlParams: {
        // This param is used to improve routing and project isolation by the
        // backend and must be included in every request.
        database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
      },
      sendRawJson: !0,
      supportsCrossDomainXhr: !0,
      internalChannelParams: {
        // Override the default timeout (randomized between 10-20 seconds) since
        // a large write batch on a slow internet connection may take a long
        // time to send to the backend. Rather than have WebChannel impose a
        // tight timeout which could lead to infinite timeouts and retries, we
        // set it very large (5-10 minutes) and rely on the browser's builtin
        // timeouts to kick in if the request isn't working.
        forwardChannelRequestTimeoutMs: 6e5
      },
      forceLongPolling: this.forceLongPolling,
      detectBufferingProxy: this.autoDetectLongPolling
    }, u = this.longPollingOptions.timeoutSeconds;
    u !== void 0 && (B.longPollingTimeout = Math.round(1e3 * u)), this.useFetchStreams && (B.useFetchStreams = !0), this.it(B.initMessageHeaders, t, n), // Sending the custom headers we just added to request.initMessageHeaders
    // (Authorization, etc.) will trigger the browser to make a CORS preflight
    // request because the XHR will no longer meet the criteria for a "simple"
    // CORS request:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
    // Therefore to avoid the CORS preflight request (an extra network
    // roundtrip), we use the encodeInitMessageHeaders option to specify that
    // the headers should instead be encoded in the request's POST payload,
    // which is recognized by the webchannel backend.
    B.encodeInitMessageHeaders = !0;
    const c = i.join("");
    U(Me, `Creating RPC '${e}' stream ${s}: ${c}`, B);
    const C = o.createWebChannel(c, B);
    this.Dt(C);
    let f = !1, m = !1;
    const y = new fE({
      ot: (b) => {
        m ? U(Me, `Not sending because RPC '${e}' stream ${s} is closed:`, b) : (f || (U(Me, `Opening RPC '${e}' stream ${s} transport.`), C.open(), f = !0), U(Me, `RPC '${e}' stream ${s} sending:`, b), C.send(b));
      },
      ut: () => C.close()
    });
    return Or(C, Sr.EventType.OPEN, (() => {
      m || (U(Me, `RPC '${e}' stream ${s} transport opened.`), y.Rt());
    })), Or(C, Sr.EventType.CLOSE, (() => {
      m || (m = !0, U(Me, `RPC '${e}' stream ${s} transport closed`), y.Vt(), this.xt(C));
    })), Or(C, Sr.EventType.ERROR, ((b) => {
      m || (m = !0, dt(Me, `RPC '${e}' stream ${s} transport errored. Name:`, b.name, "Message:", b.message), y.Vt(new H(M.UNAVAILABLE, "The operation could not be completed")));
    })), Or(C, Sr.EventType.MESSAGE, ((b) => {
      if (!m) {
        const V = b.data[0];
        $(!!V, 16349);
        const j = V, z = j?.error || j[0]?.error;
        if (z) {
          U(Me, `RPC '${e}' stream ${s} received error:`, z);
          const ue = z.status;
          let Ee = (
            /**
            * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
            *
            * @returns The Code equivalent to the given status string or undefined if
            *     there is no match.
            */
            (function(de) {
              const A = _e[de];
              if (A !== void 0) return Rh(A);
            })(ue)
          ), De = z.message;
          ue === "NOT_FOUND" && De.includes("database") && De.includes("does not exist") && De.includes(this.databaseId.database) && dt(`Database '${this.databaseId.database}' not found. Please check your project configuration.`), Ee === void 0 && (Ee = M.INTERNAL, De = "Unknown error status: " + ue + " with message " + z.message), // Mark closed so no further events are propagated
          m = !0, y.Vt(new H(Ee, De)), C.close();
        } else U(Me, `RPC '${e}' stream ${s} received:`, V), y.dt(V);
      }
    })), // Ensure that event listeners are configured for STAT_EVENTs.
    Kn.gt(), setTimeout((() => {
      y.At();
    }), 0), y;
  }
  /**
   * Closes and cleans up any resources associated with the connection.
   */
  terminate() {
    this.ft.forEach(((e) => e.close())), this.ft = [];
  }
  /**
   * Add a WebChannel instance to the collection of open instances.
   * @param webChannel
   */
  Dt(e) {
    this.ft.push(e);
  }
  /**
   * Remove a WebChannel instance from the collection of open instances.
   * @param webChannel
   */
  xt(e) {
    this.ft = this.ft.filter(((t) => t === e));
  }
  /**
   * Modifies the headers for a request, adding the api key if present,
   * and then calling super.modifyHeadersForRequest
   */
  it(e, t, n) {
    super.it(e, t, n), // For web channel streams, we want to send the api key in the headers.
    this.databaseInfo.apiKey && (e["x-goog-api-key"] = this.databaseInfo.apiKey);
  }
  /**
   * Wrapped for mocking.
   * @protected
   */
  createWebChannelTransport() {
    return $c();
  }
}
function dE(r) {
  return new Kn(r);
}
Kn.yt = !1;
class qh {
  constructor(e, t, n = 1e3, s = 1.5, i = 6e4) {
    this.Ct = e, this.timerId = t, this.Ft = n, this.Ot = s, this.Mt = i, this.Nt = 0, this.Lt = null, /** The last backoff attempt, as epoch milliseconds. */
    this.Bt = Date.now(), this.reset();
  }
  /**
   * Resets the backoff delay.
   *
   * The very next backoffAndWait() will have no delay. If it is called again
   * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
   * subsequent ones will increase according to the backoffFactor.
   */
  reset() {
    this.Nt = 0;
  }
  /**
   * Resets the backoff delay to the maximum delay (e.g. for use after a
   * RESOURCE_EXHAUSTED error).
   */
  Ut() {
    this.Nt = this.Mt;
  }
  /**
   * Returns a promise that resolves after currentDelayMs, and increases the
   * delay for any subsequent attempts. If there was a pending backoff operation
   * already, it will be canceled.
   */
  kt(e) {
    this.cancel();
    const t = Math.floor(this.Nt + this.qt()), n = Math.max(0, Date.now() - this.Bt), s = Math.max(0, t - n);
    s > 0 && U("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.Nt} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`), this.Lt = this.Ct.enqueueAfterDelay(this.timerId, s, (() => (this.Bt = Date.now(), e()))), // Apply backoff factor to determine next delay and ensure it is within
    // bounds.
    this.Nt *= this.Ot, this.Nt < this.Ft && (this.Nt = this.Ft), this.Nt > this.Mt && (this.Nt = this.Mt);
  }
  $t() {
    this.Lt !== null && (this.Lt.skipDelay(), this.Lt = null);
  }
  cancel() {
    this.Lt !== null && (this.Lt.cancel(), this.Lt = null);
  }
  /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */
  qt() {
    return (Math.random() - 0.5) * this.Nt;
  }
}
const jl = "PersistentStream";
class gE {
  constructor(e, t, n, s, i, o, B, u) {
    this.Ct = e, this.Kt = n, this.Qt = s, this.connection = i, this.authCredentialsProvider = o, this.appCheckCredentialsProvider = B, this.listener = u, this.state = 0, /**
     * A close count that's incremented every time the stream is closed; used by
     * getCloseGuardedDispatcher() to invalidate callbacks that happen after
     * close.
     */
    this.Wt = 0, this.Gt = null, this.zt = null, this.stream = null, /**
     * Count of response messages received.
     */
    this.jt = 0, this.Ht = new qh(e, t);
  }
  /**
   * Returns true if start() has been called and no error has occurred. True
   * indicates the stream is open or in the process of opening (which
   * encompasses respecting backoff, getting auth tokens, and starting the
   * actual RPC). Use isOpen() to determine if the stream is open and ready for
   * outbound requests.
   */
  Jt() {
    return this.state === 1 || this.state === 5 || this.Yt();
  }
  /**
   * Returns true if the underlying RPC is open (the onOpen() listener has been
   * called) and the stream is ready for outbound requests.
   */
  Yt() {
    return this.state === 2 || this.state === 3;
  }
  /**
   * Starts the RPC. Only allowed if isStarted() returns false. The stream is
   * not immediately ready for use: onOpen() will be invoked when the RPC is
   * ready for outbound requests, at which point isOpen() will return true.
   *
   * When start returns, isStarted() will return true.
   */
  start() {
    this.jt = 0, this.state !== 4 ? this.auth() : this.Zt();
  }
  /**
   * Stops the RPC. This call is idempotent and allowed regardless of the
   * current isStarted() state.
   *
   * When stop returns, isStarted() and isOpen() will both return false.
   */
  async stop() {
    this.Jt() && await this.close(
      0
      /* PersistentStreamState.Initial */
    );
  }
  /**
   * After an error the stream will usually back off on the next attempt to
   * start it. If the error warrants an immediate restart of the stream, the
   * sender can use this to indicate that the receiver should not back off.
   *
   * Each error will call the onClose() listener. That function can decide to
   * inhibit backoff if required.
   */
  Xt() {
    this.state = 0, this.Ht.reset();
  }
  /**
   * Marks this stream as idle. If no further actions are performed on the
   * stream for one minute, the stream will automatically close itself and
   * notify the stream's onClose() handler with Status.OK. The stream will then
   * be in a !isStarted() state, requiring the caller to start the stream again
   * before further use.
   *
   * Only streams that are in state 'Open' can be marked idle, as all other
   * states imply pending network operations.
   */
  en() {
    this.Yt() && this.Gt === null && (this.Gt = this.Ct.enqueueAfterDelay(this.Kt, 6e4, (() => this.tn())));
  }
  /** Sends a message to the underlying stream. */
  nn(e) {
    this.rn(), this.stream.send(e);
  }
  /** Called by the idle timer when the stream should close due to inactivity. */
  async tn() {
    if (this.Yt())
      return this.close(
        0
        /* PersistentStreamState.Initial */
      );
  }
  /** Marks the stream as active again. */
  rn() {
    this.Gt && (this.Gt.cancel(), this.Gt = null);
  }
  /** Cancels the health check delayed operation. */
  sn() {
    this.zt && (this.zt.cancel(), this.zt = null);
  }
  /**
   * Closes the stream and cleans up as necessary:
   *
   * * closes the underlying GRPC stream;
   * * calls the onClose handler with the given 'error';
   * * sets internal stream state to 'finalState';
   * * adjusts the backoff timer based on the error
   *
   * A new stream can be opened by calling start().
   *
   * @param finalState - the intended state of the stream after closing.
   * @param error - the error the connection was closed with.
   */
  async close(e, t) {
    this.rn(), this.sn(), this.Ht.cancel(), // Invalidates any stream-related callbacks (e.g. from auth or the
    // underlying stream), guaranteeing they won't execute.
    this.Wt++, e !== 4 ? (
      // If this is an intentional close ensure we don't delay our next connection attempt.
      this.Ht.reset()
    ) : t && t.code === M.RESOURCE_EXHAUSTED ? (
      // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
      (Nt(t.toString()), Nt("Using maximum backoff delay to prevent overloading the backend."), this.Ht.Ut())
    ) : t && t.code === M.UNAUTHENTICATED && this.state !== 3 && // "unauthenticated" error means the token was rejected. This should rarely
    // happen since both Auth and AppCheck ensure a sufficient TTL when we
    // request a token. If a user manually resets their system clock this can
    // fail, however. In this case, we should get a Code.UNAUTHENTICATED error
    // before we received the first message and we need to invalidate the token
    // to ensure that we fetch a new token.
    (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), // Clean up the underlying stream because we are no longer interested in events.
    this.stream !== null && (this._n(), this.stream.close(), this.stream = null), // This state must be assigned before calling onClose() to allow the callback to
    // inhibit backoff or otherwise manipulate the state in its non-started state.
    this.state = e, // Notify the listener that the stream closed.
    await this.listener.Tt(t);
  }
  /**
   * Can be overridden to perform additional cleanup before the stream is closed.
   * Calling super.tearDown() is not required.
   */
  _n() {
  }
  auth() {
    this.state = 1;
    const e = this.an(this.Wt), t = this.Wt;
    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then((([n, s]) => {
      this.Wt === t && // Normally we'd have to schedule the callback on the AsyncQueue.
      // However, the following calls are safe to be called outside the
      // AsyncQueue since they don't chain asynchronous calls
      this.un(n, s);
    }), ((n) => {
      e((() => {
        const s = new H(M.UNKNOWN, "Fetching auth token failed: " + n.message);
        return this.cn(s);
      }));
    }));
  }
  un(e, t) {
    const n = this.an(this.Wt);
    this.stream = this.En(e, t), this.stream.ct((() => {
      n((() => this.listener.ct()));
    })), this.stream.Et((() => {
      n((() => (this.state = 2, this.zt = this.Ct.enqueueAfterDelay(this.Qt, 1e4, (() => (this.Yt() && (this.state = 3), Promise.resolve()))), this.listener.Et())));
    })), this.stream.Tt(((s) => {
      n((() => this.cn(s)));
    })), this.stream.onMessage(((s) => {
      n((() => ++this.jt == 1 ? this.hn(s) : this.onNext(s)));
    }));
  }
  Zt() {
    this.state = 5, this.Ht.kt((async () => {
      this.state = 0, this.start();
    }));
  }
  // Visible for tests
  cn(e) {
    return U(jl, `close with error: ${e}`), this.stream = null, this.close(4, e);
  }
  /**
   * Returns a "dispatcher" function that dispatches operations onto the
   * AsyncQueue but only runs them if closeCount remains unchanged. This allows
   * us to turn auth / stream callbacks into no-ops if the stream is closed /
   * re-opened, etc.
   */
  an(e) {
    return (t) => {
      this.Ct.enqueueAndForget((() => this.Wt === e ? t() : (U(jl, "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve())));
    };
  }
}
class pE extends gE {
  constructor(e, t, n, s, i, o) {
    super(e, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", t, n, s, o), this.serializer = i;
  }
  En(e, t) {
    return this.connection.vt("Listen", e, t);
  }
  hn(e) {
    return this.onNext(e);
  }
  onNext(e) {
    this.Ht.reset();
    const t = $m(this.serializer, e), n = (function(i) {
      if (!("targetChange" in i)) return Z.min();
      const o = i.targetChange;
      return o.targetIds && o.targetIds.length ? Z.min() : o.readTime ? qn(o.readTime) : Z.min();
    })(e);
    return this.listener.Tn(t, n);
  }
  /**
   * Registers interest in the results of the given target. If the target
   * includes a resumeToken it will be included in the request. Results that
   * affect the target will be streamed back as WatchChange messages that
   * reference the targetId.
   */
  Pn(e) {
    const t = {};
    t.database = Gl(this.serializer), t.addTarget = (function(i, o) {
      let B;
      const u = o.target;
      if (B = mn(u) ? {
        pipelineQuery: eE(i, u)
      } : Ah(u) ? {
        documents: Ym(i, u)
      } : {
        query: Wm(i, u).Se
      }, B.targetId = o.targetId, o.resumeToken.approximateByteSize() > 0) {
        B.resumeToken = Fh(i, o.resumeToken);
        const c = aa(i, o.expectedCount);
        c !== null && (B.expectedCount = c);
      } else if (o.snapshotVersion.compareTo(Z.min()) > 0) {
        B.readTime = jr(i, o.snapshotVersion.toTimestamp());
        const c = aa(i, o.expectedCount);
        c !== null && (B.expectedCount = c);
      }
      return B;
    })(this.serializer, e);
    const n = Zm(this.serializer, e);
    n && (t.labels = n), this.nn(t);
  }
  /**
   * Unregisters interest in the results of the target associated with the
   * given targetId.
   */
  In(e) {
    const t = {};
    t.database = Gl(this.serializer), t.removeTarget = e, this.nn(t);
  }
}
class mE {
}
class EE extends mE {
  constructor(e, t, n, s) {
    super(), this.authCredentials = e, this.appCheckCredentials = t, this.connection = n, this.serializer = s, this.mn = !1;
  }
  pn() {
    if (this.mn) throw new H(M.FAILED_PRECONDITION, "The client has already been terminated.");
  }
  /** Invokes the provided RPC with auth and AppCheck tokens. */
  nt(e, t, n, s) {
    return this.pn(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([i, o]) => this.connection.nt(e, Ba(t, n), s, i, o))).catch(((i) => {
      throw i.name === "FirebaseError" ? (i.code === M.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), i) : new H(M.UNKNOWN, i.toString());
    }));
  }
  /** Invokes the provided RPC with streamed results with auth and AppCheck tokens. */
  _t(e, t, n, s, i) {
    return this.pn(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then((([o, B]) => this.connection._t(e, Ba(t, n), s, o, B, i))).catch(((o) => {
      throw o.name === "FirebaseError" ? (o.code === M.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), o) : new H(M.UNKNOWN, o.toString());
    }));
  }
  terminate() {
    this.mn = !0, this.connection.terminate();
  }
}
function DE(r, e, t, n) {
  return new EE(r, e, t, n);
}
const _E = "ComponentProvider", Jl = /* @__PURE__ */ new Map();
function yE(r, e, t, n, s) {
  return new rm(r, e, t, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling, Jh(s.experimentalLongPollingOptions), s.useFetchStreams, s.isUsingEmulator, n, s._customHeaders, s.grpcFlowControlWindow);
}
const ql = {
  didRun: !1,
  sequenceNumbersCollected: 0,
  targetsRemoved: 0,
  documentsRemoved: 0
}, Kh = 41943040;
class Ye {
  static withCacheSize(e) {
    return new Ye(e, Ye.DEFAULT_COLLECTION_PERCENTILE, Ye.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);
  }
  constructor(e, t, n) {
    this.cacheSizeCollectionThreshold = e, this.percentileToCollect = t, this.maximumSequenceNumbersToCollect = n;
  }
}
Ye.DEFAULT_COLLECTION_PERCENTILE = 10, Ye.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3, Ye.DEFAULT = new Ye(Kh, Ye.DEFAULT_COLLECTION_PERCENTILE, Ye.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT), Ye.DISABLED = new Ye(-1, 0, 0);
class Ai {
  constructor(e, t) {
    this.previousValue = e, t && (t.sequenceNumberHandler = (n) => this.gn(n), this.yn = (n) => t.writeSequenceNumber(n));
  }
  gn(e) {
    return this.previousValue = Math.max(e, this.previousValue), this.previousValue;
  }
  next() {
    const e = ++this.previousValue;
    return this.yn && this.yn(e), e;
  }
}
Ai.wn = -1;
const IE = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class wE {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(e) {
    this.onCommittedListeners.push(e);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach(((e) => e()));
  }
}
async function vi(r) {
  if (r.code !== M.FAILED_PRECONDITION || r.message !== IE) throw r;
  U("LocalStore", "Unexpectedly lost primary lease");
}
class L {
  constructor(e) {
    this.nextCallback = null, this.catchCallback = null, // When the operation resolves, we'll set result or error and mark isDone.
    this.result = void 0, this.error = void 0, this.isDone = !1, // Set to true when .then() or .catch() are called and prevents additional
    // chaining.
    this.callbackAttached = !1, e(((t) => {
      this.isDone = !0, this.result = t, this.nextCallback && // value should be defined unless T is Void, but we can't express
      // that in the type system.
      this.nextCallback(t);
    }), ((t) => {
      this.isDone = !0, this.error = t, this.catchCallback && this.catchCallback(t);
    }));
  }
  catch(e) {
    return this.next(void 0, e);
  }
  next(e, t) {
    return this.callbackAttached && X(59440), this.callbackAttached = !0, this.isDone ? this.error ? this.wrapFailure(t, this.error) : this.wrapSuccess(e, this.result) : new L(((n, s) => {
      this.nextCallback = (i) => {
        this.wrapSuccess(e, i).next(n, s);
      }, this.catchCallback = (i) => {
        this.wrapFailure(t, i).next(n, s);
      };
    }));
  }
  toPromise() {
    return new Promise(((e, t) => {
      this.next(e, t);
    }));
  }
  wrapUserFunction(e) {
    try {
      const t = e();
      return t instanceof L ? t : L.resolve(t);
    } catch (t) {
      return L.reject(t);
    }
  }
  wrapSuccess(e, t) {
    return e ? this.wrapUserFunction((() => e(t))) : L.resolve(t);
  }
  wrapFailure(e, t) {
    return e ? this.wrapUserFunction((() => e(t))) : L.reject(t);
  }
  static resolve(e) {
    return new L(((t, n) => {
      t(e);
    }));
  }
  static reject(e) {
    return new L(((t, n) => {
      n(e);
    }));
  }
  static waitFor(e) {
    return new L(((t, n) => {
      let s = 0, i = 0, o = !1;
      e.forEach(((B) => {
        ++s, B.next((() => {
          ++i, o && i === s && t();
        }), ((u) => n(u)));
      })), o = !0, i === s && t();
    }));
  }
  /**
   * Given an array of predicate functions that asynchronously evaluate to a
   * boolean, implements a short-circuiting `or` between the results. Predicates
   * will be evaluated until one of them returns `true`, then stop. The final
   * result will be whether any of them returned `true`.
   */
  static or(e) {
    let t = L.resolve(!1);
    for (const n of e) t = t.next(((s) => s ? L.resolve(s) : n()));
    return t;
  }
  static forEach(e, t) {
    const n = [];
    return e.forEach(((s, i) => {
      n.push(t.call(this, s, i));
    })), this.waitFor(n);
  }
  /**
   * Concurrently map all array elements through asynchronous function.
   */
  static mapArray(e, t) {
    return new L(((n, s) => {
      const i = e.length, o = new Array(i);
      let B = 0;
      for (let u = 0; u < i; u++) {
        const c = u;
        t(e[c]).next(((C) => {
          o[c] = C, ++B, B === i && n(o);
        }), ((C) => s(C)));
      }
    }));
  }
  /**
   * An alternative to recursive PersistencePromise calls, that avoids
   * potential memory problems from unbounded chains of promises.
   *
   * The `action` will be called repeatedly while `condition` is true.
   */
  static doWhile(e, t) {
    return new L(((n, s) => {
      const i = () => {
        e() === !0 ? t().next((() => {
          i();
        }), s) : n();
      };
      i();
    }));
  }
}
function TE(r) {
  const e = r.match(/Android ([\d.]+)/i), t = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
  return Number(t);
}
function or(r) {
  return r.name === "IndexedDbTransactionError";
}
const Kl = "LruGarbageCollector", AE = 1048576;
function Ql([r, e], [t, n]) {
  const s = te(r, t);
  return s === 0 ? te(e, n) : s;
}
class vE {
  constructor(e) {
    this.Yn = e, this.buffer = new Te(Ql), this.Zn = 0;
  }
  Xn() {
    return ++this.Zn;
  }
  er(e) {
    const t = [e, this.Xn()];
    if (this.buffer.size < this.Yn) this.buffer = this.buffer.add(t);
    else {
      const n = this.buffer.last();
      Ql(t, n) < 0 && (this.buffer = this.buffer.delete(n).add(t));
    }
  }
  get maxValue() {
    return this.buffer.last()[0];
  }
}
class RE {
  constructor(e, t, n) {
    this.garbageCollector = e, this.asyncQueue = t, this.localStore = n, this.tr = null;
  }
  start() {
    this.garbageCollector.params.cacheSizeCollectionThreshold !== -1 && this.nr(6e4);
  }
  stop() {
    this.tr && (this.tr.cancel(), this.tr = null);
  }
  get started() {
    return this.tr !== null;
  }
  nr(e) {
    U(Kl, `Garbage collection scheduled in ${e}ms`), this.tr = this.asyncQueue.enqueueAfterDelay("lru_garbage_collection", e, (async () => {
      this.tr = null;
      try {
        await this.localStore.collectGarbage(this.garbageCollector);
      } catch (t) {
        or(t) ? U(Kl, "Ignoring IndexedDB error during garbage collection: ", t) : await vi(t);
      }
      await this.nr(3e5);
    }));
  }
}
class bE {
  constructor(e, t) {
    this.rr = e, this.params = t;
  }
  calculateTargetCount(e, t) {
    return this.rr.ir(e).next(((n) => Math.floor(t / 100 * n)));
  }
  nthSequenceNumber(e, t) {
    if (t === 0) return L.resolve(Ai.wn);
    const n = new vE(t);
    return this.rr.forEachTarget(e, ((s) => n.er(s.sequenceNumber))).next((() => this.rr.sr(e, ((s) => n.er(s))))).next((() => n.maxValue));
  }
  removeTargets(e, t, n) {
    return this.rr.removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    return this.rr.removeOrphanedDocuments(e, t);
  }
  collect(e, t) {
    return this.params.cacheSizeCollectionThreshold === -1 ? (U("LruGarbageCollector", "Garbage collection skipped; disabled"), L.resolve(ql)) : this.getCacheSize(e).next(((n) => n < this.params.cacheSizeCollectionThreshold ? (U("LruGarbageCollector", `Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`), ql) : this._r(e, t)));
  }
  getCacheSize(e) {
    return this.rr.getCacheSize(e);
  }
  _r(e, t) {
    let n, s, i, o, B, u, c;
    const C = Date.now();
    return this.calculateTargetCount(e, this.params.percentileToCollect).next(((f) => (
      // Cap at the configured max
      (f > this.params.maximumSequenceNumbersToCollect ? (U("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`), s = this.params.maximumSequenceNumbersToCollect) : s = f, o = Date.now(), this.nthSequenceNumber(e, s))
    ))).next(((f) => (n = f, B = Date.now(), this.removeTargets(e, n, t)))).next(((f) => (i = f, u = Date.now(), this.removeOrphanedDocuments(e, n)))).next(((f) => (c = Date.now(), Mn() <= ie.DEBUG && U("LruGarbageCollector", `LRU Garbage Collection
	Counted targets in ${o - C}ms
	Determined least recently used ${s} in ` + (B - o) + `ms
	Removed ${i} targets in ` + (u - B) + `ms
	Removed ${f} documents in ` + (c - u) + `ms
Total Duration: ${c - C}ms`), L.resolve({
      didRun: !0,
      sequenceNumbersCollected: s,
      targetsRemoved: i,
      documentsRemoved: f
    }))));
  }
}
function OE(r, e) {
  return new bE(r, e);
}
const Qh = "firestore.googleapis.com", zl = !0;
class $l {
  constructor(e) {
    if (e.host === void 0) {
      if (e.ssl !== void 0) throw new H(M.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      this.host = Qh, this.ssl = zl;
    } else this.host = e.host, this.ssl = e.ssl ?? zl;
    if (this.isUsingEmulator = e.emulatorOptions !== void 0, this.credentials = e.credentials, this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties, this.localCache = e.localCache, e._customHeaders && (this._customHeaders = {
      ...e._customHeaders
    }), e.cacheSizeBytes === void 0) this.cacheSizeBytes = Kh;
    else {
      if (e.cacheSizeBytes !== -1 && e.cacheSizeBytes < AE) throw new H(M.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = e.cacheSizeBytes;
    }
    if (tm("experimentalForceLongPolling", e.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", e.experimentalAutoDetectLongPolling), this.experimentalForceLongPolling = !!e.experimentalForceLongPolling, this.experimentalForceLongPolling ? this.experimentalAutoDetectLongPolling = !1 : e.experimentalAutoDetectLongPolling === void 0 ? this.experimentalAutoDetectLongPolling = !0 : (
      // For backwards compatibility, coerce the value to boolean even though
      // the TypeScript compiler has narrowed the type to boolean already.
      // noinspection PointlessBooleanExpressionJS
      this.experimentalAutoDetectLongPolling = !!e.experimentalAutoDetectLongPolling
    ), this.experimentalLongPollingOptions = Jh(e.experimentalLongPollingOptions ?? {}), (function(n) {
      if (n.timeoutSeconds !== void 0) {
        if (isNaN(n.timeoutSeconds)) throw new H(M.INVALID_ARGUMENT, `invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);
        if (n.timeoutSeconds < 5) throw new H(M.INVALID_ARGUMENT, `invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);
        if (n.timeoutSeconds > 30) throw new H(M.INVALID_ARGUMENT, `invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`);
      }
    })(this.experimentalLongPollingOptions), this.useFetchStreams = !!e.useFetchStreams, e.grpcFlowControlWindow !== void 0) {
      if (typeof e.grpcFlowControlWindow != "number" || e.grpcFlowControlWindow <= 0 || e.grpcFlowControlWindow > 2147483647 || !Number.isInteger(e.grpcFlowControlWindow)) throw new H(M.INVALID_ARGUMENT, "grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");
      this.grpcFlowControlWindow = e.grpcFlowControlWindow;
    }
  }
  isEqual(e) {
    return this.host === e.host && this.ssl === e.ssl && this.credentials === e.credentials && this.cacheSizeBytes === e.cacheSizeBytes && this.experimentalForceLongPolling === e.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === e.experimentalAutoDetectLongPolling && /**
    * @license
    * Copyright 2023 Google LLC
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *   http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    */
    /**
    * Compares two `ExperimentalLongPollingOptions` objects for equality.
    */
    (function(n, s) {
      return n.timeoutSeconds === s.timeoutSeconds;
    })(this.experimentalLongPollingOptions, e.experimentalLongPollingOptions) && this.ignoreUndefinedProperties === e.ignoreUndefinedProperties && this.useFetchStreams === e.useFetchStreams && this.grpcFlowControlWindow === e.grpcFlowControlWindow && (function(n, s) {
      if (n === s) return !0;
      if (!n || !s) return !1;
      const i = Object.keys(n), o = Object.keys(s);
      if (i.length !== o.length) return !1;
      for (const B of i) if (n[B] !== s[B]) return !1;
      return !0;
    })(this._customHeaders, e._customHeaders);
  }
}
let Ri = class {
  /** @hideconstructor */
  constructor(e, t, n, s) {
    this._authCredentials = e, this._appCheckCredentials = t, this._databaseId = n, this._app = s, /**
     * Whether it's a Firestore or Firestore Lite instance.
     */
    this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new $l({}), this._settingsFrozen = !1, this._emulatorOptions = {}, // A task that is assigned when the terminate() is invoked and resolved when
    // all components have shut down. Otherwise, Firestore is not terminated,
    // which can mean either the FirestoreClient is in the process of starting,
    // or restarting.
    this._terminateTask = "notTerminated";
  }
  /**
   * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
   * instance.
   */
  get app() {
    if (!this._app) throw new H(M.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return this._terminateTask !== "notTerminated";
  }
  _setSettings(e) {
    if (this._settingsFrozen) throw new H(M.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    this._settings = new $l(e), this._emulatorOptions = e.emulatorOptions || {}, e.credentials !== void 0 && (this._authCredentials = (function(n) {
      if (!n) return new iE();
      switch (n.type) {
        case "firstParty":
          return new uE(n.sessionIndex || "0", n.iamToken || null, n.authTokenFactory || null);
        case "provider":
          return n.client;
        default:
          throw new H(M.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
      }
    })(e.credentials));
  }
  _getSettings() {
    return this._settings;
  }
  _getEmulatorOptions() {
    return this._emulatorOptions;
  }
  _freezeSettings() {
    return this._settingsFrozen = !0, this._settings;
  }
  _delete() {
    return this._terminateTask === "notTerminated" && (this._terminateTask = this._terminate()), this._terminateTask;
  }
  async _restart() {
    this._terminateTask === "notTerminated" ? await this._terminate() : this._terminateTask = "notTerminated";
  }
  /** Returns a JSON-serializable representation of this `Firestore` instance. */
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  /**
   * Terminates all components used by this client. Subclasses can override
   * this method to clean up their own dependencies, but must also call this
   * method.
   *
   * Only ever called once.
   */
  _terminate() {
    return (function(t) {
      const n = Jl.get(t);
      n && (U(_E, "Removing Datastore"), Jl.delete(t), n.terminate());
    })(this), Promise.resolve();
  }
};
function SE(r, e, t, n = {}) {
  r = Wr(r, Ri);
  const s = Vc(e), i = r._getSettings(), o = {
    ...i,
    emulatorOptions: r._getEmulatorOptions()
  }, B = `${e}:${t}`;
  s && ug(`https://${B}`), i.host !== Qh && i.host !== B && dt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");
  const u = {
    ...i,
    host: B,
    ssl: s,
    emulatorOptions: n
  };
  if (!ti(u, o) && (r._setSettings(u), n.mockUserToken)) {
    let c, C;
    if (typeof n.mockUserToken == "string") c = n.mockUserToken, C = Ge.MOCK_USER;
    else {
      c = tg(n.mockUserToken, r._app?.options.projectId);
      const f = n.mockUserToken.sub || n.mockUserToken.user_id;
      if (!f) throw new H(M.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      C = new Ge(f);
    }
    r._authCredentials = new oE(new jh(c, C));
  }
}
class ar {
  // This is the lite version of the Query class in the main SDK.
  /** @hideconstructor protected */
  constructor(e, t, n) {
    this.converter = t, this._query = n, /** The type of this Firestore reference. */
    this.type = "query", this.firestore = e;
  }
  withConverter(e) {
    return new ar(this.firestore, e, this._query);
  }
}
class we {
  /** @hideconstructor */
  constructor(e, t, n) {
    this.converter = t, this._key = n, /** The type of this Firestore reference. */
    this.type = "document", this.firestore = e;
  }
  get _path() {
    return this._key.path;
  }
  /**
   * The document's identifier within its collection.
   */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced document (relative
   * to the root of the database).
   */
  get path() {
    return this._key.path.canonicalString();
  }
  /**
   * The collection this `DocumentReference` belongs to.
   */
  get parent() {
    return new Wt(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(e) {
    return new we(this.firestore, e, this._key);
  }
  /**
   * Returns a JSON-serializable representation of this `DocumentReference` instance.
   *
   * @returns a JSON representation of this object.
   */
  toJSON() {
    return {
      type: we._jsonSchemaVersion,
      referencePath: this._key.toString()
    };
  }
  static fromJSON(e, t, n) {
    if (hs(t, we._jsonSchema)) return new we(e, n || null, new Q(Be.fromString(t.referencePath)));
  }
}
we._jsonSchemaVersion = "firestore/documentReference/1.0", we._jsonSchema = {
  type: Ie("string", we._jsonSchemaVersion),
  referencePath: Ie("string")
};
class Wt extends ar {
  /** @hideconstructor */
  constructor(e, t, n) {
    super(e, t, ba(n)), this._path = n, /** The type of this Firestore reference. */
    this.type = "collection";
  }
  /** The collection's identifier. */
  get id() {
    return this._query.path.lastSegment();
  }
  /**
   * A string representing the path of the referenced collection (relative
   * to the root of the database).
   */
  get path() {
    return this._query.path.canonicalString();
  }
  /**
   * A reference to the containing `DocumentReference` if this is a
   * subcollection. If this isn't a subcollection, the reference is null.
   */
  get parent() {
    const e = this._path.popLast();
    return e.isEmpty() ? null : new we(
      this.firestore,
      /* converter= */
      null,
      new Q(e)
    );
  }
  withConverter(e) {
    return new Wt(this.firestore, e, this._path);
  }
}
function NE(r, e, ...t) {
  if (r = zn(r), ih("collection", "path", e), r instanceof Ri) {
    const n = Be.fromString(e, ...t);
    return _l(n), new Wt(
      r,
      /* converter= */
      null,
      n
    );
  }
  {
    if (!(r instanceof we || r instanceof Wt)) throw new H(M.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const n = r._path.child(Be.fromString(e, ...t));
    return _l(n), new Wt(
      r.firestore,
      /* converter= */
      null,
      n
    );
  }
}
function zh(r, e, ...t) {
  if (r = zn(r), // We allow omission of 'pathString' but explicitly prohibit passing in both
  // 'undefined' and 'null'.
  arguments.length === 1 && (e = Ia.newId()), ih("doc", "path", e), r instanceof Ri) {
    const n = Be.fromString(e, ...t);
    return Dl(n), new we(
      r,
      /* converter= */
      null,
      new Q(n)
    );
  }
  {
    if (!(r instanceof we || r instanceof Wt)) throw new H(M.INVALID_ARGUMENT, "Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const n = r._path.child(Be.fromString(e, ...t));
    return Dl(n), new we(r.firestore, r instanceof Wt ? r.converter : null, new Q(n));
  }
}
class We {
  /**
   * @private
   * @internal
   */
  constructor(e) {
    this._values = (e || []).map(((t) => t));
  }
  /**
   * Returns a copy of the raw number array form of the vector.
   */
  toArray() {
    return this._values.map(((e) => e));
  }
  /**
   * Returns `true` if the two `VectorValue` values have the same raw number arrays, returns `false` otherwise.
   */
  isEqual(e) {
    return (function(n, s) {
      if (n.length !== s.length) return !1;
      for (let i = 0; i < n.length; ++i) if (n[i] !== s[i]) return !1;
      return !0;
    })(this._values, e._values);
  }
  /**
   * Returns a JSON-serializable representation of this `VectorValue` instance.
   *
   * @returns a JSON representation of this object.
   */
  toJSON() {
    return {
      type: We._jsonSchemaVersion,
      vectorValues: this._values
    };
  }
  /**
   * Builds a `VectorValue` instance from a JSON object created by {@link VectorValue.toJSON}.
   *
   * @param json - a JSON object represention of a `VectorValue` instance.
   * @returns an instance of {@link VectorValue} if the JSON object could be parsed. Throws a
   * {@link FirestoreError} if an error occurs.
   */
  static fromJSON(e) {
    if (hs(e, We._jsonSchema)) {
      if (Array.isArray(e.vectorValues) && e.vectorValues.every(((t) => typeof t == "number"))) return new We(e.vectorValues);
      throw new H(M.INVALID_ARGUMENT, "Expected 'vectorValues' field to be a number array");
    }
  }
}
We._jsonSchemaVersion = "firestore/vectorValue/1.0", We._jsonSchema = {
  type: Ie("string", We._jsonSchemaVersion),
  vectorValues: Ie("object")
};
const FE = /^__.*__$/;
function $h(r) {
  switch (r) {
    case 0:
    // fall through
    case 2:
    // fall through
    case 1:
      return !0;
    case 3:
    case 4:
      return !1;
    default:
      throw X(40011, {
        dataSource: r
      });
  }
}
class La {
  /**
   * Initializes a ParseContext with the given source and path.
   *
   * @param settings - The settings for the parser.
   * @param databaseId - The database ID of the Firestore instance.
   * @param serializer - The serializer to use to generate the Value proto.
   * @param ignoreUndefinedProperties - Whether to ignore undefined properties
   * rather than throw.
   * @param fieldTransforms - A mutable list of field transforms encountered
   * while parsing the data.
   * @param fieldMask - A mutable list of field paths encountered while parsing
   * the data.
   *
   * TODO(b/34871131): We don't support array paths right now, so path can be
   * null to indicate the context represents any location within an array (in
   * which case certain features will not work and errors will be somewhat
   * compromised).
   */
  constructor(e, t, n, s, i, o) {
    this.settings = e, this.databaseId = t, this.serializer = n, this.ignoreUndefinedProperties = s, // Minor hack: If fieldTransforms is undefined, we assume this is an
    // external call and we need to validate the entire path.
    i === void 0 && this.validatePath(), this.fieldTransforms = i || [], this.fieldMask = o || [];
  }
  get path() {
    return this.settings.path;
  }
  get dataSource() {
    return this.settings.dataSource;
  }
  /** Returns a new context with the specified settings overwritten. */
  contextWith(e) {
    return new La({
      ...this.settings,
      ...e
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }
  childContextForField(e) {
    const t = this.path?.child(e), n = this.contextWith({
      path: t,
      arrayElement: !1
    });
    return n.validatePathSegment(e), n;
  }
  childContextForFieldPath(e) {
    const t = this.path?.child(e), n = this.contextWith({
      path: t,
      arrayElement: !1
    });
    return n.validatePath(), n;
  }
  childContextForArray(e) {
    return this.contextWith({
      path: void 0,
      arrayElement: !0
    });
  }
  createError(e) {
    return Ci(e, this.settings.methodName, this.settings.hasConverter || !1, this.path, this.settings.targetDoc);
  }
  /** Returns 'true' if 'fieldPath' was traversed when creating this context. */
  contains(e) {
    return this.fieldMask.find(((t) => e.isPrefixOf(t))) !== void 0 || this.fieldTransforms.find(((t) => e.isPrefixOf(t.field))) !== void 0;
  }
  validatePath() {
    if (this.path) for (let e = 0; e < this.path.length; e++) this.validatePathSegment(this.path.get(e));
  }
  validatePathSegment(e) {
    if (e.length === 0) throw this.createError("Document fields must not be empty");
    if ($h(this.dataSource) && FE.test(e)) throw this.createError('Document fields cannot begin and end with "__"');
  }
}
class PE {
  constructor(e, t, n) {
    this.databaseId = e, this.ignoreUndefinedProperties = t, this.serializer = n || Ti(e);
  }
  /** Creates a new top-level parse context. */
  createContext(e, t, n, s = !1) {
    return new La({
      dataSource: e,
      methodName: t,
      targetDoc: n,
      path: ht.emptyPath(),
      arrayElement: !1,
      hasConverter: s
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
  }
}
function LE(r) {
  const e = r._freezeSettings(), t = Ti(r._databaseId);
  return new PE(r._databaseId, !!e.ignoreUndefinedProperties, t);
}
function xE(r, e, t, n = !1) {
  return er(t, r.createContext(n ? 4 : 3, e));
}
function er(r, e, t) {
  if (Wh(
    // Unwrap the API type from the Compat SDK. This will return the API type
    // from firestore-exp.
    r = zn(r)
  )) return ME("Unsupported field value:", e, r), VE(r, e);
  if (r instanceof Uh)
    return (function(s, i) {
      if (!$h(i.dataSource)) throw i.createError(`${s._methodName}() can only be used with update() and set()`);
      if (!i.path) throw i.createError(`${s._methodName}() is not currently supported inside arrays`);
      const o = s._toFieldTransform(i);
      o && i.fieldTransforms.push(o);
    })(r, e), null;
  if (r === void 0 && e.ignoreUndefinedProperties)
    return null;
  if (
    // If context.path is null we are inside an array and we don't support
    // field mask paths more granular than the top-level array.
    e.path && e.fieldMask.push(e.path), r instanceof Array
  ) {
    if (e.settings.arrayElement && e.dataSource !== 4) throw e.createError("Nested arrays are not supported");
    return (function(s, i) {
      const o = [];
      let B = 0;
      for (const u of s) {
        let c = er(u, i.childContextForArray(B));
        c == null && // Just include nulls in the array for fields being replaced with a
        // sentinel.
        (c = {
          nullValue: "NULL_VALUE"
        }), o.push(c), B++;
      }
      return {
        arrayValue: {
          values: o
        }
      };
    })(r, e);
  }
  return (function(s, i, o) {
    if ((s = zn(s)) === null) return {
      nullValue: "NULL_VALUE"
    };
    if (typeof s == "number") return Ta(i.serializer, s);
    if (typeof s == "boolean") return {
      booleanValue: s
    };
    if (typeof s == "string") return {
      stringValue: s
    };
    if (s instanceof Date) {
      const B = le.fromDate(s);
      return {
        timestampValue: jr(i.serializer, B)
      };
    }
    if (s instanceof le) {
      const B = new le(s.seconds, 1e3 * Math.floor(s.nanoseconds / 1e3));
      return {
        timestampValue: jr(i.serializer, B)
      };
    }
    if (Yh(s)) {
      const B = le.fromInstant(s), u = new le(B.seconds, 1e3 * Math.floor(B.nanoseconds / 1e3));
      return {
        timestampValue: jr(i.serializer, u)
      };
    }
    if (s instanceof wt) return {
      geoPointValue: {
        latitude: s.latitude,
        longitude: s.longitude
      }
    };
    if (s instanceof ct) return {
      bytesValue: Fh(i.serializer, s._byteString)
    };
    if (s instanceof we) {
      const B = i.databaseId, u = s.firestore._databaseId;
      if (!u.isEqual(B)) throw i.createError(`Document reference is for database ${u.projectId}/${u.database} but should be for database ${B.projectId}/${B.database}`);
      return {
        referenceValue: Fa(s.firestore._databaseId || i.databaseId, s._key.path)
      };
    }
    if (s instanceof We)
      return (function(u, c) {
        const C = u instanceof We ? u.toArray() : u;
        return {
          mapValue: {
            fields: {
              [ch]: {
                stringValue: hh
              },
              [es]: {
                arrayValue: {
                  values: C.map(((m) => {
                    if (typeof m != "number") throw c.createError("VectorValues must only contain numeric values.");
                    return _i(c.serializer, m);
                  }))
                }
              }
            }
          }
        };
      })(s, i);
    if (kh(s)) return s._toProto(i.serializer);
    throw i.createError(`Unsupported field value: ${mi(s)}`);
  })(r, e);
}
function VE(r, e) {
  const t = {};
  return sh(r) ? (
    // If we encounter an empty object, we explicitly add it to the update
    // mask to ensure that the server creates a map entry.
    e.path && e.path.length > 0 && e.fieldMask.push(e.path)
  ) : ir(r, ((n, s) => {
    const i = er(s, e.childContextForField(n));
    i != null && (t[n] = i);
  })), {
    mapValue: {
      fields: t
    }
  };
}
function Yh(r) {
  if (typeof r != "object" || r === null) return !1;
  if (typeof Temporal < "u" && typeof Temporal.Instant == "function" && r instanceof Temporal.Instant)
    return !0;
  const e = r;
  return e[Symbol.toStringTag] === "Temporal.Instant" && typeof e.t == "bigint";
}
function Wh(r) {
  return !(typeof r != "object" || r === null || r instanceof Array || r instanceof Date || r instanceof le || r instanceof wt || r instanceof ct || r instanceof we || r instanceof Uh || r instanceof We || Yh(r) || kh(r));
}
function ME(r, e, t) {
  if (!Wh(t) || !cs(t)) {
    const n = mi(t);
    throw n === "an object" ? e.createError(r + " a custom object") : e.createError(r + " " + n);
  }
}
function bi(r, e, t) {
  if (
    // If required, replace the FieldPath Compat class with the firestore-exp
    // FieldPath.
    (e = zn(e)) instanceof Pa
  ) return e._internalPath;
  if (typeof e == "string") return kE(r, e);
  throw Ci(
    "Field path arguments must be of type string or ",
    r,
    /* hasConverter= */
    !1,
    /* path= */
    void 0,
    t
  );
}
const GE = new RegExp("[~\\*/\\[\\]]");
function kE(r, e, t) {
  if (e.search(GE) >= 0) throw Ci(
    `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
    r,
    /* hasConverter= */
    !1,
    /* path= */
    void 0,
    t
  );
  try {
    return new Pa(...e.split("."))._internalPath;
  } catch {
    throw Ci(
      `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      r,
      /* hasConverter= */
      !1,
      /* path= */
      void 0,
      t
    );
  }
}
function Ci(r, e, t, n, s) {
  const i = n && !n.isEmpty(), o = s !== void 0;
  let B = `Function ${e}() called with invalid data`;
  t && (B += " (via `toFirestore()`)"), B += ". ";
  let u = "";
  return (i || o) && (u += " (found", i && (u += ` in field ${n}`), o && (u += ` in document ${s}`), u += ")"), new H(M.INVALID_ARGUMENT, B + r + u);
}
function Xh(r) {
  return typeof r._readUserData == "function";
}
class Ue {
  constructor(e) {
    this.optionDefinitions = e;
  }
  _getKnownOptions(e, t) {
    const n = ft.empty();
    for (const s in this.optionDefinitions) if (this.optionDefinitions.hasOwnProperty(s)) {
      const i = this.optionDefinitions[s];
      if (s in e) {
        const o = e[s];
        let B;
        i.nestedOptions && cs(o) ? B = {
          mapValue: {
            fields: new Ue(i.nestedOptions).getOptionsProto(t, o)
          }
        } : o && (B = er(o, t) ?? void 0), B && n.set(ht.fromServerFormat(i.serverName), B);
      }
    }
    return n;
  }
  getOptionsProto(e, t, n) {
    const s = this._getKnownOptions(t, e);
    if (n) {
      const i = new Map(em(n, ((o, B) => [ht.fromServerFormat(B), o !== void 0 ? er(o, e) : null])));
      s.setAll(i);
    }
    return s.value.mapValue.fields ?? {};
  }
}
function HE(r) {
  return typeof r == "object" && r !== null && !!("nullValue" in r && (r.nullValue === null || r.nullValue === "NULL_VALUE") || "booleanValue" in r && (r.booleanValue === null || typeof r.booleanValue == "boolean") || "integerValue" in r && (r.integerValue === null || typeof r.integerValue == "number" || typeof r.integerValue == "string") || "doubleValue" in r && (r.doubleValue === null || typeof r.doubleValue == "number") || "timestampValue" in r && (r.timestampValue === null || (function(t) {
    return typeof t == "object" && t !== null && "seconds" in t && (t.seconds === null || typeof t.seconds == "number" || typeof t.seconds == "string") && "nanos" in t && (t.nanos === null || typeof t.nanos == "number");
  })(r.timestampValue)) || "stringValue" in r && (r.stringValue === null || typeof r.stringValue == "string") || "bytesValue" in r && (r.bytesValue === null || r.bytesValue instanceof Uint8Array) || "referenceValue" in r && (r.referenceValue === null || typeof r.referenceValue == "string") || "geoPointValue" in r && (r.geoPointValue === null || (function(t) {
    return typeof t == "object" && t !== null && "latitude" in t && (t.latitude === null || typeof t.latitude == "number") && "longitude" in t && (t.longitude === null || typeof t.longitude == "number");
  })(r.geoPointValue)) || "arrayValue" in r && (r.arrayValue === null || (function(t) {
    return typeof t == "object" && t !== null && !(!("values" in t) || t.values !== null && !Array.isArray(t.values));
  })(r.arrayValue)) || "mapValue" in r && (r.mapValue === null || (function(t) {
    return typeof t == "object" && t !== null && !(!("fields" in t) || t.fields !== null && !cs(t.fields));
  })(r.mapValue)) || "fieldReferenceValue" in r && (r.fieldReferenceValue === null || typeof r.fieldReferenceValue == "string") || "functionValue" in r && (r.functionValue === null || (function(t) {
    return typeof t == "object" && t !== null && !(!("name" in t) || t.name !== null && typeof t.name != "string" || !("args" in t) || t.args !== null && !Array.isArray(t.args));
  })(r.functionValue)) || "pipelineValue" in r && (r.pipelineValue === null || (function(t) {
    return typeof t == "object" && t !== null && !(!("stages" in t) || t.stages !== null && !Array.isArray(t.stages));
  })(r.pipelineValue)));
}
function UE(r) {
  return new We(r);
}
function G(r) {
  let e;
  return r instanceof On ? r : (e = cs(r) ? QE(r) : r instanceof Array ? zE(r) : Zh(r, void 0), e);
}
function Ao(r) {
  if (r instanceof On) return r;
  if (r instanceof We) return ss(r);
  if (Array.isArray(r)) return ss(UE(r));
  throw new Error("Unsupported value: " + typeof r);
}
function xa(r) {
  return am(r) ? Xs(r) : G(r);
}
class On {
  constructor() {
    this._protoValueType = "ProtoValue";
  }
  /**
   * Creates an expression that adds this expression to another expression.
   *
   * @example
   * ```typescript
   * // Add the value of the 'quantity' field and the 'reserve' field.
   * field("quantity").add(field("reserve"));
   * ```
   *
   * @param second - The expression or literal to add to this expression.
   * @param others - Optional additional expressions or literals to add to this expression.
   * @returns A new `Expression` representing the addition operation.
   */
  add(e) {
    return new P("add", [this, G(e)], "add");
  }
  /**
   * Wraps the expression in a [BooleanExpression].
   *
   * @returns A [BooleanExpression] representing the same expression.
   */
  asBoolean() {
    if (this instanceof sn) return this;
    if (this instanceof ur) return new tC(this);
    if (this instanceof Br) return new KE(this);
    if (this instanceof P) return new eC(this);
    throw new H("invalid-argument", `Conversion of type ${typeof this} to BooleanExpression not supported.`);
  }
  subtract(e) {
    return new P("subtract", [this, G(e)], "subtract");
  }
  /**
   * Creates an expression that multiplies this expression by another expression.
   *
   * @example
   * ```typescript
   * // Multiply the 'quantity' field by the 'price' field
   * field("quantity").multiply(field("price"));
   * ```
   *
   * @param second - The second expression or literal to multiply by.
   * @param others - Optional additional expressions or literals to multiply by.
   * @returns A new `Expression` representing the multiplication operation.
   */
  multiply(e) {
    return new P("multiply", [this, G(e)], "multiply");
  }
  divide(e) {
    return new P("divide", [this, G(e)], "divide");
  }
  mod(e) {
    return new P("mod", [this, G(e)], "mod");
  }
  equal(e) {
    return new P("equal", [this, G(e)], "equal").asBoolean();
  }
  notEqual(e) {
    return new P("not_equal", [this, G(e)], "notEqual").asBoolean();
  }
  lessThan(e) {
    return new P("less_than", [this, G(e)], "lessThan").asBoolean();
  }
  lessThanOrEqual(e) {
    return new P("less_than_or_equal", [this, G(e)], "lessThanOrEqual").asBoolean();
  }
  greaterThan(e) {
    return new P("greater_than", [this, G(e)], "greaterThan").asBoolean();
  }
  greaterThanOrEqual(e) {
    return new P("greater_than_or_equal", [this, G(e)], "greaterThanOrEqual").asBoolean();
  }
  /**
   * Creates an expression that concatenates an array expression with one or more other arrays.
   *
   * @example
   * ```typescript
   * // Combine the 'items' array with another array field.
   * field("items").arrayConcat(field("otherItems"));
   * ```
   * @param secondArray - Second array expression or array literal to concatenate.
   * @param otherArrays - Optional additional array expressions or array literals to concatenate.
   * @returns A new `Expression` representing the concatenated array.
   */
  arrayConcat(e, ...t) {
    const n = [e, ...t].map(((s) => G(s)));
    return new P("array_concat", [this, ...n], "arrayConcat");
  }
  arrayContains(e) {
    return new P("array_contains", [this, G(e)], "arrayContains").asBoolean();
  }
  arrayContainsAll(e) {
    const t = Array.isArray(e) ? new Pr(e.map(G), "arrayContainsAll") : e;
    return new P("array_contains_all", [this, t], "arrayContainsAll").asBoolean();
  }
  arrayContainsAny(e) {
    const t = Array.isArray(e) ? new Pr(e.map(G), "arrayContainsAny") : e;
    return new P("array_contains_any", [this, t], "arrayContainsAny").asBoolean();
  }
  /**
   * Creates an expression that reverses an array.
   *
   * @example
   * ```typescript
   * // Reverse the value of the 'myArray' field.
   * field("myArray").arrayReverse();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the reversed array.
   */
  arrayReverse() {
    return new P("array_reverse", [this]);
  }
  /**
   * Creates an expression that calculates the length of an array.
   *
   * @example
   * ```typescript
   * // Get the number of items in the 'cart' array
   * field("cart").arrayLength();
   * ```
   *
   * @returns A new `Expression` representing the length of the array.
   */
  arrayLength() {
    return new P("array_length", [this], "arrayLength");
  }
  equalAny(e) {
    const t = Array.isArray(e) ? new Pr(e.map(G), "equalAny") : e;
    return new P("equal_any", [this, t], "equalAny").asBoolean();
  }
  notEqualAny(e) {
    const t = Array.isArray(e) ? new Pr(e.map(G), "notEqualAny") : e;
    return new P("not_equal_any", [this, t], "notEqualAny").asBoolean();
  }
  /**
   * Creates an expression that checks if a field exists in the document.
   *
   * @example
   * ```typescript
   * // Check if the document has a field named "phoneNumber"
   * field("phoneNumber").exists();
   * ```
   *
   * @returns A new `Expression` representing the 'exists' check.
   */
  exists() {
    return new P("exists", [this], "exists").asBoolean();
  }
  /**
   * Creates an expression that calculates the character length of a string in UTF-8.
   *
   * @example
   * ```typescript
   * // Get the character length of the 'name' field in its UTF-8 form.
   * field("name").charLength();
   * ```
   *
   * @returns A new `Expression` representing the length of the string.
   */
  charLength() {
    return new P("char_length", [this], "charLength");
  }
  like(e) {
    return new P("like", [this, G(e)], "like").asBoolean();
  }
  regexContains(e) {
    return new P("regex_contains", [this, G(e)], "regexContains").asBoolean();
  }
  regexFind(e) {
    return new P("regex_find", [this, G(e)], "regexFind");
  }
  regexFindAll(e) {
    return new P("regex_find_all", [this, G(e)], "regexFindAll");
  }
  regexMatch(e) {
    return new P("regex_match", [this, G(e)], "regexMatch").asBoolean();
  }
  stringContains(e) {
    return new P("string_contains", [this, G(e)], "stringContains").asBoolean();
  }
  startsWith(e) {
    return new P("starts_with", [this, G(e)], "startsWith").asBoolean();
  }
  endsWith(e) {
    return new P("ends_with", [this, G(e)], "endsWith").asBoolean();
  }
  /**
   * Creates an expression that converts a string to lowercase.
   *
   * @example
   * ```typescript
   * // Convert the 'name' field to lowercase
   * field("name").toLower();
   * ```
   *
   * @returns A new `Expression` representing the lowercase string.
   */
  toLower() {
    return new P("to_lower", [this], "toLower");
  }
  /**
   * Creates an expression that converts a string to uppercase.
   *
   * @example
   * ```typescript
   * // Convert the 'title' field to uppercase
   * field("title").toUpper();
   * ```
   *
   * @returns A new `Expression` representing the uppercase string.
   */
  toUpper() {
    return new P("to_upper", [this], "toUpper");
  }
  /**
   * Creates an expression that removes leading and trailing characters from a string or byte array.
   *
   * @example
   * ```typescript
   * // Trim whitespace from the 'userInput' field
   * field("userInput").trim();
   *
   * // Trim quotes from the 'userInput' field
   * field("userInput").trim('"');
   * ```
   * @param valueToTrim - Optional This parameter is treated as a set of characters or bytes that will be
   * trimmed from the input. If not specified, then whitespace will be trimmed.
   * @returns A new `Expression` representing the trimmed string or byte array.
   */
  trim(e) {
    const t = [this];
    return e && t.push(G(e)), new P("trim", t, "trim");
  }
  /**
   * Trims whitespace or a specified set of characters/bytes from the beginning of a string or byte array.
   *
   * @example
   * ```typescript
   * // Trim whitespace from the beginning of the 'userInput' field
   * field("userInput").ltrim();
   *
   * // Trim quotes from the beginning of the 'userInput' field
   * field("userInput").ltrim('"');
   * ```
   *
   * @param valueToTrim - Optional. A string or byte array containing the characters/bytes to trim.
   * If not specified, whitespace will be trimmed.
   * @returns A new `Expression` representing the trimmed string.
   */
  ltrim(e) {
    const t = [this];
    return e && t.push(G(e)), new P("ltrim", t, "ltrim");
  }
  /**
   * Trims whitespace or a specified set of characters/bytes from the end of a string or byte array.
   *
   * @example
   * ```typescript
   * // Trim whitespace from the end of the 'userInput' field
   * field("userInput").rtrim();
   *
   * // Trim quotes from the end of the 'userInput' field
   * field("userInput").rtrim('"');
   * ```
   *
   * @param valueToTrim - Optional. A string or byte array containing the characters/bytes to trim.
   * If not specified, whitespace will be trimmed.
   * @returns A new `Expression` representing the trimmed string or byte array.
   */
  rtrim(e) {
    const t = [this];
    return e && t.push(G(e)), new P("rtrim", t, "rtrim");
  }
  /**
   * Creates an expression that returns the data type of this expression's result, as a string.
   *
   * @remarks
   * This is evaluated on the backend. This means:
   * 1. Generic typed elements (like `array<string>`) evaluate strictly to the primitive `'array'`.
   * 2. Any custom `FirestoreDataConverter` mappings are ignored.
   * 3. For numeric values, the backend does not yield the JavaScript `"number"` type; it evaluates
   *    precisely as `"int64"` or `"float64"`.
   * 4. For date or timestamp objects, the backend evaluates to `"timestamp"`.
   *
   * @example
   * ```typescript
   * // Get the data type of the value in field 'title'
   * field('title').type()
   * ```
   *
   * @returns A new `Expression` representing the data type.
   */
  type() {
    return new P("type", [this]);
  }
  /**
   * Creates an expression that checks if the result of this expression is of the given type.
   *
   * @remarks Null or undefined fields evaluate to skip/error. Use `ifAbsent()` / `isAbsent()` to evaluate missing data.
   * Supported values for `type` are:
   * `'null'`, `'array'`, `'boolean'`, `'bytes'`, `'timestamp'`, `'geo_point'`, `'number'`,
   * `'int32'`, `'int64'`, `'float64'`, `'decimal128'`, `'map'`, `'reference'`, `'string'`,
   * `'vector'`, `'max_key'`, `'min_key'`, `'object_id'`, `'regex'`, `'request_timestamp'`.
   *
   * @example
   * ```typescript
   * // Check if the 'price' field is specifically an integer (not just 'number')
   * field('price').isType('int64');
   * ```
   *
   * @param type - The type to check for.
   * @returns A new `BooleanExpression` that evaluates to true if the expression's result is of the given type, false otherwise.
   */
  isType(e) {
    return new P("is_type", [this, ss(e)], "isType").asBoolean();
  }
  /**
   * Creates an expression that concatenates string expressions together.
   *
   * @example
   * ```typescript
   * // Combine the 'firstName', " ", and 'lastName' fields into a single string
   * field("firstName").stringConcat(constant(" "), field("lastName"));
   * ```
   *
   * @param secondString - The additional expression or string literal to concatenate.
   * @param otherStrings - Optional additional expressions or string literals to concatenate.
   * @returns A new `Expression` representing the concatenated string.
   */
  stringConcat(e, ...t) {
    const n = [e, ...t].map(G);
    return new P("string_concat", [this, ...n], "stringConcat");
  }
  /**
   * Creates an expression that finds the index of the first occurrence of a substring or byte sequence.
   *
   * @example
   * ```typescript
   * // Find the index of "foo" in the 'text' field
   * field("text").stringIndexOf("foo");
   * ```
   *
   * @param search - The substring or byte sequence to search for.
   * @returns A new `Expression` representing the index of the first occurrence.
   */
  stringIndexOf(e) {
    return new P("string_index_of", [this, G(e)], "stringIndexOf");
  }
  /**
   * Creates an expression that repeats a string or byte array a specified number of times.
   *
   * @example
   * ```typescript
   * // Repeat the 'label' field 3 times
   * field("label").stringRepeat(3);
   * ```
   *
   * @param repetitions - The number of times to repeat the string or byte array.
   * @returns A new `Expression` representing the repeated string or byte array.
   */
  stringRepeat(e) {
    return new P("string_repeat", [this, G(e)], "stringRepeat");
  }
  /**
   * Creates an expression that replaces all occurrences of a substring or byte sequence with a replacement.
   *
   * @example
   * ```typescript
   * // Replace all occurrences of "foo" with "bar" in the 'text' field
   * field("text").stringReplaceAll("foo", "bar");
   * ```
   *
   * @param find - The substring or byte sequence to search for.
   * @param replacement - The replacement string or byte sequence.
   * @returns A new `Expression` representing the string or byte array with replacements.
   */
  stringReplaceAll(e, t) {
    return new P("string_replace_all", [this, G(e), G(t)], "stringReplaceAll");
  }
  /**
   * Creates an expression that replaces the first occurrence of a substring or byte sequence with a replacement.
   *
   * @example
   * ```typescript
   * // Replace the first occurrence of "foo" with "bar" in the 'text' field
   * field("text").stringReplaceOne("foo", "bar");
   * ```
   *
   * @param find - The substring or byte sequence to search for.
   * @param replacement - The replacement string or byte sequence.
   * @returns A new `Expression` representing the string or byte array with the replacement.
   */
  stringReplaceOne(e, t) {
    return new P("string_replace_one", [this, G(e), G(t)], "stringReplaceOne");
  }
  /**
   * Creates an expression that concatenates expression results together.
   *
   * @example
   * ```typescript
   * // Combine the 'firstName', ' ', and 'lastName' fields into a single value.
   * field("firstName").concat(constant(" "), field("lastName"));
   * ```
   *
   * @param second - The additional expression or literal to concatenate.
   * @param others - Optional additional expressions or literals to concatenate.
   * @returns A new `Expression` representing the concatenated value.
   */
  concat(e, ...t) {
    const n = [e, ...t].map(G);
    return new P("concat", [this, ...n], "concat");
  }
  /**
   * Creates an expression that reverses this string expression.
   *
   * @example
   * ```typescript
   * // Reverse the value of the 'myString' field.
   * field("myString").reverse();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the reversed string.
   */
  reverse() {
    return new P("reverse", [this], "reverse");
  }
  /**
   * Filters the array using a provided alias and predicate expression.
   *
   * @example
   * ```typescript
   * // Filter the 'items' array to only include those where the 'price' is greater than 10
   * field("items").arrayFilter('item', greaterThan(variable('item.price'), 10));
   * ```
   *
   * @param alias - The variable name to use for each element.
   * @param filter - The predicate boolean expression to filter by.
   * @returns A new `Expression` representing the filtered array.
   */
  arrayFilter(e, t) {
    return new P("array_filter", [this, G(e), t], "arrayFilter");
  }
  /**
   * Creates an expression that applies a provided transformation to each element in an array.
   *
   * @example
   * ```typescript
   * // Transform the 'scores' array by multiplying each score by 10
   * field("scores").arrayTransform("score", multiply(variable("score"), 10));
   * ```
   *
   * @param elementAlias - The variable name to use for each element.
   * @param transform - The lambda expression used to transform the elements.
   * @returns A new `Expression` representing the arrayTransform operation.
   */
  arrayTransform(e, t) {
    return new P("array_transform", [this, G(e), t], "arrayTransform");
  }
  /**
   * Creates an expression that applies a provided transformation to each element in an array, providing the element's index to the transformation expression.
   *
   * @example
   * ```typescript
   * // Transform the 'scores' array by adding the index to each score
   * field("scores").arrayTransformWithIndex("score", "i", add(variable("score"), variable("i")));
   * ```
   *
   * @param elementAlias - The variable name to use for each element.
   * @param indexAlias - The variable name to use for the current index.
   * @param transform - The lambda expression used to transform the elements.
   * @returns A new `Expression` representing the arrayTransformWithIndex operation.
   */
  arrayTransformWithIndex(e, t, n) {
    return new P("array_transform", [this, G(e), G(t), n], "arrayTransformWithIndex");
  }
  /**
   * Returns a subset of the array.
   *
   * @example
   * ```typescript
   * // Get 5 elements from the 'items' array starting from index 2
   * field("items").arraySlice(2, 5);
   *
   * // Get n number of elements from the 'items' array starting from index 2
   * field("items").arraySlice(2, field("count"));
   * ```
   *
   * @param offset - The starting offset.
   * @param length - The optional length of the slice.
   * @returns A new `Expression` representing the sliced array.
   */
  arraySlice(e, t) {
    const n = [this, G(e)];
    return t !== void 0 && n.push(G(t)), new P("array_slice", n, "arraySlice");
  }
  /**
   * Returns the first element of the array.
   *
   * @example
   * ```typescript
   * // Get the first element of the 'myArray' field.
   * field("myArray").arrayFirst();
   * ```
   *
   * @returns A new `Expression` representing the first element.
   */
  arrayFirst() {
    return new P("array_first", [this], "arrayFirst");
  }
  arrayFirstN(e) {
    return new P("array_first_n", [this, G(e)], "arrayFirstN");
  }
  /**
   * Returns the last element of the array.
   *
   * @example
   * ```typescript
   * // Get the last element of the 'myArray' field.
   * field("myArray").arrayLast();
   * ```
   *
   * @returns A new `Expression` representing the last element.
   */
  arrayLast() {
    return new P("array_last", [this], "arrayLast");
  }
  arrayLastN(e) {
    return new P("array_last_n", [this, G(e)], "arrayLastN");
  }
  /**
   * Returns the maximum value in the array.
   *
   * @example
   * ```typescript
   * // Get the maximum value of the 'myArray' field.
   * field("myArray").arrayMaximum();
   * ```
   *
   * @returns A new `Expression` representing the maximum value.
   */
  arrayMaximum() {
    return new P("maximum", [this], "arrayMaximum");
  }
  arrayMaximumN(e) {
    return new P("maximum_n", [this, G(e)], "arrayMaximumN");
  }
  /**
   * Returns the minimum value in the array.
   *
   * @example
   * ```typescript
   * // Get the minimum value of the 'myArray' field.
   * field("myArray").arrayMinimum();
   * ```
   *
   * @returns A new `Expression` representing the minimum value.
   */
  arrayMinimum() {
    return new P("minimum", [this], "arrayMinimum");
  }
  arrayMinimumN(e) {
    return new P("minimum_n", [this, G(e)], "arrayMinimumN");
  }
  arrayIndexOf(e) {
    return new P("array_index_of", [this, G(e), G("first")], "arrayIndexOf");
  }
  arrayLastIndexOf(e) {
    return new P("array_index_of", [this, G(e), G("last")], "arrayLastIndexOf");
  }
  arrayIndexOfAll(e) {
    return new P("array_index_of_all", [this, G(e)], "arrayIndexOfAll");
  }
  /**
   * Creates an expression that calculates the length of this string expression in bytes.
   *
   * @example
   * ```typescript
   * // Calculate the length of the 'myString' field in bytes.
   * field("myString").byteLength();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the length of the string in bytes.
   */
  byteLength() {
    return new P("byte_length", [this], "byteLength");
  }
  /**
   * Creates an expression that computes the ceiling of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the ceiling of the 'price' field.
   * field("price").ceil();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the ceiling of the numeric value.
   */
  ceil() {
    return new P("ceil", [this]);
  }
  /**
   * Creates an expression that computes the floor of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the floor of the 'price' field.
   * field("price").floor();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the floor of the numeric value.
   */
  floor() {
    return new P("floor", [this]);
  }
  /**
   * Creates an expression that computes the absolute value of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the absolute value of the 'price' field.
   * field("price").abs();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the absolute value of the numeric value.
   */
  abs() {
    return new P("abs", [this]);
  }
  /**
   * Creates an expression that computes e to the power of this expression.
   *
   * @example
   * ```typescript
   * // Compute e to the power of the 'value' field.
   * field("value").exp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the exp of the numeric value.
   */
  exp() {
    return new P("exp", [this]);
  }
  /**
   * Accesses a value from a map (object) field using the provided key.
   *
   * @example
   * ```typescript
   * // Get the 'city' value from the 'address' map field
   * field("address").mapGet("city");
   * ```
   *
   * @param subfield - The key to access in the map.
   * @returns A new `Expression` representing the value associated with the given key in the map.
   */
  mapGet(e) {
    return new P("map_get", [this, ss(e)], "mapGet");
  }
  /**
   * Creates an expression that returns a new map with the specified entries added or updated.
   *
   * @remarks
   * Note that `mapSet` only performs shallow updates to the map. Setting a value to `null`
   * will retain the key with a `null` value. To remove a key entirely, use `mapRemove`.
   *
   * @example
   * ```typescript
   * // Set the 'city' to "San Francisco" in the 'address' map
   * field("address").mapSet("city", "San Francisco");
   * ```
   *
   * @param key - The key to set. Must be a string or a constant string expression.
   * @param value - The value to set.
   * @param moreKeyValues - Additional key-value pairs to set.
   * @returns A new `Expression` representing the map with the entries set.
   */
  mapSet(e, t, ...n) {
    const s = [this, G(e), G(t), ...n.map(G)];
    return new P("map_set", s, "mapSet");
  }
  /**
   * Creates an expression that returns the keys of a map.
   *
   * @remarks
   * While the backend generally preserves insertion order, relying on the
   * order of the output array is not guaranteed and should be avoided.
   *
   * @example
   * ```typescript
   * // Get the keys of the 'address' map
   * field("address").mapKeys();
   * ```
   *
   * @returns A new `Expression` representing the keys of the map.
   */
  mapKeys() {
    return new P("map_keys", [this], "mapKeys");
  }
  /**
   * Creates an expression that returns the values of a map.
   *
   * @remarks
   * While the backend generally preserves insertion order, relying on the
   * order of the output array is not guaranteed and should be avoided.
   *
   * @example
   * ```typescript
   * // Get the values of the 'address' map
   * field("address").mapValues();
   * ```
   *
   * @returns A new `Expression` representing the values of the map.
   */
  mapValues() {
    return new P("map_values", [this], "mapValues");
  }
  /**
   * Creates an expression that returns the entries of a map as an array of maps,
   * where each map contains a `"k"` property for the key and a `"v"` property for the value.
   * For example: `[{ k: "key1", v: "value1" }, ...]`.
   *
   * @example
   * ```typescript
   * // Get the entries of the 'address' map
   * field("address").mapEntries();
   * ```
   *
   * @returns A new `Expression` representing the entries of the map.
   */
  mapEntries() {
    return new P("map_entries", [this], "mapEntries");
  }
  /**
   * @public
   * Creates an expression that returns the value of a field from the document that results from the evaluation of this expression.
   *
   * @example
   * ```typescript
   * // Get the value of the "city" field in the "address" document.
   * field("address").getField("city")
   * ```
   *
   * @param key The field to access in the document.
   * @returns A new `Expression` representing the value of the field in the document.
   */
  getField(e) {
    return new P("get_field", [this, G(e)], "get_field");
  }
  /**
   * Creates an aggregation that counts the number of stage inputs with valid evaluations of the
   * expression or field.
   *
   * @example
   * ```typescript
   * // Count the total number of products
   * field("productId").count().as("totalProducts");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'count' aggregation.
   */
  count() {
    return it._create("count", [this], "count");
  }
  /**
   * Creates an aggregation that calculates the sum of a numeric field across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Calculate the total revenue from a set of orders
   * field("orderAmount").sum().as("totalRevenue");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'sum' aggregation.
   */
  sum() {
    return it._create("sum", [this], "sum");
  }
  /**
   * Creates an aggregation that calculates the average (mean) of a numeric field across multiple
   * stage inputs.
   *
   * @example
   * ```typescript
   * // Calculate the average age of users
   * field("age").average().as("averageAge");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'average' aggregation.
   */
  average() {
    return it._create("average", [this], "average");
  }
  /**
   * Creates an aggregation that finds the minimum value of a field across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the lowest price of all products
   * field("price").minimum().as("lowestPrice");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'minimum' aggregation.
   */
  minimum() {
    return it._create("minimum", [this], "minimum");
  }
  /**
   * Creates an aggregation that finds the maximum value of a field across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the highest score in a leaderboard
   * field("score").maximum().as("highestScore");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'maximum' aggregation.
   */
  maximum() {
    return it._create("maximum", [this], "maximum");
  }
  /**
   * Creates an aggregation that finds the first value of an expression across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the first value of the 'rating' field
   * field("rating").first().as("firstRating");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'first' aggregation.
   */
  first() {
    return it._create("first", [this], "first");
  }
  /**
   * Creates an aggregation that finds the last value of an expression across multiple stage inputs.
   *
   * @example
   * ```typescript
   * // Find the last value of the 'rating' field
   * field("rating").last().as("lastRating");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'last' aggregation.
   */
  last() {
    return it._create("last", [this], "last");
  }
  /**
   * Creates an aggregation that collects all values of an expression across multiple stage inputs
   * into an array.
   *
   * @remarks
   * If the expression resolves to an absent value, it is converted to `null`.
   * The order of elements in the output array is not stable and shouldn't be relied upon.
   *
   * @example
   * ```typescript
   * // Collect all tags from books into an array
   * field("tags").arrayAgg().as("allTags");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'array_agg' aggregation.
   */
  arrayAgg() {
    return it._create("array_agg", [this], "arrayAgg");
  }
  /**
   * Creates an aggregation that collects all distinct values of an expression across multiple stage
   * inputs into an array.
   *
   * @remarks
   * If the expression resolves to an absent value, it is converted to `null`.
   * The order of elements in the output array is not stable and shouldn't be relied upon.
   *
   * @example
   * ```typescript
   * // Collect all distinct tags from books into an array
   * field("tags").arrayAggDistinct().as("allDistinctTags");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'array_agg_distinct' aggregation.
   */
  arrayAggDistinct() {
    return it._create("array_agg_distinct", [this], "arrayAggDistinct");
  }
  /**
   * Creates an aggregation that counts the number of distinct values of the expression or field.
   *
   * @example
   * ```typescript
   * // Count the distinct number of products
   * field("productId").countDistinct().as("distinctProducts");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'count_distinct' aggregation.
   */
  countDistinct() {
    return it._create("count_distinct", [this], "countDistinct");
  }
  /**
   * Creates an expression that returns the larger value between this expression and another expression, based on Firestore's value type ordering.
   *
   * @example
   * ```typescript
   * // Returns the larger value between the 'timestamp' field and the current timestamp.
   * field("timestamp").logicalMaximum(currentTimestamp());
   * ```
   *
   * @param second - The second expression or literal to compare with.
   * @param others - Optional additional expressions or literals to compare with.
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the logical maximum operation.
   */
  logicalMaximum(e, ...t) {
    const n = [e, ...t];
    return new P("maximum", [this, ...n.map(G)], "logicalMaximum");
  }
  /**
   * Creates an expression that returns the smaller value between this expression and another expression, based on Firestore's value type ordering.
   *
   * @example
   * ```typescript
   * // Returns the smaller value between the 'timestamp' field and the current timestamp.
   * field("timestamp").logicalMinimum(currentTimestamp());
   * ```
   *
   * @param second - The second expression or literal to compare with.
   * @param others - Optional additional expressions or literals to compare with.
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the logical minimum operation.
   */
  logicalMinimum(e, ...t) {
    const n = [e, ...t];
    return new P("minimum", [this, ...n.map(G)], "minimum");
  }
  /**
   * Creates an expression that calculates the length (number of dimensions) of this Firestore Vector expression.
   *
   * @example
   * ```typescript
   * // Get the vector length (dimension) of the field 'embedding'.
   * field("embedding").vectorLength();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the length of the vector.
   */
  vectorLength() {
    return new P("vector_length", [this], "vectorLength");
  }
  cosineDistance(e) {
    return new P("cosine_distance", [this, Ao(e)], "cosineDistance");
  }
  dotProduct(e) {
    return new P("dot_product", [this, Ao(e)], "dotProduct");
  }
  euclideanDistance(e) {
    return new P("euclidean_distance", [this, Ao(e)], "euclideanDistance");
  }
  /**
   * Creates an expression that interprets this expression as the number of microseconds since the Unix epoch (1970-01-01 00:00:00 UTC)
   * and returns a timestamp.
   *
   * @example
   * ```typescript
   * // Interpret the 'microseconds' field as microseconds since epoch.
   * field("microseconds").unixMicrosToTimestamp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the timestamp.
   */
  unixMicrosToTimestamp() {
    return new P("unix_micros_to_timestamp", [this], "unixMicrosToTimestamp");
  }
  /**
   * Creates an expression that converts this timestamp expression to the number of microseconds since the Unix epoch (1970-01-01 00:00:00 UTC).
   *
   * @example
   * ```typescript
   * // Convert the 'timestamp' field to microseconds since epoch.
   * field("timestamp").timestampToUnixMicros();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the number of microseconds since epoch.
   */
  timestampToUnixMicros() {
    return new P("timestamp_to_unix_micros", [this], "timestampToUnixMicros");
  }
  /**
   * Creates an expression that interprets this expression as the number of milliseconds since the Unix epoch (1970-01-01 00:00:00 UTC)
   * and returns a timestamp.
   *
   * @example
   * ```typescript
   * // Interpret the 'milliseconds' field as milliseconds since epoch.
   * field("milliseconds").unixMillisToTimestamp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the timestamp.
   */
  unixMillisToTimestamp() {
    return new P("unix_millis_to_timestamp", [this], "unixMillisToTimestamp");
  }
  /**
   * Creates an expression that converts this timestamp expression to the number of milliseconds since the Unix epoch (1970-01-01 00:00:00 UTC).
   *
   * @example
   * ```typescript
   * // Convert the 'timestamp' field to milliseconds since epoch.
   * field("timestamp").timestampToUnixMillis();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the number of milliseconds since epoch.
   */
  timestampToUnixMillis() {
    return new P("timestamp_to_unix_millis", [this], "timestampToUnixMillis");
  }
  /**
   * Creates an expression that interprets this expression as the number of seconds since the Unix epoch (1970-01-01 00:00:00 UTC)
   * and returns a timestamp.
   *
   * @example
   * ```typescript
   * // Interpret the 'seconds' field as seconds since epoch.
   * field("seconds").unixSecondsToTimestamp();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the timestamp.
   */
  unixSecondsToTimestamp() {
    return new P("unix_seconds_to_timestamp", [this], "unixSecondsToTimestamp");
  }
  /**
   * Creates an expression that converts this timestamp expression to the number of seconds since the Unix epoch (1970-01-01 00:00:00 UTC).
   *
   * @example
   * ```typescript
   * // Convert the 'timestamp' field to seconds since epoch.
   * field("timestamp").timestampToUnixSeconds();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the number of seconds since epoch.
   */
  timestampToUnixSeconds() {
    return new P("timestamp_to_unix_seconds", [this], "timestampToUnixSeconds");
  }
  timestampAdd(e, t) {
    return new P("timestamp_add", [this, G(e), G(t)], "timestampAdd");
  }
  timestampSubtract(e, t) {
    return new P("timestamp_subtract", [this, G(e), G(t)], "timestampSubtract");
  }
  timestampDiff(e, t) {
    return new P("timestamp_diff", [this, xa(e), G(t)], "timestampDiff");
  }
  timestampExtract(e, t) {
    const n = [this, G(e)];
    return t && n.push(G(t)), new P("timestamp_extract", n, "timestampExtract");
  }
  /**
   *
   * Creates an expression that returns the document ID from a path.
   *
   * @example
   * ```typescript
   * // Get the document ID from a path.
   * field("__path__").documentId();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the documentId operation.
   */
  documentId() {
    return new P("document_id", [this], "documentId");
  }
  /**
   *
   * Creates an expression that returns the parent document reference of a document reference.
   *
   * @example
   * ```typescript
   * // Get the parent document reference of a document reference.
   * field("__path__").parent();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the parent operation.
   */
  parent() {
    return new P("parent", [this], "parent");
  }
  substring(e, t) {
    const n = G(e);
    return new P("substring", t === void 0 ? [this, n] : [this, n, G(t)], "substring");
  }
  arrayGet(e) {
    return new P("array_get", [this, G(e)], "arrayGet");
  }
  /**
   *
   * Creates an expression that checks if a given expression produces an error.
   *
   * @example
   * ```typescript
   * // Check if the result of a calculation is an error
   * field("title").arrayContains(1).isError();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#BooleanExpression} representing the 'isError' check.
   */
  isError() {
    return new P("is_error", [this], "isError").asBoolean();
  }
  ifError(e) {
    const t = new P("if_error", [this, G(e)], "ifError");
    return e instanceof sn ? t.asBoolean() : t;
  }
  /**
   *
   * Creates an expression that returns `true` if the result of this expression
   * is absent. Otherwise, returns `false` even if the value is `null`.
   *
   * @example
   * ```typescript
   * // Check if the field `value` is absent.
   * field("value").isAbsent();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#BooleanExpression} representing the 'isAbsent' check.
   */
  isAbsent() {
    return new P("is_absent", [this], "isAbsent").asBoolean();
  }
  mapRemove(e) {
    return new P("map_remove", [this, G(e)], "mapRemove");
  }
  /**
   *
   * Creates an expression that merges multiple map values.
   *
   * @example
   * ```
   * // Merges the map in the settings field with, a map literal, and a map in
   * // that is conditionally returned by another expression
   * field('settings').mapMerge({ enabled: true }, conditional(field('isAdmin'), { admin: true}, {})
   * ```
   *
   * @param secondMap - A required second map to merge. Represented as a literal or
   * an expression that returns a map.
   * @param otherMaps - Optional additional maps to merge. Each map is represented
   * as a literal or an expression that returns a map.
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the 'mapMerge' operation.
   */
  mapMerge(e, ...t) {
    const n = G(e), s = t.map(G);
    return new P("map_merge", [this, n, ...s], "mapMerge");
  }
  pow(e) {
    return new P("pow", [this, G(e)]);
  }
  trunc(e) {
    return e === void 0 ? new P("trunc", [this]) : new P("trunc", [this, G(e)], "trunc");
  }
  round(e) {
    return e === void 0 ? new P("round", [this]) : new P("round", [this, G(e)], "round");
  }
  /**
   * Creates an expression that returns the collection ID from a path.
   *
   * @example
   * ```typescript
   * // Get the collection ID from a path.
   * field("__path__").collectionId();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the collectionId operation.
   */
  collectionId() {
    return new P("collection_id", [this]);
  }
  /**
   * Creates an expression that calculates the length of a string, array, map, vector, or bytes.
   *
   * @example
   * ```typescript
   * // Get the length of the 'name' field.
   * field("name").length();
   *
   * // Get the number of items in the 'cart' array.
   * field("cart").length();
   * ```
   *
   * @returns A new `Expression` representing the length of the string, array, map, vector, or bytes.
   */
  length() {
    return new P("length", [this]);
  }
  /**
   * Creates an expression that computes the natural logarithm of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the natural logarithm of the 'value' field.
   * field("value").ln();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the natural logarithm of the numeric value.
   */
  ln() {
    return new P("ln", [this]);
  }
  /**
   * Creates an expression that computes the square root of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the square root of the 'value' field.
   * field("value").sqrt();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the square root of the numeric value.
   */
  sqrt() {
    return new P("sqrt", [this]);
  }
  /**
   * Creates an expression that reverses a string.
   *
   * @example
   * ```typescript
   * // Reverse the value of the 'myString' field.
   * field("myString").stringReverse();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the reversed string.
   */
  stringReverse() {
    return new P("string_reverse", [this]);
  }
  ifAbsent(e) {
    return new P("if_absent", [this, G(e)], "ifAbsent");
  }
  ifNull(e) {
    return new P("if_null", [this, G(e)], "ifNull");
  }
  /**
   * Creates an expression that returns the first non-null, non-absent argument, without evaluating
   * the rest of the arguments. When all arguments are null or absent, returns the last argument.
   *
   * @example
   * ```typescript
   * // Returns the value of the first non-null, non-absent field among 'preferredName', 'fullName',
   * // or the last argument if all previous fields are null.
   * field("preferredName").coalesce(field("fullName"), "Anonymous");
   * ```
   *
   * @param replacement - The value to use if this expression evaluates to null.
   * @param others - Optional additional values to check if previous values are null.
   * @returns A new `Expression` representing the coalesce operation.
   */
  coalesce(e, ...t) {
    return new P("coalesce", [this, G(e), ...t.map(G)], "coalesce");
  }
  join(e) {
    return new P("join", [this, G(e)], "join");
  }
  /**
   * Creates an expression that computes the base-10 logarithm of a numeric value.
   *
   * @example
   * ```typescript
   * // Compute the base-10 logarithm of the 'value' field.
   * field("value").log10();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the base-10 logarithm of the numeric value.
   */
  log10() {
    return new P("log10", [this]);
  }
  /**
   * Creates an expression that computes the sum of the elements in an array.
   *
   * @example
   * ```typescript
   * // Compute the sum of the elements in the 'scores' field.
   * field("scores").arraySum();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the sum of the elements in the array.
   */
  arraySum() {
    return new P("sum", [this]);
  }
  split(e) {
    return new P("split", [this, G(e)]);
  }
  timestampTruncate(e, t) {
    const n = [this, G(e)];
    return t && n.push(G(t)), new P("timestamp_trunc", n);
  }
  // TODO(search) enable with backend support
  // /**
  //  * Evaluates if the result of this `expression` is between
  //  * the `lowerBound` (inclusive) and `upperBound` (inclusive).
  //  *
  //  * @example
  //  * ```
  //  * // Evaluate if the 'tireWidth' is between 2.2 and 2.4
  //  * field('tireWidth').between(constant(2.2), constant(2.4))
  //  *
  //  * // This is functionally equivalent to
  //  * and(field('tireWidth').greaterThanOrEqual(contant(2.2)), field('tireWidth').lessThanOrEqual(constant(2.4)))
  //  * ```
  //  *
  //  * @param lowerBound - Lower bound (inclusive) of the range.
  //  * @param upperBound - Upper bound (inclusive) of the range.
  //  */
  // between(lowerBound: Expression, upperBound: Expression): BooleanExpression;
  // /**
  //  * Evaluates if the result of this `expression` is between
  //  * the `lowerBound` (inclusive) and `upperBound` (inclusive).
  //  *
  //  * @example
  //  * ```
  //  * // Evaluate if the 'tireWidth' is between 2.2 and 2.4
  //  * field('tireWidth').between(2.2, 2.4)
  //  *
  //  * // This is functionally equivalent to
  //  * and(field('tireWidth').greaterThanOrEqual(2.2), field('tireWidth').lessThanOrEqual(2.4))
  //  * ```
  //  *
  //  * @param lowerBound - Lower bound (inclusive) of the range.
  //  * @param upperBound - Upper bound (inclusive) of the range.
  //  */
  // between(lowerBound: unknown, upperBound: unknown): BooleanExpression;
  // between(lowerBound: unknown, upperBound: unknown): BooleanExpression {
  //   return new FunctionExpression('between', [
  //     this,
  //     valueToDefaultExpr(lowerBound),
  //     valueToDefaultExpr(upperBound)
  //   ]).asBoolean();
  // }
  // TODO(search) enable with backend support
  // /**
  //  * Evaluates to an HTML-formatted text snippet that renders terms matching
  //  * the search query in `<b>bold</b>`.
  //  *
  //  * @remarks This Expression can only be used within a `search` stage.
  //  *
  //  * @param rquery Define the search query using the search domain-specific language (DSL).
  //  */
  // snippet(rquery: string): Expression;
  // /**
  //  * Evaluates to an HTML-formatted text snippet that renders terms matching
  //  * the search query in `<b>bold</b>`.
  //  *
  //  * @remarks This Expression can only be used within a `search` stage.
  //  *
  //  * @param options Define how snippeting behaves.
  //  */
  // snippet(options: SnippetOptions): Expression;
  // snippet(queryOrOptions: string | SnippetOptions): Expression {
  //   const options: SnippetOptions = isString(queryOrOptions)
  //     ? { rquery: queryOrOptions }
  //     : queryOrOptions;
  //   const rquery = options.rquery;
  //   const internalOptions = {
  //     maxSnippetWidth: options.maxSnippetWidth,
  //     maxSnippets: options.maxSnippets,
  //     separator: options.separator
  //   };
  //   return new SnippetExpression([this, constant(rquery)], internalOptions);
  // }
  // TODO(new-expression): Add new expression method definitions above this line
  /**
   * Creates an {@link @firebase/firestore/pipelines#Ordering} that sorts documents in ascending order based on this expression.
   *
   * @example
   * ```typescript
   * // Sort documents by the 'name' field in ascending order
   * firestore.pipeline().collection("users")
   *   .sort(field("name").ascending());
   * ```
   *
   * @returns A new `Ordering` for ascending sorting.
   */
  ascending() {
    return $E(this);
  }
  /**
   * Creates an {@link @firebase/firestore/pipelines#Ordering} that sorts documents in descending order based on this expression.
   *
   * @example
   * ```typescript
   * // Sort documents by the 'createdAt' field in descending order
   * firestore.pipeline().collection("users")
   *   .sort(field("createdAt").descending());
   * ```
   *
   * @returns A new `Ordering` for descending sorting.
   */
  descending() {
    return YE(this);
  }
  /**
   * Assigns an alias to this expression.
   *
   * Aliases are useful for renaming fields in the output of a stage or for giving meaningful
   * names to calculated values.
   *
   * @example
   * ```typescript
   * // Calculate the total price and assign it the alias "totalPrice" and add it to the output.
   * firestore.pipeline().collection("items")
   *   .addFields(field("price").multiply(field("quantity")).as("totalPrice"));
   * ```
   *
   * @param name - The alias to assign to this expression.
   * @returns A new {@link @firebase/firestore/pipelines#AliasedExpression} that wraps this
   *     expression and associates it with the provided alias.
   */
  as(e) {
    return new JE(this, e, "as");
  }
}
class it {
  constructor(e, t) {
    this.name = e, this.params = t, this.exprType = "AggregateFunction", this._protoValueType = "ProtoValue";
  }
  /**
   * @internal
   * @private
   */
  static _create(e, t, n) {
    const s = new it(e, t);
    return s._methodName = n, s;
  }
  /**
   * Assigns an alias to this AggregateFunction. The alias specifies the name that
   * the aggregated value will have in the output document.
   *
   * @example
   * ```typescript
   * // Calculate the average price of all items and assign it the alias "averagePrice".
   * firestore.pipeline().collection("items")
   *   .aggregate(field("price").average().as("averagePrice"));
   * ```
   *
   * @param name - The alias to assign to this AggregateFunction.
   * @returns A new {@link @firebase/firestore/pipelines#AliasedAggregate} that wraps this
   *     AggregateFunction and associates it with the provided alias.
   */
  as(e) {
    return new jE(this, e, "as");
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      functionValue: {
        name: this.name,
        args: this.params.map(((t) => t._toProto(e)))
      }
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    e = this._methodName ? e.contextWith({
      methodName: this._methodName
    }) : e, this.params.forEach(((t) => t._readUserData(e)));
  }
}
class jE {
  constructor(e, t, n) {
    this.aggregate = e, this.alias = t, this._methodName = n;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.aggregate._readUserData(e);
  }
}
class JE {
  constructor(e, t, n) {
    this.expr = e, this.alias = t, this._methodName = n, this.exprType = "AliasedExpression", this.selectable = !0;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.expr._readUserData(e);
  }
}
class Pr extends On {
  constructor(e, t) {
    super(), this.cr = e, this._methodName = t, this.expressionType = "ListOfExpressions";
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      arrayValue: {
        values: this.cr.map(((t) => t._toProto(e)))
      }
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.cr.forEach(((t) => t._readUserData(e)));
  }
}
class Br extends On {
  /**
   * @internal
   * @private
   * @hideconstructor
   * @param fieldPath
   */
  constructor(e, t) {
    super(), this.fieldPath = e, this._methodName = t, this.expressionType = "Field", this.selectable = !0;
  }
  get _fieldPath() {
    return this.fieldPath;
  }
  get fieldName() {
    return this.fieldPath.canonicalString();
  }
  get alias() {
    return this.fieldName;
  }
  get expr() {
    return this;
  }
  // TODO(search) enable with backend support
  // /**
  //  * Perform a full-text search on this field.
  //  *
  //  * @remarks This Expression can only be used within a `search` stage.
  //  *
  //  * @param rquery Define the search query using the search domain-specific language (DSL).
  //  */
  // matches(rquery: string | Expression): BooleanExpression {
  //   return new FunctionExpression(
  //     'matches',
  //     [this, valueToDefaultExpr(rquery)],
  //     'matches'
  //   ).asBoolean();
  // }
  /**
   * @beta
   * Evaluates to the distance in meters between the location specified
   * by this field and the query location.
   *
   * @remarks This Expression can only be used within a `search` stage.
   *
   * @param location - Compute distance to this GeoPoint.
   */
  geoDistance(e) {
    return new P("geo_distance", [this, G(e)], "geoDistance");
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      fieldReferenceValue: this.fieldPath.canonicalString()
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
  }
}
function Xs(r) {
  return qE(r, "field");
}
function qE(r, e) {
  return new Br(typeof r == "string" ? _t === r ? sE()._internalPath : bi("field", r) : r._internalPath, e);
}
class ur extends On {
  /**
   * @private
   * @internal
   * @hideconstructor
   * @param value - The value of the constant.
   */
  constructor(e, t) {
    super(), this.value = e, this._methodName = t, this.expressionType = "Constant";
  }
  /**
   * @private
   * @internal
   */
  static _fromProto(e) {
    const t = new ur(e, void 0);
    return t._protoValue = e, t;
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return $(this._protoValue !== void 0, 237), this._protoValue;
  }
  _getValue() {
    return this._protoValue;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    e = this._methodName ? e.contextWith({
      methodName: this._methodName
    }) : e, HE(this._protoValue) || (this._protoValue = er(this.value, e));
  }
}
function ss(r, e) {
  return Zh(r, "constant");
}
function Zh(r, e) {
  const t = new ur(r, e);
  return typeof r == "boolean" ? new tC(t) : t;
}
class P extends On {
  /**
   * @hideconstructor
   */
  constructor(e, t, n, s) {
    super(), this.name = e, this.params = t, this.expressionType = "Function", /**
     * @private
     * @internal
     */
    this._optionsProto = void 0, n !== void 0 && (this._methodName = n), s !== void 0 && (this._options = s);
  }
  /**
   * @private
   * @internal
   */
  get _optionsUtil() {
    return new Ue({});
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    const t = {
      functionValue: {
        name: this.name,
        args: this.params.map(((n) => n._toProto(e)))
      }
    };
    return this._optionsProto && (t.functionValue.options = this._optionsProto), t;
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    e = this._methodName ? e.contextWith({
      methodName: this._methodName
    }) : e, this.params.forEach(((t) => t._readUserData(e))), this._options && (this._optionsProto = this._optionsUtil.getOptionsProto(e, this._options));
  }
}
class sn extends On {
  get _methodName() {
    return this._expr._methodName;
  }
  /**
   * Creates an aggregation that finds the count of input documents satisfying
   * this boolean expression.
   *
   * @example
   * ```typescript
   * // Find the count of documents with a score greater than 90
   * field("score").greaterThan(90).countIf().as("highestScore");
   * ```
   *
   * @returns A new `AggregateFunction` representing the 'countIf' aggregation.
   */
  countIf() {
    return it._create("count_if", [this], "countIf");
  }
  /**
   * Creates an expression that negates this boolean expression.
   *
   * @example
   * ```typescript
   * // Find documents where the 'tags' field does not contain 'completed'
   * field("tags").arrayContains("completed").not();
   * ```
   *
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the negated filter condition.
   */
  not() {
    return new P("not", [this], "not").asBoolean();
  }
  /**
   * Creates a conditional expression that evaluates to the 'then' expression
   * if `this` expression evaluates to `true`,
   * or evaluates to the 'else' expression if `this` expressions evaluates `false`.
   *
   * @example
   * ```typescript
   * // If 'age' is greater than 18, return "Adult"; otherwise, return "Minor".
   * field("age").greaterThanOrEqual(18).conditional(constant("Adult"), constant("Minor"));
   * ```
   *
   * @param thenExpr - The expression to evaluate if the condition is true.
   * @param elseExpr - The expression to evaluate if the condition is false.
   * @returns A new {@link @firebase/firestore/pipelines#Expression} representing the conditional expression.
   */
  conditional(e, t) {
    return new P("conditional", [this, e, t], "conditional");
  }
  ifError(e) {
    const t = G(e), n = new P("if_error", [this, t], "ifError");
    return t instanceof sn ? n.asBoolean() : n;
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return this._expr._toProto(e);
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this._expr._readUserData(e);
  }
}
class eC extends sn {
  constructor(e) {
    super(), this._expr = e, this.expressionType = "Function";
  }
}
class tC extends sn {
  constructor(e) {
    super(), this._expr = e, this.expressionType = "Constant";
  }
  _getValue() {
    return this._expr._getValue();
  }
}
class KE extends sn {
  constructor(e) {
    super(), this._expr = e, this.expressionType = "Field";
  }
}
function QE(r, e) {
  const t = [];
  for (const n in r) if (Object.prototype.hasOwnProperty.call(r, n)) {
    const s = r[n];
    t.push(ss(n)), t.push(G(s));
  }
  return new P("map", t, "map");
}
function zE(r) {
  return (function(t, n) {
    return new P("array", t.map(((s) => G(s))), n);
  })(r, "array");
}
function $E(r) {
  return new nC(xa(r), "ascending", "ascending");
}
function YE(r) {
  return new nC(xa(r), "descending", "descending");
}
class nC {
  constructor(e, t, n) {
    this.expr = e, this.direction = t, this._methodName = n, this._protoValueType = "ProtoValue";
  }
  /**
   * @private
   * @internal
   */
  _toProto(e) {
    return {
      mapValue: {
        fields: {
          direction: Hh(this.direction),
          expression: this.expr._toProto(e)
        }
      }
    };
  }
  /**
   * @private
   * @internal
   */
  _readUserData(e) {
    this.expr._readUserData(e);
  }
}
class Bt {
  constructor(e) {
    this.optionsProto = void 0, { rawOptions: this.rawOptions, ...this.knownOptions } = e;
  }
  _readUserData(e) {
    this.optionsProto = this._optionsUtil.getOptionsProto(e, this.knownOptions, this.rawOptions);
  }
  _toProto(e) {
    return {
      name: this._name,
      options: this.optionsProto
    };
  }
}
class rC extends Bt {
  get _name() {
    return "add_fields";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.fields = e;
  }
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [rs(e, this.fields)]
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.fields, e);
  }
}
class sC extends Bt {
  get _name() {
    return "aggregate";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t, n) {
    super(n), this.groups = e, this.accumulators = t;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [rs(e, this.accumulators), rs(e, this.groups)]
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.groups, e), on(this.accumulators, e);
  }
}
class iC extends Bt {
  get _name() {
    return "distinct";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.groups = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [rs(e, this.groups)]
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.groups, e);
  }
}
class Oi extends Bt {
  get _name() {
    return "collection";
  }
  get _optionsUtil() {
    return new Ue({
      forceIndex: {
        serverName: "force_index"
      }
    });
  }
  constructor(e, t) {
    super(t), // prepend slash to collection string
    this.hr = e.startsWith("/") ? e : "/" + e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [{
        referenceValue: this.hr
      }]
    };
  }
  _readUserData(e) {
    super._readUserData(e);
  }
}
class Si extends Bt {
  get _name() {
    return "collection_group";
  }
  get _optionsUtil() {
    return new Ue({
      forceIndex: {
        serverName: "force_index"
      }
    });
  }
  constructor(e, t) {
    super(t), this.collectionId = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [{
        referenceValue: ""
      }, {
        stringValue: this.collectionId
      }]
    };
  }
  _readUserData(e) {
    super._readUserData(e);
  }
}
class Va extends Bt {
  get _name() {
    return "database";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e)
    };
  }
  _readUserData(e) {
    super._readUserData(e);
  }
}
class Ma extends Bt {
  get _name() {
    return "documents";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    if (super(t), !e || e.length === 0) throw new H(M.INVALID_ARGUMENT, "Empty document paths are not allowed in DocumentsSource");
    const n = e.map(((i) => i.startsWith("/") ? i : "/" + i)), s = new Set(n);
    if (s.size !== n.length) throw new H(M.INVALID_ARGUMENT, "Duplicate document paths are not allowed in DocumentsSource");
    this.Tr = n, this.Pr = s;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: this.Tr.map(((t) => ({
        referenceValue: t
      })))
    };
  }
  _readUserData(e) {
    super._readUserData(e);
  }
}
class Ni extends Bt {
  get _name() {
    return "where";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.condition = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [this.condition._toProto(e)]
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.condition, e);
  }
}
class Rn extends Bt {
  get _name() {
    return "limit";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    $(!isNaN(e) && e !== 1 / 0 && e !== -1 / 0, 34860), super(t), this.limit = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [Ta(e, this.limit)]
    };
  }
}
class Yl extends Bt {
  get _name() {
    return "offset";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.offset = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [Ta(e, this.offset)]
    };
  }
}
class WE extends Bt {
  get _name() {
    return "select";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.selections = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [rs(e, this.selections)]
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.selections, e);
  }
}
class Rt extends Bt {
  get _name() {
    return "sort";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.orderings = e;
  }
  /**
   * @internal
   * @private
   */
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: this.orderings.map(((t) => t._toProto(e)))
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.orderings, e);
  }
}
class Ga extends Bt {
  get _name() {
    return "replace_with";
  }
  get _optionsUtil() {
    return new Ue({});
  }
  constructor(e, t) {
    super(t), this.map = e;
  }
  _toProto(e) {
    return {
      ...super._toProto(e),
      args: [this.map._toProto(e), Hh(Ga.Ir)]
    };
  }
  _readUserData(e) {
    super._readUserData(e), on(this.map, e);
  }
}
Ga.Ir = "full_replace";
function on(r, e) {
  return Xh(r) ? r._readUserData(e) : Array.isArray(r) ? r.forEach(((t) => t._readUserData(e))) : r instanceof Map ? r.forEach(((t) => t._readUserData(e))) : Object.values(r).forEach(((t) => t._readUserData(e))), r;
}
class Jr {
  /**
   * @internal
   * @private
   * @param _db
   * @param userDataReader
   * @param _userDataWriter
   * @param _documentReferenceFactory
   * @param stages
   */
  constructor(e, t, n, s) {
    this._db = e, this.userDataReader = t, this._userDataWriter = n, this.stages = s;
  }
  /**
   * Reads user data for each expression in the expressionMap.
   * @param name Name of the calling function. Used for error messages when invalid user data is encountered.
   * @param expressionMap
   * @return the expressionMap argument.
   * @private
   * @internal
   */
  Vr(e, t) {
    const n = this.userDataReader.createContext(3, e);
    return Xh(t) ? t._readUserData(n) : Array.isArray(t) ? t.forEach(((s) => s._readUserData(n))) : t.forEach(((s) => s._readUserData(n))), t;
  }
  where(e) {
    const t = this.stages.map(((n) => n));
    return this.Vr("where", e), t.push(new Ni(e, {})), new Jr(this._db, this.userDataReader, this._userDataWriter, t);
  }
  limit(e) {
    const t = this.stages.map(((n) => n));
    return t.push(new Rn(e, {})), new Jr(this._db, this.userDataReader, this._userDataWriter, t);
  }
  sort(e, ...t) {
    const n = this.stages.map(((s) => s));
    return "orderings" in e ? n.push(new Rt(this.Vr("sort", e.orderings), {})) : (
      // Ordering object
      n.push(new Rt(this.Vr("sort", [e, ...t]), {}))
    ), new Jr(this._db, this.userDataReader, this._userDataWriter, n);
  }
  /**
   * @internal
   * @private
   */
  dr(e) {
    return {
      pipeline: {
        stages: this.stages.map(((t) => t._toProto(e)))
      }
    };
  }
}
class qe {
  constructor(e, t, n) {
    this.serializer = e, this.stages = t, this.listenOptions = n, this.isCorePipeline = !0;
  }
  getPipelineCollection() {
    return Fi(this);
  }
  getPipelineCollectionGroup() {
    return ka(this);
  }
  getPipelineCollectionId() {
    return XE(this);
  }
  getPipelineDocuments() {
    return la(this);
  }
  getPipelineFlavor() {
    return (function(t) {
      let n = "exact";
      return t.stages.forEach(((s, i) => {
        s._name !== iC.name && s._name !== sC.name || (n = "keyless"), s._name === WE.name && n === "exact" && (n = "augmented"), // TODO(pipeline): verify the last stage is addFields, and it is added by the SDK.
        s._name === rC.name && i < t.stages.length - 1 && n === "exact" && (n = "augmented");
      })), n;
    })(this);
  }
  getPipelineSourceType() {
    return Xt(this);
  }
}
function Xt(r) {
  const e = r.stages[0];
  return e instanceof Oi || e instanceof Si || e instanceof Va || e instanceof Ma ? e._name : "unknown";
}
function Fi(r) {
  if (Xt(r) === "collection") return r.stages[0].hr;
}
function ka(r) {
  if (Xt(r) === "collection_group") return r.stages[0].collectionId;
}
function XE(r) {
  switch (Xt(r)) {
    case "collection":
      return Be.fromString(Fi(r)).lastSegment();
    case "collection_group":
      return ka(r);
    default:
      return;
  }
}
function la(r) {
  if (Xt(r) === "documents") return r.stages[0].Tr;
}
class I {
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  static mr() {
    return new I("ERROR", void 0);
  }
  static pr() {
    return new I("UNSET", void 0);
  }
  static gr() {
    return new I("NULL", Wn);
  }
  static newValue(e) {
    return ot(e) ? new I("NULL", Wn) : (function(n) {
      return !!n && "booleanValue" in n;
    })(e) ? new I("BOOLEAN", e) : yt(e) ? new I("INT", e) : Dn(e) ? new I("DOUBLE", e) : (function(n) {
      return !!n && "timestampValue" in n && !!n.timestampValue;
    })(e) ? new I("TIMESTAMP", e) : (function(n) {
      return !!n && "stringValue" in n;
    })(e) ? new I("STRING", e) : (function(n) {
      return !!n && "bytesValue" in n;
    })(e) ? new I("BYTES", e) : e.referenceValue ? new I("REFERENCE", e) : e.geoPointValue ? new I("GEO_POINT", e) : Zn(e) ? new I("ARRAY", e) : oi(e) ? new I("VECTOR", e) : Jn(e) ? new I("MAP", e) : new I("ERROR", void 0);
  }
  yr() {
    return this.type === "ERROR" || this.type === "UNSET";
  }
  wr() {
    return this.type === "NULL";
  }
}
function qr(r) {
  if (!r.yr()) return r.value;
}
function oC(r) {
  return r instanceof sn ? r._expr : r;
}
function W(r) {
  if ((r = oC(r)) instanceof Br) return new ZE(r);
  if (r instanceof ur) return new eD(r);
  if (r instanceof Pr) return new tD(r);
  if (r instanceof P) {
    if (r.name === "add") return new sD(r);
    if (r.name === "subtract") return new iD(r);
    if (r.name === "multiply") return new oD(r);
    if (r.name === "divide") return new aD(r);
    if (r.name === "mod") return new BD(r);
    if (r.name === "and") return new uD(r);
    if (r.name === "equal") return new _D(r);
    if (r.name === "not_equal") return new yD(r);
    if (r.name === "less_than") return new ID(r);
    if (r.name === "less_than_or_equal") return new wD(r);
    if (r.name === "greater_than") return new TD(r);
    if (r.name === "greater_than_or_equal") return new AD(r);
    if (r.name === "array_concat") return new vD(r);
    if (r.name === "array_reverse") return new RD(r);
    if (r.name === "array_contains") return new bD(r);
    if (r.name === "array_contains_all") return new OD(r);
    if (r.name === "array_contains_any") return new SD(r);
    if (r.name === "array_length") return new ND(r);
    if (r.name === "array_element") return new FD(r);
    if (r.name === "equal_any") return new aC(r);
    if (r.name === "not_equal_any") return new cD(r);
    if (r.name === "is_nan") return new hD(r);
    if (r.name === "is_not_nan") return new CD(r);
    if (r.name === "is_null") return new fD(r);
    if (r.name === "is_not_null") return new dD(r);
    if (r.name === "is_error") return new gD(r);
    if (r.name === "exists") return new pD(r);
    if (r.name === "not") return new Pi(r);
    if (r.name === "or") return new lD(r);
    if (r.name === "xor") return new Ha(r);
    if (r.name === "conditional") return new mD(r);
    if (r.name === "maximum") return new ED(r);
    if (r.name === "minimum") return new DD(r);
    if (r.name === "reverse") return new PD(r);
    if (r.name === "replace_first") return new LD(r);
    if (r.name === "replace_all") return new xD(r);
    if (r.name === "char_length") return new VD(r);
    if (r.name === "byte_length") return new MD(r);
    if (r.name === "like") return new GD(r);
    if (r.name === "regex_contains") return new kD(r);
    if (r.name === "regex_match") return new HD(r);
    if (r.name === "string_contains") return new UD(r);
    if (r.name === "starts_with") return new jD(r);
    if (r.name === "ends_with") return new JD(r);
    if (r.name === "to_lower") return new qD(r);
    if (r.name === "to_upper") return new KD(r);
    if (r.name === "trim") return new QD(r);
    if (r.name === "string_concat") return new zD(r);
    if (r.name === "map_get") return new $D(r);
    if (r.name === "cosine_distance") return new YD(r);
    if (r.name === "dot_product") return new WD(r);
    if (r.name === "euclidean_distance") return new XD(r);
    if (r.name === "vector_length") return new ZD(r);
    if (r.name === "unix_micros_to_timestamp") return new s_(r);
    if (r.name === "timestamp_to_unix_micros") return new a_(r);
    if (r.name === "unix_millis_to_timestamp") return new i_(r);
    if (r.name === "timestamp_to_unix_millis") return new B_(r);
    if (r.name === "unix_seconds_to_timestamp") return new o_(r);
    if (r.name === "timestamp_to_unix_seconds") return new u_(r);
    if (r.name === "timestamp_add") return new l_(r);
    if (r.name === "timestamp_subtract") return new c_(r);
  }
  throw new Error(`Unknown Expr : ${r}`);
}
class ZE {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    if (this.expr.fieldName === _t) return I.newValue({
      referenceValue: Qm(e.serializer, t.key)
    });
    if (this.expr.fieldName === "__update_time__") return I.newValue({
      timestampValue: Io(e.serializer, t.version)
    });
    if (this.expr.fieldName === "__create_time__") return I.newValue({
      timestampValue: Io(e.serializer, t.createTime)
    });
    const n = t.data.field(this.expr._fieldPath);
    return n ? Ei(n) ? I.newValue((function(i, o) {
      if (i.serverTimestampBehavior === "estimate") return {
        timestampValue: Io(i.serializer, Z.fromTimestamp(Yn(o)))
      };
      if (i.serverTimestampBehavior === "previous") {
        const B = Cs(o);
        if (B) return B;
      }
      return {
        nullValue: "NULL_VALUE"
      };
    })(e, n)) : I.newValue(n) : I.pr();
  }
}
class eD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    return I.newValue(this.expr._getValue());
  }
}
class tD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    const n = this.expr.cr.map(((s) => W(s).evaluate(e, t)));
    return n.some(((s) => s.yr())) ? I.mr() : I.newValue({
      arrayValue: {
        values: n.map(((s) => s.value))
      }
    });
  }
}
function xe(r) {
  return Dn(r) ? Number(r.doubleValue) : Number(r.integerValue);
}
function Tt(r) {
  return BigInt(r.integerValue);
}
const nD = BigInt("0x7fffffffffffffff"), rD = -BigInt("0x8000000000000000");
class ps {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length >= 2, 24778);
    const n = W(this.expr.params[0]).evaluate(e, t), s = W(this.expr.params[1]).evaluate(e, t);
    let i = this.br(n, s);
    for (const o of this.expr.params.slice(2)) {
      const B = W(o).evaluate(e, t);
      i = this.br(i, B);
    }
    return i;
  }
  br(e, t) {
    if (e.yr() || t.yr()) return I.mr();
    if (e.wr() || t.wr()) return I.gr();
    const n = e.value, s = t.value;
    if (!Dn(n) && !yt(n) || !Dn(s) && !yt(s)) return I.mr();
    if (Dn(n) || Dn(s)) {
      const i = this.Sr(n, s);
      return i ? I.newValue(i) : I.mr();
    }
    if (yt(n) && yt(s)) {
      const i = this.vr(n, s);
      return i === void 0 ? I.mr() : typeof i == "number" ? I.newValue({
        doubleValue: i
      }) : i < rD || i > nD ? I.mr() : I.newValue({
        integerValue: `${i}`
      });
    }
    return I.mr();
  }
}
function Ft(r, e) {
  return ve(r) !== ve(e) ? "TYPE_MISMATCH" : et(r) || et(e) ? "NOT_EQ" : ot(r) && ot(e) ? "EQ" : ot(r) || ot(e) ? "NULL" : Zn(r) && Zn(e) ? (function(n, s) {
    if (n.values?.length !== s.values?.length) return "NOT_EQ";
    let i = !1;
    for (let o = 0; o < (n.values?.length ?? 0); o++) {
      const B = n.values[o], u = s.values[o];
      switch (Ft(B, u)) {
        case "EQ":
          break;
        case "NOT_EQ":
        case "TYPE_MISMATCH":
          return "NOT_EQ";
        case "NULL":
          i = !0;
          break;
        default:
          X(44609, {
            Dr: B,
            Cr: u
          });
      }
    }
    return i ? "NULL" : "EQ";
  })(r.arrayValue, e.arrayValue) : oi(r) && oi(e) || Jn(r) && Jn(e) ? (function(n, s) {
    const i = n.fields || {}, o = s.fields || {};
    if (si(i) !== si(o)) return "NOT_EQ";
    let B = !1;
    for (const u in i) if (i.hasOwnProperty(u)) {
      if (o[u] === void 0) return "NOT_EQ";
      switch (Ft(i[u], o[u])) {
        case "NOT_EQ":
        case "TYPE_MISMATCH":
          return "NOT_EQ";
        case "NULL":
          B = !0;
      }
    }
    return B ? "NULL" : "EQ";
  })(r.mapValue, e.mapValue) : (function(n, s) {
    return Ct(n, s, {
      u: !1,
      i: !0,
      o: !0
    });
  })(r, e) ? "EQ" : "NOT_EQ";
}
class sD extends ps {
  vr(e, t) {
    return Tt(e) + Tt(t);
  }
  Sr(e, t) {
    return {
      doubleValue: xe(e) + xe(t)
    };
  }
}
class iD extends ps {
  constructor(e) {
    super(e), this.expr = e;
  }
  vr(e, t) {
    return Tt(e) - Tt(t);
  }
  Sr(e, t) {
    return {
      doubleValue: xe(e) - xe(t)
    };
  }
}
class oD extends ps {
  constructor(e) {
    super(e), this.expr = e;
  }
  vr(e, t) {
    return Tt(e) * Tt(t);
  }
  Sr(e, t) {
    return {
      doubleValue: xe(e) * xe(t)
    };
  }
}
class aD extends ps {
  constructor(e) {
    super(e), this.expr = e;
  }
  vr(e, t) {
    const n = Tt(t);
    if (n !== BigInt(0)) return Tt(e) / n;
  }
  Sr(e, t) {
    const n = xe(t);
    return n === 0 ? {
      doubleValue: Zr(n) ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY
    } : {
      doubleValue: xe(e) / n
    };
  }
}
class BD extends ps {
  constructor(e) {
    super(e), this.expr = e;
  }
  vr(e, t) {
    const n = Tt(t);
    if (n !== BigInt(0)) return Tt(e) % n;
  }
  Sr(e, t) {
    const n = xe(t);
    if (n !== 0) return {
      doubleValue: xe(e) % n
    };
  }
}
class uD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    let n = !1, s = !1;
    for (const i of this.expr.params) {
      const o = W(i).evaluate(e, t);
      switch (o.type) {
        case "BOOLEAN":
          if (!o.value?.booleanValue) return I.newValue(Pe);
          break;
        case "NULL":
          s = !0;
          break;
        default:
          n = !0;
      }
    }
    return n ? I.mr() : s ? I.gr() : I.newValue(Xe);
  }
}
class Pi {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 9634);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "BOOLEAN":
        return I.newValue({
          booleanValue: !n.value?.booleanValue
        });
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class lD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    let n = !1, s = !1;
    for (const i of this.expr.params) {
      const o = W(i).evaluate(e, t);
      switch (o.type) {
        case "BOOLEAN":
          if (o.value?.booleanValue) return I.newValue(Xe);
          break;
        case "NULL":
          s = !0;
          break;
        default:
          n = !0;
      }
    }
    return n ? I.mr() : s ? I.gr() : I.newValue(Pe);
  }
}
class Ha {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    let n = !1, s = !1;
    for (const i of this.expr.params) {
      const o = W(i).evaluate(e, t);
      switch (o.type) {
        case "BOOLEAN":
          n = Ha.xor(n, !!o.value?.booleanValue);
          break;
        case "NULL":
          s = !0;
          break;
        default:
          return I.mr();
      }
    }
    return s ? I.gr() : I.newValue({
      booleanValue: n
    });
  }
  // XOR(a, b) is equivalent to (a OR b) AND NOT(a AND b)
  // It is required to evaluate all arguments to ensure that the correct error semantics are
  // applied.
  static xor(e, t) {
    return (e || t) && !(e && t);
  }
}
class aC {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 55094);
    let n = !1;
    const s = W(this.expr.params[0]).evaluate(e, t);
    switch (s.type) {
      case "NULL":
        n = !0;
        break;
      case "ERROR":
      case "UNSET":
        return I.mr();
    }
    const i = W(this.expr.params[1]).evaluate(e, t);
    switch (i.type) {
      case "ARRAY":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    if (n) return I.gr();
    for (const o of i.value?.arrayValue?.values ?? [])
      switch (ot(s.value) && ot(o) ? "EQ" : Ft(s.value, o)) {
        case "EQ":
          return I.newValue(Xe);
        case "NOT_EQ":
        case "TYPE_MISMATCH":
          break;
        case "NULL":
          n = !0;
          break;
        default:
          X(44608, {
            value: s.value,
            candidate: o
          });
      }
    return n ? I.gr() : I.newValue(Pe);
  }
}
class cD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    return new Pi(new P("not", [new P("equal_any", this.expr.params)])).evaluate(e, t);
  }
}
class hD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 23322);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "INT":
        return I.newValue(Pe);
      case "DOUBLE":
        return I.newValue({
          booleanValue: isNaN(xe(n.value))
        });
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class CD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    return $(this.expr.params.length === 1, 50406), new Pi(new P("not", [new P("is_nan", this.expr.params)])).evaluate(e, t);
  }
}
class fD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    switch ($(this.expr.params.length === 1, 23123), W(this.expr.params[0]).evaluate(e, t).type) {
      case "NULL":
        return I.newValue(Xe);
      case "UNSET":
      case "ERROR":
        return I.mr();
      default:
        return I.newValue(Pe);
    }
  }
}
class dD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    return $(this.expr.params.length === 1, 23167), new Pi(new P("not", [new P("is_null", this.expr.params)])).evaluate(e, t);
  }
}
class gD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    return $(this.expr.params.length === 1, 5228), W(this.expr.params[0]).evaluate(e, t).type === "ERROR" ? I.newValue(Xe) : I.newValue(Pe);
  }
}
class pD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    switch ($(this.expr.params.length === 1, 6877), W(this.expr.params[0]).evaluate(e, t).type) {
      case "ERROR":
        return I.mr();
      case "UNSET":
        return I.newValue(Pe);
      default:
        return I.newValue(Xe);
    }
  }
}
class mD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 3, 11706);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "BOOLEAN":
        return n.value?.booleanValue ? W(this.expr.params[1]).evaluate(e, t) : W(this.expr.params[2]).evaluate(e, t);
      case "NULL":
        return W(this.expr.params[2]).evaluate(e, t);
      default:
        return I.mr();
    }
  }
}
class ED {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    const n = this.expr.params.map(((i) => W(i).evaluate(e, t)));
    let s;
    for (const i of n) switch (i.type) {
      case "ERROR":
      case "UNSET":
      case "NULL":
        continue;
      default:
        s = s === void 0 || Ze(i.value, s.value) > 0 ? i : s;
    }
    return s === void 0 ? I.gr() : s;
  }
}
class DD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    const n = this.expr.params.map(((i) => W(i).evaluate(e, t)));
    let s;
    for (const i of n) switch (i.type) {
      case "ERROR":
      case "UNSET":
      case "NULL":
        continue;
      default:
        s = s === void 0 || Ze(i.value, s.value) < 0 ? i : s;
    }
    return s === void 0 ? I.gr() : s;
  }
}
class lr {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 31033, `${this.expr.name}() function should have exactly 2 params`);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "ERROR":
      case "UNSET":
        return I.mr();
    }
    const s = W(this.expr.params[1]).evaluate(e, t);
    switch (s.type) {
      case "ERROR":
      case "UNSET":
        return I.mr();
    }
    return this.Fr(n, s);
  }
}
class _D extends lr {
  constructor(e) {
    super(e), this.expr = e;
  }
  Fr(e, t) {
    if (e.wr() && t.wr()) return I.newValue(Xe);
    if (e.wr() || t.wr() || et(e.value) || et(t.value) || ve(e.value) !== ve(t.value)) return I.newValue(Pe);
    switch (Ft(e.value, t.value)) {
      case "EQ":
        return I.newValue(Xe);
      case "NOT_EQ":
        return I.newValue(Pe);
      case "NULL":
        return I.gr();
      default:
        X(44615, {
          left: e,
          right: t
        });
    }
  }
}
class yD extends lr {
  constructor(e) {
    super(e), this.expr = e;
  }
  Fr(e, t) {
    switch (Ft(e.value, t.value)) {
      case "EQ":
        return I.newValue(Pe);
      case "NOT_EQ":
      case "TYPE_MISMATCH":
        return I.newValue(Xe);
      case "NULL":
        return I.gr();
      default:
        X(44614, {
          left: e,
          right: t
        });
    }
  }
}
class ID extends lr {
  constructor(e) {
    super(e), this.expr = e;
  }
  Fr(e, t) {
    return ve(e.value) !== ve(t.value) || et(e.value) || et(t.value) ? I.newValue(Pe) : I.newValue({
      booleanValue: Ze(e.value, t.value) < 0
    });
  }
}
class wD extends lr {
  constructor(e) {
    super(e), this.expr = e;
  }
  Fr(e, t) {
    return ve(e.value) !== ve(t.value) || et(e.value) || et(t.value) ? I.newValue(Pe) : Ft(e.value, t.value) === "EQ" ? I.newValue(Xe) : I.newValue({
      booleanValue: Ze(e.value, t.value) < 0
    });
  }
}
class TD extends lr {
  constructor(e) {
    super(e), this.expr = e;
  }
  Fr(e, t) {
    return ve(e.value) !== ve(t.value) || et(e.value) || et(t.value) ? I.newValue(Pe) : I.newValue({
      booleanValue: Ze(e.value, t.value) > 0
    });
  }
}
class AD extends lr {
  constructor(e) {
    super(e), this.expr = e;
  }
  Fr(e, t) {
    return ve(e.value) !== ve(t.value) || et(e.value) || et(t.value) ? I.newValue(Pe) : Ft(e.value, t.value) === "EQ" ? I.newValue(Xe) : I.newValue({
      booleanValue: Ze(e.value, t.value) > 0
    });
  }
}
class vD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    throw new Error("Unimplemented");
  }
}
class RD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 216);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "NULL":
        return I.gr();
      case "ARRAY": {
        const s = n.value.arrayValue?.values ?? [];
        return I.newValue({
          arrayValue: {
            values: [...s].reverse()
          }
        });
      }
      default:
        return I.mr();
    }
  }
}
class bD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    return $(this.expr.params.length === 2, 52884), new aC(new P("eq_any", [this.expr.params[1], this.expr.params[0]])).evaluate(e, t);
  }
}
class OD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 1392);
    let n = !1;
    const s = W(this.expr.params[0]).evaluate(e, t);
    switch (s.type) {
      case "ARRAY":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    const i = W(this.expr.params[1]).evaluate(e, t);
    switch (i.type) {
      case "ARRAY":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    if (n) return I.gr();
    const o = i.value?.arrayValue?.values ?? [], B = s.value?.arrayValue?.values ?? [];
    for (const u of o) {
      let c = !1;
      n = !1;
      for (const C of B) {
        switch (ot(u) && ot(C) ? "EQ" : Ft(u, C)) {
          case "EQ":
            c = !0;
            break;
          case "NOT_EQ":
          case "TYPE_MISMATCH":
            break;
          case "NULL":
            n = !0;
            break;
          default:
            X(44613, {
              value: C,
              search: u
            });
        }
        if (c)
          break;
      }
      if (!c)
        return I.newValue(Pe);
    }
    return I.newValue(Xe);
  }
}
class SD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 2680);
    let n = !1;
    const s = W(this.expr.params[0]).evaluate(e, t);
    switch (s.type) {
      case "ARRAY":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    const i = W(this.expr.params[1]).evaluate(e, t);
    switch (i.type) {
      case "ARRAY":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    if (n) return I.gr();
    const o = i.value?.arrayValue?.values ?? [], B = s.value?.arrayValue?.values ?? [];
    for (const u of B) for (const c of o)
      switch (ot(u) && ot(c) ? "EQ" : Ft(u, c)) {
        case "EQ":
          return I.newValue(Xe);
        case "NOT_EQ":
        case "TYPE_MISMATCH":
          break;
        case "NULL":
          n = !0;
          break;
        default:
          X(60403, {
            value: u,
            search: c
          });
      }
    return n ? I.gr() : I.newValue(Pe);
  }
}
class ND {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 38605);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "NULL":
        return I.gr();
      case "ARRAY":
        return I.newValue({
          integerValue: `${n.value?.arrayValue?.values?.length ?? 0}`
        });
      default:
        return I.mr();
    }
  }
}
class FD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    throw new Error("Unimplemented");
  }
}
class PD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 1508);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "NULL":
        return I.gr();
      case "BYTES": {
        const s = n.value?.bytesValue;
        if (typeof s == "string") {
          const i = Ae.fromBase64String(s).toUint8Array();
          return i.reverse(), I.newValue({
            bytesValue: Ae.fromUint8Array(i).toBase64()
          });
        }
        return I.newValue({
          bytesValue: new Uint8Array(s).reverse()
        });
      }
      case "STRING": {
        const s = n.value?.stringValue, i = new Intl.__PRIVATE_Segmenter(void 0, {
          granularity: "grapheme"
        }).segment(s), o = Array.from(i, ((B) => B.segment)).reverse();
        return I.newValue({
          stringValue: o.join("")
        });
      }
      default:
        return I.mr();
    }
  }
}
class LD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    throw new Error("Unimplemented");
  }
}
class xD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    throw new Error("Unimplemented");
  }
}
class VD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 19400);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "NULL":
        return I.gr();
      case "STRING": {
        const s = (function(o) {
          let B = 0;
          for (let u = 0; u < o.length; u++) {
            const c = o.codePointAt(u);
            if (c === void 0) return;
            if (c <= 65535)
              if (c >= 55296 && c <= 57343)
                if (c <= 56319) {
                  const C = o.codePointAt(u + 1);
                  C !== void 0 && C >= 56320 && C <= 57343 ? (
                    // Valid surrogate pair (counts as one character)
                    (B += 1, u++)
                  ) : (
                    // Lone high surrogate - treat as one character for length, but invalid for byte length
                    B += 1
                  );
                } else
                  B += 1;
              else
                B += 1;
            else {
              if (!(c <= 1114111)) return;
              B += 1, u++;
            }
          }
          return B;
        })(n.value.stringValue);
        return s === void 0 ? I.mr() : I.newValue({
          integerValue: s
        });
      }
      default:
        return I.mr();
    }
  }
}
class MD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 8486);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "BYTES": {
        const s = n.value?.bytesValue;
        return typeof s == "string" ? I.newValue({
          integerValue: Ae.fromBase64String(s).toUint8Array().length
        }) : I.newValue({
          integerValue: new Uint8Array(s).length
        });
      }
      case "STRING": {
        const s = (function(o) {
          let B = 0;
          for (let u = 0; u < o.length; u++) {
            const c = o.codePointAt(u);
            if (c === void 0) return;
            if (c >= 55296 && c <= 57343) {
              if (!(c <= 56319)) return;
              {
                const C = o.codePointAt(u + 1);
                if (C === void 0 || !(C >= 56320 && C <= 57343)) return;
                B += 4, u++;
              }
            } else if (c <= 127) B += 1;
            else if (c <= 2047) B += 2;
            else if (c <= 65535) B += 3;
            else {
              if (!(c <= 1114111)) return;
              B += 4, u++;
            }
          }
          return B;
        })(n.value?.stringValue);
        return s === void 0 ? I.mr() : I.newValue({
          integerValue: s
        });
      }
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class cr {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 39773, `${this.expr.name}() function should have exactly two parameters`);
    let n = !1;
    const s = W(this.expr.params[0]).evaluate(e, t);
    switch (s.type) {
      case "STRING":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    const i = W(this.expr.params[1]).evaluate(e, t);
    switch (i.type) {
      case "STRING":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    return n ? I.gr() : this.Or(s.value?.stringValue, i.value?.stringValue);
  }
}
class GD extends cr {
  Or(e, t) {
    try {
      const n = (function(o) {
        let B = "";
        for (let u = 0; u < o.length; u++) {
          const c = o.charAt(u);
          switch (c) {
            case "_":
              B += ".";
              break;
            case "%":
              B += ".*";
              break;
            // Escape regex special characters
            case "\\":
            // Need to escape backslash itself
            case ".":
            case "*":
            case "?":
            case "+":
            case "^":
            case "$":
            case "|":
            case "(":
            case ")":
            case "[":
            case "]":
            case "{":
            case "}":
              B += "\\" + c;
              break;
            default:
              B += c;
          }
        }
        return "^" + B + "$";
      })(t), s = _a.compile(n);
      return I.newValue({
        booleanValue: s.matches(e)
      });
    } catch (n) {
      return dt(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${n}`), I.mr();
    }
  }
}
class kD extends cr {
  Or(e, t) {
    try {
      const n = _a.compile(t);
      return I.newValue({
        booleanValue: n.test(e)
      });
    } catch {
      return dt(`Invalid regex pattern found in regex_contains: ${t}, returning error`), I.mr();
    }
  }
}
class HD extends cr {
  Or(e, t) {
    try {
      return I.newValue({
        booleanValue: _a.compile(t).matches(e)
      });
    } catch {
      return dt(`Invalid regex pattern found in regex_match: ${t}, returning error`), I.mr();
    }
  }
}
class UD extends cr {
  Or(e, t) {
    return I.newValue({
      booleanValue: e.includes(t)
    });
  }
}
class jD extends cr {
  Or(e, t) {
    return I.newValue({
      booleanValue: e.startsWith(t)
    });
  }
}
class JD extends cr {
  Or(e, t) {
    return I.newValue({
      booleanValue: e.endsWith(t)
    });
  }
}
class qD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 29079);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "STRING":
        return I.newValue({
          stringValue: n.value?.stringValue?.toLowerCase()
        });
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class KD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 60487);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "STRING":
        return I.newValue({
          stringValue: n.value?.stringValue?.toUpperCase()
        });
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class QD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 28544);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "STRING":
        return I.newValue({
          stringValue: n.value?.stringValue?.trim()
        });
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class zD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    const n = this.expr.params.map(((o) => W(o).evaluate(e, t)));
    let s = "", i = !1;
    for (const o of n) switch (o.type) {
      case "STRING":
        s += o.value.stringValue;
        break;
      case "NULL":
        i = !0;
        break;
      default:
        return I.mr();
    }
    return i ? I.gr() : I.newValue({
      stringValue: s
    });
  }
}
class $D {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 4483);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "UNSET":
        return I.pr();
      case "MAP":
        break;
      default:
        return I.mr();
    }
    const s = W(this.expr.params[1]).evaluate(e, t);
    if (s.type !== "STRING") return I.mr();
    const i = n.value?.mapValue?.fields?.[s.value?.stringValue];
    return i === void 0 ? I.pr() : I.newValue(i);
  }
}
class Ua {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 2, 25231, `${this.expr.name}() function should have exactly 2 params`);
    let n = !1;
    const s = W(this.expr.params[0]).evaluate(e, t);
    switch (s.type) {
      case "VECTOR":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    const i = W(this.expr.params[1]).evaluate(e, t);
    switch (i.type) {
      case "VECTOR":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    if (n) return I.gr();
    const o = ea(s.value), B = ea(i.value);
    if (o === void 0 || B === void 0 || o.values?.length !== B.values?.length) return I.mr();
    const u = this.Mr(o, B);
    return u === void 0 || isNaN(u) ? I.mr() : I.newValue({
      doubleValue: u
    });
  }
}
class YD extends Ua {
  Mr(e, t) {
    const n = e?.values ?? [], s = t?.values ?? [];
    if (n.length === 0) return;
    let i = 0, o = 0, B = 0;
    for (let c = 0; c < n.length; c++) {
      if (!nn(n[c]) || !nn(s[c])) return;
      const C = xe(n[c]), f = xe(s[c]);
      i += C * f, o += C * C, B += f * f;
    }
    const u = Math.sqrt(o) * Math.sqrt(B);
    if (u !== 0)
      return 1 - Math.max(-1, Math.min(1, i / u));
  }
}
class WD extends Ua {
  Mr(e, t) {
    const n = e?.values ?? [], s = t?.values ?? [];
    if (n.length === 0) return 0;
    let i = 0;
    for (let o = 0; o < n.length; o++) {
      if (!nn(n[o]) || !nn(s[o])) return;
      i += xe(n[o]) * xe(s[o]);
    }
    return i;
  }
}
class XD extends Ua {
  Mr(e, t) {
    const n = e?.values ?? [], s = t?.values ?? [];
    if (n.length === 0) return 0;
    let i = 0;
    for (let o = 0; o < n.length; o++) {
      if (!nn(n[o]) || !nn(s[o])) return;
      const B = xe(n[o]), u = xe(s[o]);
      i += Math.pow(B - u, 2);
    }
    return Math.sqrt(i);
  }
}
class ZD {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 39044);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "VECTOR": {
        const s = ea(n.value);
        return I.newValue({
          integerValue: s?.values?.length ?? 0
        });
      }
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
const is = BigInt(-62135596800), os = BigInt(253402300799), fi = BigInt(1e3), Zt = BigInt(1e6), e_ = is * fi, t_ = os * fi + BigInt(999), n_ = is * Zt, r_ = os * Zt + BigInt(999999);
function ja(r) {
  return r >= n_ && r <= r_;
}
function BC(r) {
  return r >= is && r <= os;
}
function as(r, e) {
  const t = BigInt(r);
  return !(t < is || t > os) && // Nanos must be non-negative and less than 1 second
  !(e < 0 || e >= 1e9) && // Additional check for min/max boundaries
  (t !== is || e === 0) && !(t === os && e > 999999999);
}
function uC(r, e) {
  return e < 0 ? {
    seconds: r - 1,
    nanos: e + 1e9
  } : {
    seconds: r,
    nanos: e
  };
}
function Ja(r) {
  return BigInt(r.seconds) * Zt + // Integer division truncates towards zero
  BigInt(Math.trunc(r.nanoseconds / 1e3));
}
class qa {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 49262, `${this.expr.name}() function should have exactly one parameter`);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "INT":
        return this.toTimestamp(BigInt(n.value.integerValue));
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
  }
}
class s_ extends qa {
  toTimestamp(e) {
    if (!ja(e)) return I.mr();
    let t = Number(e / Zt), n = Number(e % Zt * BigInt(1e3));
    const s = uC(t, n);
    return t = s.seconds, n = s.nanos, as(t, n) ? I.newValue({
      timestampValue: {
        seconds: t,
        nanos: n
      }
    }) : I.mr();
  }
}
class i_ extends qa {
  toTimestamp(e) {
    if (!(function(o) {
      return o >= e_ && o <= t_;
    })(e)) return I.mr();
    let t = Number(e / fi), n = Number(e % fi * BigInt(1e6));
    const s = uC(t, n);
    return t = s.seconds, n = s.nanos, as(t, n) ? I.newValue({
      timestampValue: {
        seconds: t,
        nanos: n
      }
    }) : I.mr();
  }
}
class o_ extends qa {
  toTimestamp(e) {
    if (!BC(e)) return I.mr();
    const t = Number(e);
    return I.newValue({
      timestampValue: {
        seconds: t,
        nanos: 0
      }
    });
  }
}
class Ka {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 1, 1265, `${this.expr.name}() function should have exactly one parameter`);
    const n = W(this.expr.params[0]).evaluate(e, t);
    switch (n.type) {
      case "TIMESTAMP":
        break;
      case "NULL":
        return I.gr();
      default:
        return I.mr();
    }
    const s = Na(n.value.timestampValue);
    return as(s.seconds, s.nanoseconds) ? this.Nr(s) : I.mr();
  }
}
class a_ extends Ka {
  Nr(e) {
    const t = Ja(e);
    return ja(t) ? I.newValue({
      integerValue: `${t.toString()}`
    }) : I.mr();
  }
}
class B_ extends Ka {
  Nr(e) {
    const t = Ja(e), n = t / BigInt(1e3), s = t % BigInt(1e3);
    return n > BigInt(0) || s === BigInt(0) ? I.newValue({
      integerValue: n.toString()
    }) : I.newValue({
      integerValue: (n - BigInt(1)).toString()
    });
  }
}
class u_ extends Ka {
  Nr(e) {
    const t = BigInt(e.seconds);
    return BC(t) ? I.newValue({
      integerValue: t.toString()
    }) : I.mr();
  }
}
class lC {
  constructor(e) {
    this.expr = e;
  }
  evaluate(e, t) {
    $(this.expr.params.length === 3, 2775, `${this.expr.name}() function should have exactly 3 parameters`);
    let n = !1;
    const s = W(this.expr.params[0]).evaluate(e, t);
    switch (s.type) {
      case "TIMESTAMP":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    const i = W(this.expr.params[1]).evaluate(e, t);
    let o;
    switch (i.type) {
      case "STRING":
        if (o = (function(ue) {
          switch (ue) {
            case "microsecond":
              return "microsecond";
            case "millisecond":
              return "millisecond";
            case "second":
              return "second";
            case "minute":
              return "minute";
            case "hour":
              return "hour";
            case "day":
              return "day";
            default:
              return;
          }
        })(i.value.stringValue), o === void 0) return I.mr();
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    const B = W(this.expr.params[2]).evaluate(e, t);
    switch (B.type) {
      case "INT":
        break;
      case "NULL":
        n = !0;
        break;
      default:
        return I.mr();
    }
    if (n) return I.gr();
    const u = BigInt(B.value.integerValue);
    let c;
    try {
      switch (o) {
        case "microsecond":
          c = u;
          break;
        case "millisecond":
          c = u * BigInt(1e3);
          break;
        case "second":
          c = u * BigInt(1e6);
          break;
        case "minute":
          c = u * BigInt(6e7);
          break;
        case "hour":
          c = u * BigInt(36e8);
          break;
        case "day":
          c = u * BigInt(864e8);
          break;
        default:
          return I.mr();
      }
      if (o !== "microsecond" && u !== BigInt(0) && c / u !== BigInt(this.Lr(o))) return I.mr();
    } catch (z) {
      return dt(`Error during timestamp arithmetic: ${z}`), I.mr();
    }
    const C = Na(s.value.timestampValue);
    if (!as(C.seconds, C.nanoseconds)) return I.mr();
    const f = Ja(C), m = this.Br(f, c);
    if (!ja(m)) return I.mr();
    const y = Number(m / Zt), b = m % Zt, V = Number((b < 0 ? b + Zt : b) * BigInt(1e3)), j = b < 0 ? y - 1 : y;
    return as(j, V) ? I.newValue({
      timestampValue: {
        seconds: j,
        nanos: V
      }
    }) : I.mr();
  }
  Lr(e) {
    switch (e) {
      case "millisecond":
        return 1e3;
      case "second":
        return 1e6;
      case "minute":
        return 6e7;
      case "hour":
        return 36e8;
      case "day":
        return 864e8;
      default:
        return 1;
    }
  }
}
class l_ extends lC {
  Br(e, t) {
    return e + t;
  }
}
class c_ extends lC {
  Br(e, t) {
    return e - t;
  }
}
function Bs(r) {
  if ((r = oC(r)) instanceof Br) return `fld(${r.fieldName})`;
  if (r instanceof ur) return `cst(${(function(t) {
    return t === null ? "null" : typeof t == "number" ? t.toString() : typeof t == "string" ? `"${t}"` : t instanceof we ? `ref(${t.path})` : t instanceof We ? `vec(${JSON.stringify(t)})` : JSON.stringify(t);
  })(r.value)})`;
  if (r instanceof P) return `fn(${r.name},[${r.params.map(Bs).join(",")}])`;
  if (r.expressionType === "ListOfExpressions") return `list([${r.cr.map(Bs).join(",")}])`;
  throw new Error(`Unrecognized expr ${JSON.stringify(r, null, 2)}`);
}
function h_(r) {
  if (r instanceof rC) return `${r._name}(${qs(r.fields)})`;
  if (r instanceof sC) {
    let e = `${r._name}(${qs(r.accumulators)})`;
    return r.groups.size > 0 && (e += `grouping(${qs(r.groups)})`), e;
  }
  if (r instanceof iC) return `${r._name}(${qs(r.groups)})`;
  if (r instanceof Oi) return `${r._name}(${r.hr})`;
  if (r instanceof Si) return `${r._name}(${r.collectionId})`;
  if (r instanceof Va) return `${r._name}()`;
  if (r instanceof Ma) return `${r._name}(${r.Tr.sort()})`;
  if (r instanceof Ni) return `${r._name}(${Bs(r.condition)})`;
  if (r instanceof Rn) return `${r._name}(${r.limit})`;
  if (r instanceof Rt) return `${r._name}(${(function(t) {
    return t.map(((n) => `${Bs(n.expr)}${n.direction}`)).join(",");
  })(r.orderings)})`;
  throw new Error(`Unrecognized stage ${r._name}`);
}
function qs(r) {
  return `${Array.from(r.entries()).sort().map((([e, t]) => `${e}=${Bs(t)}`)).join(",")}`;
}
function Ot(r) {
  return r.stages.map(((e) => h_(e))).join("|");
}
function cC(r, e) {
  return Ot(r) === Ot(e);
}
function Oe(r) {
  return r instanceof qe;
}
function Wl(r) {
  return Oe(r) ? Ot(r) : Hr(r);
}
function hC(r) {
  return Oe(r) ? Ot(r) : (function(t) {
    return `${wh(It(t))}|lt:${t.limitType}`;
  })(r);
}
function Li(r, e) {
  return r instanceof qe && e instanceof qe ? cC(r, e) : !(r instanceof qe && !(e instanceof qe) || !(r instanceof qe) && e instanceof qe) && Nm(r, e);
}
function CC(r) {
  return mn(r) ? Ot(r) : wh(r);
}
function fC(r, e) {
  return r instanceof qe && e instanceof qe ? cC(r, e) : !(r instanceof qe && !(e instanceof qe) || !(r instanceof qe) && e instanceof qe) && Th(r, e);
}
function C_(r, e) {
  const t = (function(s) {
    let i = !1;
    const o = [];
    for (const B of s)
      if (B instanceof Rt)
        if (i = !0, B.orderings.some(((u) => u.expr instanceof Br && u.expr.fieldName === _t))) o.push(B);
        else {
          const u = B.orderings.map(((c) => c));
          u.push(Xs(_t).ascending()), o.push(new Rt(u, {}));
        }
      else B instanceof Rn && (i || (o.push(new Rt([Xs(_t).ascending()], {})), i = !0)), o.push(B);
    return i || o.push(new Rt([Xs(_t).ascending()], {})), o;
  })(r.stages);
  if (r.userDataReader) {
    const n = r.userDataReader.createContext(3, "toCorePipeline");
    t.forEach(((s) => s._readUserData(n)));
  }
  return new qe(r.userDataReader.serializer, t, e);
}
class f_ {
  /**
   * @param batchId - The unique ID of this mutation batch.
   * @param localWriteTime - The original write time of this mutation.
   * @param baseMutations - Mutations that are used to populate the base
   * values when this mutation is applied locally. This can be used to locally
   * overwrite values that are persisted in the remote document cache. Base
   * mutations are never sent to the backend.
   * @param mutations - The user-provided mutations in this mutation batch.
   * User-provided mutations are applied both locally and remotely on the
   * backend.
   */
  constructor(e, t, n, s) {
    this.batchId = e, this.localWriteTime = t, this.baseMutations = n, this.mutations = s;
  }
  /**
   * Applies all the mutations in this MutationBatch to the specified document
   * to compute the state of the remote document
   *
   * @param document - The document to apply mutations to.
   * @param batchResult - The result of applying the MutationBatch to the
   * backend.
   */
  applyToRemoteDocument(e, t) {
    const n = t.mutationResults;
    for (let s = 0; s < this.mutations.length; s++) {
      const i = this.mutations[s];
      i.key.isEqual(e.key) && fm(i, e, n[s]);
    }
  }
  /**
   * Computes the local view of a document given all the mutations in this
   * batch.
   *
   * @param document - The document to apply mutations to.
   * @param mutatedFields - Fields that have been updated before applying this mutation batch.
   * @returns A `FieldMask` representing all the fields that are mutated.
   */
  applyToLocalView(e, t) {
    for (const n of this.baseMutations) n.key.isEqual(e.key) && (t = Gr(n, e, t, this.localWriteTime));
    for (const n of this.mutations) n.key.isEqual(e.key) && (t = Gr(n, e, t, this.localWriteTime));
    return t;
  }
  /**
   * Computes the local view for all provided documents given the mutations in
   * this batch. Returns a `DocumentKey` to `Mutation` map which can be used to
   * replace all the mutation applications.
   */
  applyToLocalDocumentSet(e, t) {
    const n = Oh();
    return this.mutations.forEach(((s) => {
      const i = e.get(s.key), o = i.overlayedDocument;
      let B = this.applyToLocalView(o, i.mutatedFields);
      B = t.has(s.key) ? null : B;
      const u = gh(o, B);
      u !== null && n.set(s.key, u), o.isValidDocument() || o.convertToNoDocument(Z.min());
    })), n;
  }
  keys() {
    return this.mutations.reduce(((e, t) => e.add(t.key)), ne());
  }
  isEqual(e) {
    return this.batchId === e.batchId && $n(this.mutations, e.mutations, ((t, n) => Rl(t, n))) && $n(this.baseMutations, e.baseMutations, ((t, n) => Rl(t, n)));
  }
}
const dC = "";
function d_(r) {
  let e = "";
  for (let t = 0; t < r.length; t++) e.length > 0 && (e = Xl(e)), e = g_(r.get(t), e);
  return Xl(e);
}
function g_(r, e) {
  let t = e;
  const n = r.length;
  for (let s = 0; s < n; s++) {
    const i = r.charAt(s);
    switch (i) {
      case "\0":
        t += "";
        break;
      case dC:
        t += "";
        break;
      default:
        t += i;
    }
  }
  return t;
}
function Xl(r) {
  return r + dC + "";
}
class p_ {
  constructor(e, t) {
    this.largestBatchId = e, this.mutation = t;
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(e) {
    return e !== null && this.mutation === e.mutation;
  }
  toString() {
    return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
  }
}
class bt {
  constructor(e, t, n, s, i = Z.min(), o = Z.min(), B = Ae.EMPTY_BYTE_STRING, u = null) {
    this.target = e, this.targetId = t, this.purpose = n, this.sequenceNumber = s, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = o, this.resumeToken = B, this.expectedCount = u;
  }
  /** Creates a new target data instance with an updated sequence number. */
  withSequenceNumber(e) {
    return new bt(this.target, this.targetId, this.purpose, e, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, this.expectedCount);
  }
  /**
   * Creates a new target data instance with an updated resume token and
   * snapshot version.
   */
  withResumeToken(e, t) {
    return new bt(
      this.target,
      this.targetId,
      this.purpose,
      this.sequenceNumber,
      t,
      this.lastLimboFreeSnapshotVersion,
      e,
      /* expectedCount= */
      null
    );
  }
  /**
   * Creates a new target data instance with an updated expected count.
   */
  withExpectedCount(e) {
    return new bt(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken, e);
  }
  /**
   * Creates a new target data instance with an updated last limbo free
   * snapshot version number.
   */
  withLastLimboFreeSnapshotVersion(e) {
    return new bt(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, e, this.resumeToken, this.expectedCount);
  }
}
class m_ {
  constructor(e) {
    this.$r = e;
  }
}
function E_(r) {
  const e = Xm({
    parent: r.parent,
    structuredQuery: r.structuredQuery
  });
  return r.limitType === "LAST" ? oa(
    e,
    e.limit,
    "L"
    /* LimitType.Last */
  ) : e;
}
class D_ {
  constructor() {
    this.Zi = new __();
  }
  addToCollectionParentIndex(e, t) {
    return this.Zi.add(t), L.resolve();
  }
  getCollectionParents(e, t) {
    return L.resolve(this.Zi.getEntries(t));
  }
  addFieldIndex(e, t) {
    return L.resolve();
  }
  deleteFieldIndex(e, t) {
    return L.resolve();
  }
  deleteAllFieldIndexes(e) {
    return L.resolve();
  }
  createTargetIndexes(e, t) {
    return L.resolve();
  }
  getDocumentsMatchingTarget(e, t) {
    return L.resolve(null);
  }
  getIndexType(e, t) {
    return L.resolve(
      0
      /* IndexType.NONE */
    );
  }
  getFieldIndexes(e, t) {
    return L.resolve([]);
  }
  getNextCollectionGroupToUpdate(e) {
    return L.resolve(null);
  }
  getMinOffset(e, t) {
    return L.resolve(rn.min());
  }
  getMinOffsetFromCollectionGroup(e, t) {
    return L.resolve(rn.min());
  }
  updateCollectionGroup(e, t, n) {
    return L.resolve();
  }
  updateIndexEntries(e, t) {
    return L.resolve();
  }
}
class __ {
  constructor() {
    this.index = {};
  }
  // Returns false if the entry already existed.
  add(e) {
    const t = e.lastSegment(), n = e.popLast(), s = this.index[t] || new Te(Be.comparator), i = !s.has(n);
    return this.index[t] = s.add(n), i;
  }
  has(e) {
    const t = e.lastSegment(), n = e.popLast(), s = this.index[t];
    return s && s.has(n);
  }
  getEntries(e) {
    return (this.index[e] || new Te(Be.comparator)).toArray();
  }
}
class an {
  constructor(e) {
    this.ys = e;
  }
  next() {
    return this.ys += 2, this.ys;
  }
  static ws() {
    return new an(0);
  }
  static bs() {
    return new an(-1);
  }
}
function gC(r, e) {
  let t = e;
  for (const n of r.stages) t = I_({
    serializer: r.serializer,
    serverTimestampBehavior: r.listenOptions?.serverTimestampBehavior
  }, n, t);
  return t;
}
function xi(r, e) {
  return gC(r, [e]).length > 0;
}
function y_(r, e) {
  return Oe(r) ? xi(r, e) : wi(r, e);
}
function I_(r, e, t) {
  if (e instanceof Oi) return (function(s, i, o) {
    return o.filter(((B) => B.isFoundDocument() && `/${B.key.getCollectionPath().canonicalString()}` === i.hr));
  })(0, e, t);
  if (e instanceof Ni) return (function(s, i, o) {
    return o.filter(((B) => {
      const u = qr(W(i.condition).evaluate(s, B));
      return u !== void 0 && Ct(u, Xe);
    }));
  })(r, e, t);
  if (e instanceof Si) return (function(s, i, o) {
    return o.filter(((B) => B.isFoundDocument() && B.key.getCollectionPath().lastSegment() === i.collectionId));
  })(0, e, t);
  if (e instanceof Va) return (function(s, i, o) {
    return o.filter(((B) => B.isFoundDocument()));
  })(0, 0, t);
  if (e instanceof Ma) return (function(s, i, o) {
    return o.filter(((B) => B.isFoundDocument() && i.Pr.has(B.key.path.toStringWithLeadingSlash())));
  })(0, e, t);
  if (e instanceof Rn) return (function(s, i, o) {
    return o.slice(0, i.limit);
  })(0, e, t);
  if (e instanceof Rt) return (function(s, i, o) {
    const B = i.orderings.map(((u) => ({
      Ms: W(u.expr),
      direction: u.direction
    })));
    return [...o].sort(((u, c) => {
      for (const { Ms: C, direction: f } of B) {
        const m = qr(C.evaluate(s, u)), y = qr(C.evaluate(s, c)), b = Ze(m ?? Wn, y ?? Wn);
        if (b !== 0)
          return f === "ascending" ? b : -b;
      }
      return 0;
    }));
  })(r, e, t);
  throw new Error(`Unknown stage: ${e._name}`);
}
function ca(r) {
  const e = (function(n) {
    for (let s = n.stages.length - 1; s >= 0; s--) {
      const i = n.stages[s];
      if (i instanceof Rt) return i.orderings;
    }
    throw new Error("Pipeline must contain at least one Sort stage");
  })(r);
  return (t, n) => {
    for (const s of e) {
      const i = qr(W(s.expr).evaluate({
        serializer: r.serializer
      }, t)), o = qr(W(s.expr).evaluate({
        serializer: r.serializer
      }, n)), B = Ze(i || Wn, o || Wn);
      if (B !== 0) return s.direction === "ascending" ? B : -B;
    }
    return 0;
  };
}
function vo(r) {
  for (let e = r.stages.length - 1; e >= 0; e--) {
    const t = r.stages[e];
    if (t instanceof Rn) return {
      limit: t.limit
    };
  }
}
class w_ {
  constructor() {
    this.changes = new bn(((e) => e.toString()), ((e, t) => e.isEqual(t))), this.changesApplied = !1;
  }
  /**
   * Buffers a `RemoteDocumentCache.addEntry()` call.
   *
   * You can only modify documents that have already been retrieved via
   * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
   */
  addEntry(e) {
    this.assertNotApplied(), this.changes.set(e.key, e);
  }
  /**
   * Buffers a `RemoteDocumentCache.removeEntry()` call.
   *
   * You can only remove documents that have already been retrieved via
   * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
   */
  removeEntry(e, t) {
    this.assertNotApplied(), this.changes.set(e, ke.newInvalidDocument(e).setReadTime(t));
  }
  /**
   * Looks up an entry in the cache. The buffered changes will first be checked,
   * and if no buffered change applies, this will forward to
   * `RemoteDocumentCache.getEntry()`.
   *
   * @param transaction - The transaction in which to perform any persistence
   *     operations.
   * @param documentKey - The key of the entry to look up.
   * @returns The cached document or an invalid document if we have nothing
   * cached.
   */
  getEntry(e, t) {
    this.assertNotApplied();
    const n = this.changes.get(t);
    return n !== void 0 ? L.resolve(n) : this.getFromCache(e, t);
  }
  /**
   * Looks up several entries in the cache, forwarding to
   * `RemoteDocumentCache.getEntry()`.
   *
   * @param transaction - The transaction in which to perform any persistence
   *     operations.
   * @param documentKeys - The keys of the entries to look up.
   * @returns A map of cached documents, indexed by key. If an entry cannot be
   *     found, the corresponding key will be mapped to an invalid document.
   */
  getEntries(e, t) {
    return this.getAllFromCache(e, t);
  }
  /**
   * Applies buffered changes to the underlying RemoteDocumentCache, using
   * the provided transaction.
   */
  apply(e) {
    return this.assertNotApplied(), this.changesApplied = !0, this.applyChanges(e);
  }
  /** Helper to assert this.changes is not null  */
  assertNotApplied() {
  }
}
class T_ {
  constructor(e, t) {
    this.overlayedDocument = e, this.mutatedFields = t;
  }
}
class A_ {
  constructor(e, t, n, s) {
    this.remoteDocumentCache = e, this.mutationQueue = t, this.documentOverlayCache = n, this.indexManager = s;
  }
  /**
   * Get the local view of the document identified by `key`.
   *
   * @returns Local view of the document or null if we don't have any cached
   * state for it.
   */
  getDocument(e, t) {
    let n = null;
    return this.documentOverlayCache.getOverlay(e, t).next(((s) => (n = s, this.remoteDocumentCache.getEntry(e, t)))).next(((s) => (n !== null && Gr(n.mutation, s, Kt.empty(), le.now()), s)));
  }
  /**
   * Gets the local view of the documents identified by `keys`.
   *
   * If we don't have cached state for a document in `keys`, a NoDocument will
   * be stored for that key in the resulting set.
   */
  getDocuments(e, t) {
    return this.remoteDocumentCache.getEntries(e, t).next(((n) => this.getLocalViewOfDocuments(e, n, ne()).next((() => n))));
  }
  /**
   * Similar to `getDocuments`, but creates the local view from the given
   * `baseDocs` without retrieving documents from the local store.
   *
   * @param transaction - The transaction this operation is scoped to.
   * @param docs - The documents to apply local mutations to get the local views.
   * @param existenceStateChanged - The set of document keys whose existence state
   *   is changed. This is useful to determine if some documents overlay needs
   *   to be recalculated.
   */
  getLocalViewOfDocuments(e, t, n = ne()) {
    const s = qt();
    return this.populateOverlays(e, s, t).next((() => this.computeViews(e, t, s, n).next(((i) => {
      let o = kn();
      return i.forEach(((B, u) => {
        o = o.insert(B, u.overlayedDocument);
      })), o;
    }))));
  }
  /**
   * Gets the overlayed documents for the given document map, which will include
   * the local view of those documents and a `FieldMask` indicating which fields
   * are mutated locally, `null` if overlay is a Set or Delete mutation.
   */
  getOverlayedDocuments(e, t) {
    const n = qt();
    return this.populateOverlays(e, n, t).next((() => this.computeViews(e, t, n, ne())));
  }
  /**
   * Fetches the overlays for {@code docs} and adds them to provided overlay map
   * if the map does not already contain an entry for the given document key.
   */
  populateOverlays(e, t, n) {
    const s = [];
    return n.forEach(((i) => {
      t.has(i) || s.push(i);
    })), this.documentOverlayCache.getOverlays(e, s).next(((i) => {
      i.forEach(((o, B) => {
        t.set(o, B);
      }));
    }));
  }
  /**
   * Computes the local view for the given documents.
   *
   * @param docs - The documents to compute views for. It also has the base
   *   version of the documents.
   * @param overlays - The overlays that need to be applied to the given base
   *   version of the documents.
   * @param existenceStateChanged - A set of documents whose existence states
   *   might have changed. This is used to determine if we need to re-calculate
   *   overlays from mutation queues.
   * @returns A map represents the local documents view.
   */
  computeViews(e, t, n, s) {
    let i = at();
    const o = Ur(), B = (function() {
      return Ur();
    })();
    return t.forEach(((u, c) => {
      const C = n.get(c.key);
      s.has(c.key) && (C === void 0 || C.mutation instanceof Ii) ? i = i.insert(c.key, c) : C !== void 0 ? (o.set(c.key, C.mutation.getFieldMask()), Gr(C.mutation, c, C.mutation.getFieldMask(), le.now())) : (
        // no overlay exists
        // Using EMPTY to indicate there is no overlay for the document.
        o.set(c.key, Kt.empty())
      );
    })), this.recalculateAndSaveOverlays(e, i).next(((u) => (u.forEach(((c, C) => o.set(c, C))), t.forEach(((c, C) => B.set(c, new T_(C, o.get(c) ?? null)))), B)));
  }
  recalculateAndSaveOverlays(e, t) {
    const n = Ur();
    let s = new me(((o, B) => o - B)), i = ne();
    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e, t).next(((o) => {
      for (const B of o) B.keys().forEach(((u) => {
        const c = t.get(u);
        if (c === null) return;
        let C = n.get(u) || Kt.empty();
        C = B.applyToLocalView(c, C), n.set(u, C);
        const f = (s.get(B.batchId) || ne()).add(u);
        s = s.insert(B.batchId, f);
      }));
    })).next((() => {
      const o = [], B = s.getReverseIterator();
      for (; B.hasNext(); ) {
        const u = B.getNext(), c = u.key, C = u.value, f = Oh();
        C.forEach(((m) => {
          if (!i.has(m)) {
            const y = gh(t.get(m), n.get(m));
            y !== null && f.set(m, y), i = i.add(m);
          }
        })), o.push(this.documentOverlayCache.saveOverlays(e, c, f));
      }
      return L.waitFor(o);
    })).next((() => n));
  }
  /**
   * Recalculates overlays by reading the documents from remote document cache
   * first, and saves them after they are calculated.
   */
  recalculateAndSaveOverlaysForDocumentKeys(e, t) {
    return this.remoteDocumentCache.getEntries(e, t).next(((n) => this.recalculateAndSaveOverlays(e, n)));
  }
  /**
   * Performs a query against the local view of all documents.
   *
   * @param transaction - The persistence transaction.
   * @param query - The query to match documents against.
   * @param offset - Read time and key to start scanning by (exclusive).
   * @param context - A optional tracker to keep a record of important details
   *   during database local query execution.
   */
  getDocumentsMatchingQuery(e, t, n, s) {
    return Oe(t) ? this.getDocumentsMatchingPipeline(e, t, n, s) : Om(t) ? this.getDocumentsMatchingDocumentQuery(e, t.path) : vh(t) ? this.getDocumentsMatchingCollectionGroupQuery(e, t, n, s) : this.getDocumentsMatchingCollectionQuery(e, t, n, s);
  }
  /**
   * Given a collection group, returns the next documents that follow the provided offset, along
   * with an updated batch ID.
   *
   * <p>The documents returned by this method are ordered by remote version from the provided
   * offset. If there are no more remote documents after the provided offset, documents with
   * mutations in order of batch id from the offset are returned. Since all documents in a batch are
   * returned together, the total number of documents returned can exceed {@code count}.
   *
   * @param transaction
   * @param collectionGroup - The collection group for the documents.
   * @param offset - The offset to index into.
   * @param count - The number of documents to return
   * @returns A LocalWriteResult with the documents that follow the provided offset and the last processed batch id.
   */
  getNextDocuments(e, t, n, s) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(e, t, n, s).next(((i) => {
      const o = s - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(e, t, n.largestBatchId, s - i.size) : L.resolve(qt());
      let B = ns, u = i;
      return o.next(((c) => L.forEach(c, ((C, f) => (B < f.largestBatchId && (B = f.largestBatchId), i.get(C) ? L.resolve() : this.remoteDocumentCache.getEntry(e, C).next(((m) => {
        u = u.insert(C, m);
      }))))).next((() => this.populateOverlays(e, c, i))).next((() => this.computeViews(e, u, c, ne()))).next(((C) => ({
        batchId: B,
        changes: xm(C)
      })))));
    }));
  }
  getDocumentsMatchingDocumentQuery(e, t) {
    return this.getDocument(e, new Q(t)).next(((n) => {
      let s = kn();
      return n.isFoundDocument() && (s = s.insert(n.key, n)), s;
    }));
  }
  getDocumentsMatchingCollectionGroupQuery(e, t, n, s) {
    const i = t.collectionGroup;
    let o = kn();
    return this.indexManager.getCollectionParents(e, i).next(((B) => L.forEach(B, ((u) => {
      const c = (function(f, m) {
        return new fs(
          m,
          /*collectionGroup=*/
          null,
          f.explicitOrderBy.slice(),
          f.filters.slice(),
          f.limit,
          f.limitType,
          f.startAt,
          f.endAt
        );
      })(t, u.child(i));
      return this.getDocumentsMatchingCollectionQuery(e, c, n, s).next(((C) => {
        C.forEach(((f, m) => {
          o = o.insert(f, m);
        }));
      }));
    })).next((() => o))));
  }
  getDocumentsMatchingCollectionQuery(e, t, n, s) {
    let i;
    return this.documentOverlayCache.getOverlaysForCollection(e, t.path, n.largestBatchId).next(((o) => (i = o, this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, s)))).next(((o) => this.retrieveMatchingLocalDocuments(i, o, ((B) => wi(t, B)))));
  }
  getDocumentsMatchingPipeline(e, t, n, s) {
    if (Xt(t) === "collection_group") {
      const i = ka(t);
      let o = kn();
      return this.indexManager.getCollectionParents(e, i).next(((B) => L.forEach(B, ((u) => {
        const c = (function(f, m) {
          const y = f.stages.map(((b) => b instanceof Si ? new Oi(m.canonicalString(), {}) : b));
          return new qe(f.serializer, y);
        })(t, u.child(i));
        return this.getDocumentsMatchingPipeline(e, c, n, s).next(((C) => {
          C.forEach(((f, m) => {
            o = o.insert(f, m);
          }));
        }));
      })).next((() => o))));
    }
    {
      let i;
      return this.getOverlaysForPipeline(e, t, n.largestBatchId).next(((o) => {
        switch (i = o, Xt(t)) {
          case "collection":
            return this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, n, i, s);
          case "documents":
            let B = ne();
            for (const u of la(t)) B = B.add(Q.fromPath(u));
            return this.remoteDocumentCache.getEntries(e, B);
          case "database":
            return this.remoteDocumentCache.getAllEntries(e);
          default:
            throw new H("invalid-argument", `Invalid pipeline source to execute offline: ${Ot(t)}`);
        }
      })).next(((o) => this.retrieveMatchingLocalDocuments(i, o, ((B) => xi(t, B)))));
    }
  }
  retrieveMatchingLocalDocuments(e, t, n) {
    e.forEach(((i, o) => {
      const B = o.getKey();
      t.get(B) === null && (t = t.insert(B, ke.newInvalidDocument(B)));
    }));
    let s = kn();
    return t.forEach(((i, o) => {
      const B = e.get(i);
      B !== void 0 && Gr(B.mutation, o, Kt.empty(), le.now()), // Finally, insert the documents that still match the query
      n(o) && (s = s.insert(i, o));
    })), s;
  }
  getOverlaysForPipeline(e, t, n) {
    switch (Xt(t)) {
      case "collection":
        return this.documentOverlayCache.getOverlaysForCollection(e, Be.fromString(Fi(t)), n);
      case "collection_group":
        throw new H("invalid-argument", `Unexpected collection group pipeline: ${Ot(t)}`);
      case "documents":
        return this.documentOverlayCache.getOverlays(e, la(t).map(((s) => Q.fromPath(s))));
      case "database":
        return this.documentOverlayCache.getAllOverlays(e, n);
      default:
        throw new H("invalid-argument", `Failed to get overlays for pipeline: ${Ot(t)}`);
    }
  }
}
class v_ {
  constructor(e) {
    this.serializer = e, this.Qs = /* @__PURE__ */ new Map(), this.Ws = /* @__PURE__ */ new Map();
  }
  getBundleMetadata(e, t) {
    return L.resolve(this.Qs.get(t));
  }
  saveBundleMetadata(e, t) {
    return this.Qs.set(
      t.id,
      /** Decodes a BundleMetadata proto into a BundleMetadata object. */
      (function(s) {
        return {
          id: s.id,
          version: s.version,
          createTime: qn(s.createTime)
        };
      })(t)
    ), L.resolve();
  }
  getNamedQuery(e, t) {
    return L.resolve(this.Ws.get(t));
  }
  saveNamedQuery(e, t) {
    return this.Ws.set(t.name, (function(s) {
      return {
        name: s.name,
        query: E_(s.bundledQuery),
        readTime: qn(s.readTime)
      };
    })(t)), L.resolve();
  }
}
class R_ {
  constructor() {
    this.overlays = new me(Q.comparator), this.Gs = /* @__PURE__ */ new Map();
  }
  getOverlay(e, t) {
    return L.resolve(this.overlays.get(t));
  }
  getOverlays(e, t) {
    const n = qt();
    return L.forEach(t, ((s) => this.getOverlay(e, s).next(((i) => {
      i !== null && n.set(s, i);
    })))).next((() => n));
  }
  getAllOverlays(e, t) {
    const n = qt();
    return this.overlays.forEach(((s, i) => {
      i.largestBatchId > t && n.set(s, i);
    })), L.resolve(n);
  }
  saveOverlays(e, t, n) {
    return n.forEach(((s, i) => {
      this.Zr(e, t, i);
    })), L.resolve();
  }
  removeOverlaysForBatchId(e, t, n) {
    const s = this.Gs.get(n);
    return s !== void 0 && (s.forEach(((i) => this.overlays = this.overlays.remove(i))), this.Gs.delete(n)), L.resolve();
  }
  getOverlaysForCollection(e, t, n) {
    const s = qt(), i = t.length + 1, o = new Q(t.child("")), B = this.overlays.getIteratorFrom(o);
    for (; B.hasNext(); ) {
      const u = B.getNext().value, c = u.getKey();
      if (!t.isPrefixOf(c.path)) break;
      c.path.length === i && u.largestBatchId > n && s.set(u.getKey(), u);
    }
    return L.resolve(s);
  }
  getOverlaysForCollectionGroup(e, t, n, s) {
    let i = new me(((c, C) => c - C));
    const o = this.overlays.getIterator();
    for (; o.hasNext(); ) {
      const c = o.getNext().value;
      if (c.getKey().getCollectionGroup() === t && c.largestBatchId > n) {
        let C = i.get(c.largestBatchId);
        C === null && (C = qt(), i = i.insert(c.largestBatchId, C)), C.set(c.getKey(), c);
      }
    }
    const B = qt(), u = i.getIterator();
    for (; u.hasNext() && (u.getNext().value.forEach(((c, C) => B.set(c, C))), !(B.size() >= s)); )
      ;
    return L.resolve(B);
  }
  Zr(e, t, n) {
    const s = this.overlays.get(n.key);
    if (s !== null) {
      const o = this.Gs.get(s.largestBatchId).delete(n.key);
      this.Gs.set(s.largestBatchId, o);
    }
    this.overlays = this.overlays.insert(n.key, new p_(t, n));
    let i = this.Gs.get(t);
    i === void 0 && (i = ne(), this.Gs.set(t, i)), this.Gs.set(t, i.add(n.key));
  }
}
class b_ {
  constructor() {
    this.sessionToken = Ae.EMPTY_BYTE_STRING;
  }
  getSessionToken(e) {
    return L.resolve(this.sessionToken);
  }
  setSessionToken(e, t) {
    return this.sessionToken = t, L.resolve();
  }
}
class Qa {
  constructor() {
    this.zs = new Te(Fe.js), // A set of outstanding references to a document sorted by target id.
    this.Hs = new Te(Fe.Js);
  }
  /** Returns true if the reference set contains no references. */
  isEmpty() {
    return this.zs.isEmpty();
  }
  /** Adds a reference to the given document key for the given ID. */
  addReference(e, t) {
    const n = new Fe(e, t);
    this.zs = this.zs.add(n), this.Hs = this.Hs.add(n);
  }
  /** Add references to the given document keys for the given ID. */
  Ys(e, t) {
    e.forEach(((n) => this.addReference(n, t)));
  }
  /**
   * Removes a reference to the given document key for the given
   * ID.
   */
  removeReference(e, t) {
    this.Zs(new Fe(e, t));
  }
  Xs(e, t) {
    e.forEach(((n) => this.removeReference(n, t)));
  }
  /**
   * Clears all references with a given ID. Calls removeRef() for each key
   * removed.
   */
  e_(e) {
    const t = new Q(new Be([])), n = new Fe(t, e), s = new Fe(t, e + 1), i = [];
    return this.Hs.forEachInRange([n, s], ((o) => {
      this.Zs(o), i.push(o.key);
    })), i;
  }
  t_() {
    this.zs.forEach(((e) => this.Zs(e)));
  }
  Zs(e) {
    this.zs = this.zs.delete(e), this.Hs = this.Hs.delete(e);
  }
  n_(e) {
    const t = new Q(new Be([])), n = new Fe(t, e), s = new Fe(t, e + 1);
    let i = ne();
    return this.Hs.forEachInRange([n, s], ((o) => {
      i = i.add(o.key);
    })), i;
  }
  containsKey(e) {
    const t = new Fe(e, 0), n = this.zs.firstAfterOrEqual(t);
    return n !== null && e.isEqual(n.key);
  }
}
class Fe {
  constructor(e, t) {
    this.key = e, this.r_ = t;
  }
  /** Compare by key then by ID */
  static js(e, t) {
    return Q.comparator(e.key, t.key) || te(e.r_, t.r_);
  }
  /** Compare by ID then by key */
  static Js(e, t) {
    return te(e.r_, t.r_) || Q.comparator(e.key, t.key);
  }
}
class O_ {
  constructor(e, t) {
    this.indexManager = e, this.referenceDelegate = t, /**
     * The set of all mutations that have been sent but not yet been applied to
     * the backend.
     */
    this.mutationQueue = [], /** Next value to use when assigning sequential IDs to each mutation batch. */
    this.Gr = 1, /** An ordered mapping between documents and the mutations batch IDs. */
    this.i_ = new Te(Fe.js);
  }
  checkEmpty(e) {
    return L.resolve(this.mutationQueue.length === 0);
  }
  addMutationBatch(e, t, n, s) {
    const i = this.Gr;
    this.Gr++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
    const o = new f_(i, t, n, s);
    this.mutationQueue.push(o);
    for (const B of s) this.i_ = this.i_.add(new Fe(B.key, i)), this.indexManager.addToCollectionParentIndex(e, B.key.path.popLast());
    return L.resolve(o);
  }
  lookupMutationBatch(e, t) {
    return L.resolve(this.s_(t));
  }
  getNextMutationBatchAfterBatchId(e, t) {
    const n = t + 1, s = this.__(n), i = s < 0 ? 0 : s;
    return L.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return L.resolve(this.mutationQueue.length === 0 ? im : this.Gr - 1);
  }
  getAllMutationBatches(e) {
    return L.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(e, t) {
    const n = new Fe(t, 0), s = new Fe(t, Number.POSITIVE_INFINITY), i = [];
    return this.i_.forEachInRange([n, s], ((o) => {
      const B = this.s_(o.r_);
      i.push(B);
    })), L.resolve(i);
  }
  getAllMutationBatchesAffectingDocumentKeys(e, t) {
    let n = new Te(te);
    return t.forEach(((s) => {
      const i = new Fe(s, 0), o = new Fe(s, Number.POSITIVE_INFINITY);
      this.i_.forEachInRange([i, o], ((B) => {
        n = n.add(B.r_);
      }));
    })), L.resolve(this.o_(n));
  }
  getAllMutationBatchesAffectingQuery(e, t) {
    const n = t.path, s = n.length + 1;
    let i = n;
    Q.isDocumentKey(i) || (i = i.child(""));
    const o = new Fe(new Q(i), 0);
    let B = new Te(te);
    return this.i_.forEachWhile(((u) => {
      const c = u.key.path;
      return !!n.isPrefixOf(c) && // Rows with document keys more than one segment longer than the query
      // path can't be matches. For example, a query on 'rooms' can't match
      // the document /rooms/abc/messages/xyx.
      // TODO(mcg): we'll need a different scanner when we implement
      // ancestor queries.
      (c.length === s && (B = B.add(u.r_)), !0);
    }), o), L.resolve(this.o_(B));
  }
  o_(e) {
    const t = [];
    return e.forEach(((n) => {
      const s = this.s_(n);
      s !== null && t.push(s);
    })), t;
  }
  removeMutationBatch(e, t) {
    $(this.a_(t.batchId, "removed") === 0, 55003), this.mutationQueue.shift();
    let n = this.i_;
    return L.forEach(t.mutations, ((s) => {
      const i = new Fe(s.key, t.batchId);
      return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(e, s.key);
    })).next((() => {
      this.i_ = n;
    }));
  }
  Hr(e) {
  }
  containsKey(e, t) {
    const n = new Fe(t, 0), s = this.i_.firstAfterOrEqual(n);
    return L.resolve(t.isEqual(s && s.key));
  }
  performConsistencyCheck(e) {
    return this.mutationQueue.length, L.resolve();
  }
  /**
   * Finds the index of the given batchId in the mutation queue and asserts that
   * the resulting index is within the bounds of the queue.
   *
   * @param batchId - The batchId to search for
   * @param action - A description of what the caller is doing, phrased in passive
   * form (e.g. "acknowledged" in a routine that acknowledges batches).
   */
  a_(e, t) {
    return this.__(e);
  }
  /**
   * Finds the index of the given batchId in the mutation queue. This operation
   * is O(1).
   *
   * @returns The computed index of the batch with the given batchId, based on
   * the state of the queue. Note this index can be negative if the requested
   * batchId has already been removed from the queue or past the end of the
   * queue if the batchId is larger than the last added batch.
   */
  __(e) {
    return this.mutationQueue.length === 0 ? 0 : e - this.mutationQueue[0].batchId;
  }
  /**
   * A version of lookupMutationBatch that doesn't return a promise, this makes
   * other functions that uses this code easier to read and more efficient.
   */
  s_(e) {
    const t = this.__(e);
    return t < 0 || t >= this.mutationQueue.length ? null : this.mutationQueue[t];
  }
}
class S_ {
  /**
   * @param sizer - Used to assess the size of a document. For eager GC, this is
   * expected to just return 0 to avoid unnecessarily doing the work of
   * calculating the size.
   */
  constructor(e) {
    this.u_ = e, /** Underlying cache of documents and their read times. */
    this.docs = (function() {
      return new me(Q.comparator);
    })(), /** Size of all cached documents. */
    this.size = 0;
  }
  setIndexManager(e) {
    this.indexManager = e;
  }
  /**
   * Adds the supplied entry to the cache and updates the cache size as appropriate.
   *
   * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()`.
   */
  addEntry(e, t) {
    const n = t.key, s = this.docs.get(n), i = s ? s.size : 0, o = this.u_(t);
    return this.docs = this.docs.insert(n, {
      document: t.mutableCopy(),
      size: o
    }), this.size += o - i, this.indexManager.addToCollectionParentIndex(e, n.path.popLast());
  }
  /**
   * Removes the specified entry from the cache and updates the cache size as appropriate.
   *
   * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
   * returned by `newChangeBuffer()`.
   */
  removeEntry(e) {
    const t = this.docs.get(e);
    t && (this.docs = this.docs.remove(e), this.size -= t.size);
  }
  getEntry(e, t) {
    const n = this.docs.get(t);
    return L.resolve(n ? n.document.mutableCopy() : ke.newInvalidDocument(t));
  }
  getEntries(e, t) {
    let n = at();
    return t.forEach(((s) => {
      const i = this.docs.get(s);
      n = n.insert(s, i ? i.document.mutableCopy() : ke.newInvalidDocument(s));
    })), L.resolve(n);
  }
  getAllEntries(e) {
    let t = at();
    return this.docs.forEach(((n, s) => {
      t = t.insert(n, s.document);
    })), L.resolve(t);
  }
  getDocumentsMatchingQuery(e, t, n, s) {
    let i, o;
    Oe(t) ? (
      // Documents are ordered by key, so we can use a prefix scan to narrow down
      // the documents we need to match the query against.
      (i = Be.fromString(Fi(t)), o = (C) => xi(t, C))
    ) : (
      // Documents are ordered by key, so we can use a prefix scan to narrow down
      // the documents we need to match the query against.
      (i = t.path, o = (C) => wi(t, C))
    );
    let B = at();
    const u = new Q(i.child("__id-9223372036854775808__")), c = this.docs.getIteratorFrom(u);
    for (; c.hasNext(); ) {
      const { key: C, value: { document: f } } = c.getNext();
      if (!i.isPrefixOf(C.path)) break;
      C.path.length > i.length + 1 || vm(Am(f), n) <= 0 || (s.has(f.key) || o(f)) && (B = B.insert(f.key, f.mutableCopy()));
    }
    return L.resolve(B);
  }
  getAllFromCollectionGroup(e, t, n, s) {
    X(9500);
  }
  c_(e, t) {
    return L.forEach(this.docs, ((n) => t(n)));
  }
  newChangeBuffer(e) {
    return new N_(this);
  }
  getSize(e) {
    return L.resolve(this.size);
  }
}
class N_ extends w_ {
  constructor(e) {
    super(), this.$s = e;
  }
  applyChanges(e) {
    const t = [];
    return this.changes.forEach(((n, s) => {
      s.isValidDocument() ? t.push(this.$s.addEntry(e, s)) : this.$s.removeEntry(n);
    })), L.waitFor(t);
  }
  getFromCache(e, t) {
    return this.$s.getEntry(e, t);
  }
  getAllFromCache(e, t) {
    return this.$s.getEntries(e, t);
  }
}
class F_ {
  constructor(e) {
    this.persistence = e, /**
     * Maps a target to the data about that target
     */
    this.l_ = new bn(((t) => CC(t)), fC), /** The last received snapshot version. */
    this.lastRemoteSnapshotVersion = Z.min(), /** The highest numbered target ID encountered. */
    this.highestTargetId = 0, /** The highest sequence number encountered. */
    this.E_ = 0, /**
     * A ordered bidirectional mapping between documents and the remote target
     * IDs.
     */
    this.h_ = new Qa(), this.targetCount = 0, this.T_ = an.ws();
  }
  forEachTarget(e, t) {
    return this.l_.forEach(((n, s) => t(s))), L.resolve();
  }
  getLastRemoteSnapshotVersion(e) {
    return L.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(e) {
    return L.resolve(this.E_);
  }
  allocateTargetId(e) {
    return this.highestTargetId = this.T_.next(), L.resolve(this.highestTargetId);
  }
  setTargetsMetadata(e, t, n) {
    return n && (this.lastRemoteSnapshotVersion = n), t > this.E_ && (this.E_ = t), L.resolve();
  }
  Ds(e) {
    this.l_.set(e.target, e);
    const t = e.targetId;
    t > this.highestTargetId && (this.T_ = new an(t), this.highestTargetId = t), e.sequenceNumber > this.E_ && (this.E_ = e.sequenceNumber);
  }
  addTargetData(e, t) {
    return this.Ds(t), this.targetCount += 1, L.resolve();
  }
  updateTargetData(e, t) {
    return this.Ds(t), L.resolve();
  }
  removeTargetData(e, t) {
    return this.l_.delete(t.target), this.h_.e_(t.targetId), this.targetCount -= 1, L.resolve();
  }
  removeTargets(e, t, n) {
    let s = 0;
    const i = [];
    return this.l_.forEach(((o, B) => {
      B.sequenceNumber <= t && n.get(B.targetId) === null && (this.l_.delete(o), i.push(this.removeMatchingKeysForTargetId(e, B.targetId)), s++);
    })), L.waitFor(i).next((() => s));
  }
  getTargetCount(e) {
    return L.resolve(this.targetCount);
  }
  getTargetData(e, t) {
    const n = this.l_.get(t) || null;
    return L.resolve(n);
  }
  addMatchingKeys(e, t, n) {
    return this.h_.Ys(t, n), L.resolve();
  }
  removeMatchingKeys(e, t, n) {
    this.h_.Xs(t, n);
    const s = this.persistence.referenceDelegate, i = [];
    return s && t.forEach(((o) => {
      i.push(s.markPotentiallyOrphaned(e, o));
    })), L.waitFor(i);
  }
  removeMatchingKeysForTargetId(e, t) {
    return this.h_.e_(t), L.resolve();
  }
  getMatchingKeysForTargetId(e, t) {
    const n = this.h_.n_(t);
    return L.resolve(n);
  }
  containsKey(e, t) {
    return L.resolve(this.h_.containsKey(t));
  }
}
class pC {
  /**
   * The constructor accepts a factory for creating a reference delegate. This
   * allows both the delegate and this instance to have strong references to
   * each other without having nullable fields that would then need to be
   * checked or asserted on every access.
   */
  constructor(e, t) {
    this.P_ = {}, this.overlays = {}, this.I_ = new Ai(0), this.R_ = !1, this.R_ = !0, this.A_ = new b_(), this.referenceDelegate = e(this), this.V_ = new F_(this), this.indexManager = new D_(), this.remoteDocumentCache = (function(s) {
      return new S_(s);
    })(((n) => this.referenceDelegate.d_(n))), this.serializer = new m_(t), this.f_ = new v_(this.serializer);
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    return this.R_ = !1, Promise.resolve();
  }
  get started() {
    return this.R_;
  }
  setDatabaseDeletedListener() {
  }
  setNetworkEnabled() {
  }
  getIndexManager(e) {
    return this.indexManager;
  }
  getDocumentOverlayCache(e) {
    let t = this.overlays[e.toKey()];
    return t || (t = new R_(), this.overlays[e.toKey()] = t), t;
  }
  getMutationQueue(e, t) {
    let n = this.P_[e.toKey()];
    return n || (n = new O_(t, this.referenceDelegate), this.P_[e.toKey()] = n), n;
  }
  getGlobalsCache() {
    return this.A_;
  }
  getTargetCache() {
    return this.V_;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.f_;
  }
  runTransaction(e, t, n) {
    U("MemoryPersistence", "Starting transaction:", e);
    const s = new P_(this.I_.next());
    return this.referenceDelegate.m_(), n(s).next(((i) => this.referenceDelegate.p_(s).next((() => i)))).toPromise().then(((i) => (s.raiseOnCommittedEvent(), i)));
  }
  g_(e, t) {
    return L.or(Object.values(this.P_).map(((n) => () => n.containsKey(e, t))));
  }
}
class P_ extends wE {
  constructor(e) {
    super(), this.currentSequenceNumber = e;
  }
}
class za {
  constructor(e) {
    this.persistence = e, /** Tracks all documents that are active in Query views. */
    this.y_ = new Qa(), /** The list of documents that are potentially GCed after each transaction. */
    this.w_ = null;
  }
  static b_(e) {
    return new za(e);
  }
  get S_() {
    if (this.w_) return this.w_;
    throw X(60996);
  }
  addReference(e, t, n) {
    return this.y_.addReference(n, t), this.S_.delete(n.toString()), L.resolve();
  }
  removeReference(e, t, n) {
    return this.y_.removeReference(n, t), this.S_.add(n.toString()), L.resolve();
  }
  markPotentiallyOrphaned(e, t) {
    return this.S_.add(t.toString()), L.resolve();
  }
  removeTarget(e, t) {
    this.y_.e_(t.targetId).forEach(((s) => this.S_.add(s.toString())));
    const n = this.persistence.getTargetCache();
    return n.getMatchingKeysForTargetId(e, t.targetId).next(((s) => {
      s.forEach(((i) => this.S_.add(i.toString())));
    })).next((() => n.removeTargetData(e, t)));
  }
  m_() {
    this.w_ = /* @__PURE__ */ new Set();
  }
  p_(e) {
    const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
    return L.forEach(this.S_, ((n) => {
      const s = Q.fromPath(n);
      return this.v_(e, s).next(((i) => {
        i || t.removeEntry(s, Z.min());
      }));
    })).next((() => (this.w_ = null, t.apply(e))));
  }
  updateLimboDocument(e, t) {
    return this.v_(e, t).next(((n) => {
      n ? this.S_.delete(t.toString()) : this.S_.add(t.toString());
    }));
  }
  d_(e) {
    return 0;
  }
  v_(e, t) {
    return L.or([() => L.resolve(this.y_.containsKey(t)), () => this.persistence.getTargetCache().containsKey(e, t), () => this.persistence.g_(e, t)]);
  }
}
class di {
  constructor(e, t) {
    this.persistence = e, this.D_ = new bn(((n) => d_(n.path)), ((n, s) => n.isEqual(s))), this.garbageCollector = OE(this, t);
  }
  static b_(e, t) {
    return new di(e, t);
  }
  // No-ops, present so memory persistence doesn't have to care which delegate
  // it has.
  m_() {
  }
  p_(e) {
    return L.resolve();
  }
  forEachTarget(e, t) {
    return this.persistence.getTargetCache().forEachTarget(e, t);
  }
  ir(e) {
    const t = this.Cs(e);
    return this.persistence.getTargetCache().getTargetCount(e).next(((n) => t.next(((s) => n + s))));
  }
  Cs(e) {
    let t = 0;
    return this.sr(e, ((n) => {
      t++;
    })).next((() => t));
  }
  sr(e, t) {
    return L.forEach(this.D_, ((n, s) => this.Os(e, n, s).next(((i) => i ? L.resolve() : t(s)))));
  }
  removeTargets(e, t, n) {
    return this.persistence.getTargetCache().removeTargets(e, t, n);
  }
  removeOrphanedDocuments(e, t) {
    let n = 0;
    const s = this.persistence.getRemoteDocumentCache(), i = s.newChangeBuffer();
    return s.c_(e, ((o) => this.Os(e, o, t).next(((B) => {
      B || (n++, i.removeEntry(o, Z.min()));
    })))).next((() => i.apply(e))).next((() => n));
  }
  markPotentiallyOrphaned(e, t) {
    return this.D_.set(t, e.currentSequenceNumber), L.resolve();
  }
  removeTarget(e, t) {
    const n = t.withSequenceNumber(e.currentSequenceNumber);
    return this.persistence.getTargetCache().updateTargetData(e, n);
  }
  addReference(e, t, n) {
    return this.D_.set(n, e.currentSequenceNumber), L.resolve();
  }
  removeReference(e, t, n) {
    return this.D_.set(n, e.currentSequenceNumber), L.resolve();
  }
  updateLimboDocument(e, t) {
    return this.D_.set(t, e.currentSequenceNumber), L.resolve();
  }
  d_(e) {
    let t = e.key.toString().length;
    return e.isFoundDocument() && (t += $s(e.data.value)), t;
  }
  Os(e, t, n) {
    return L.or([() => this.persistence.g_(e, t), () => this.persistence.getTargetCache().containsKey(e, t), () => {
      const s = this.D_.get(t);
      return L.resolve(s !== void 0 && s > n);
    }]);
  }
  getCacheSize(e) {
    return this.persistence.getRemoteDocumentCache().getSize(e);
  }
}
class $a {
  constructor(e, t, n, s) {
    this.targetId = e, this.fromCache = t, this.Vo = n, this.fo = s;
  }
  static mo(e, t) {
    let n = ne(), s = ne();
    for (const i of t.docChanges) switch (i.type) {
      case 0:
        n = n.add(i.doc.key);
        break;
      case 1:
        s = s.add(i.doc.key);
    }
    return new $a(e, t.fromCache, n, s);
  }
}
function L_(r, e) {
  return Q.comparator(r.key, e.key);
}
class x_ {
  constructor() {
    this._documentReadCount = 0;
  }
  get documentReadCount() {
    return this._documentReadCount;
  }
  incrementDocumentReadCount(e) {
    this._documentReadCount += e;
  }
}
class V_ {
  constructor() {
    this.po = !1, this.yo = !1, /**
     * SDK only decides whether it should create index when collection size is
     * larger than this.
     */
    this.wo = 100, this.bo = /**
    * This cost represents the evaluation result of
    * (([index, docKey] + [docKey, docContent]) per document in the result set)
    * / ([docKey, docContent] per documents in full collection scan) coming from
    * experiment [enter PR experiment URL here].
    */
    (function() {
      return sg() ? 8 : TE(ng()) > 0 ? 6 : 4;
    })();
  }
  /** Sets the document view to query against. */
  initialize(e, t) {
    this.So = e, this.indexManager = t, this.po = !0;
  }
  /** Returns all local documents matching the specified query. */
  getDocumentsMatchingQuery(e, t, n, s) {
    const i = {
      result: null
    };
    return this.vo(e, t).next(((o) => {
      i.result = o;
    })).next((() => {
      if (!i.result) return this.Do(e, t, s, n).next(((o) => {
        i.result = o;
      }));
    })).next((() => {
      if (i.result) return;
      const o = new x_();
      return this.xo(e, t, o).next(((B) => {
        if (i.result = B, this.yo) return this.Co(e, t, o, B.size);
      }));
    })).next((() => i.result));
  }
  Co(e, t, n, s) {
    return Oe(t) ? L.resolve() : n.documentReadCount < this.wo ? (Mn() <= ie.DEBUG && U("QueryEngine", "SDK will not create cache indexes for query:", Hr(t), "since it only creates cache indexes for collection contains", "more than or equal to", this.wo, "documents"), L.resolve()) : (Mn() <= ie.DEBUG && U("QueryEngine", "Query:", Hr(t), "scans", n.documentReadCount, "local documents and returns", s, "documents as results."), n.documentReadCount > this.bo * s ? (Mn() <= ie.DEBUG && U("QueryEngine", "The SDK decides to create cache indexes for query:", Hr(t), "as using cache indexes may help improve performance."), this.indexManager.createTargetIndexes(e, It(t))) : L.resolve());
  }
  /**
   * Performs an indexed query that evaluates the query based on a collection's
   * persisted index values. Returns `null` if an index is not available.
   */
  vo(e, t) {
    if (Oe(t)) return L.resolve(null);
    let n = t;
    if (Pl(n))
      return L.resolve(null);
    let s = It(n);
    return this.indexManager.getIndexType(e, s).next(((i) => i === 0 ? null : (n.limit !== null && i === 1 && // We cannot apply a limit for targets that are served using a partial
    // index. If a partial index will be used to serve the target, the
    // query may return a superset of documents that match the target
    // (e.g. if the index doesn't include all the target's filters), or
    // may return the correct set of documents in the wrong order (e.g. if
    // the index doesn't include a segment for one of the orderBys).
    // Therefore, a limit should not be applied in such cases.
    (n = oa(
      n,
      null,
      "F"
      /* LimitType.First */
    ), s = It(n)), this.indexManager.getDocumentsMatchingTarget(e, s).next(((o) => {
      const B = ne(...o);
      return this.So.getDocuments(e, B).next(((u) => this.indexManager.getMinOffset(e, s).next(((c) => {
        const C = this.Fo(n, u);
        return this.Oo(n, C, B, c.readTime) ? this.vo(e, oa(
          n,
          null,
          "F"
          /* LimitType.First */
        )) : this.Mo(e, C, n, c);
      }))));
    })))));
  }
  /**
   * Performs a query based on the target's persisted query mapping. Returns
   * `null` if the mapping is not available or cannot be used.
   */
  Do(e, t, n, s) {
    return (Oe(t) ? (function(o) {
      for (const B of o.stages) {
        if (B instanceof Rn || B instanceof Yl) return !1;
        if (B instanceof Ni) {
          if (B.condition instanceof eC && B.condition._expr.name === "exists" && B.condition._expr.params[0] instanceof Br && B.condition._expr.params[0].fieldName === _t) continue;
          return !1;
        }
      }
      return !0;
    })(t) : Pl(t)) || s.isEqual(Z.min()) ? L.resolve(null) : this.So.getDocuments(e, n).next(((i) => {
      const o = this.Fo(t, i);
      return this.Oo(t, o, n, s) ? L.resolve(null) : (Mn() <= ie.DEBUG && U("QueryEngine", "Re-using previous result from %s to execute query: %s", s.toString(), Wl(t)), this.Mo(e, o, t, Tm(s, ns)).next(((B) => B)));
    }));
  }
  /** Applies the query filter and sorting to the provided documents.  */
  Fo(e, t) {
    let n, s;
    return Oe(e) ? (
      // TODO(pipeline): the order here does not actually matter, not until we implement
      // refill logic for pipelines as well.
      (n = new Te(L_), s = (i) => xi(e, i))
    ) : (
      // Sort the documents and re-apply the query filter since previously
      // matching documents do not necessarily still match the query.
      (n = new Te(Oa(e)), s = (i) => wi(e, i))
    ), t.forEach(((i, o) => {
      s(o) && (n = n.add(o));
    })), n;
  }
  /**
   * Determines if a limit query needs to be refilled from cache, making it
   * ineligible for index-free execution.
   *
   * @param query - The query.
   * @param sortedPreviousResults - The documents that matched the query when it
   * was last synchronized, sorted by the query's comparator.
   * @param remoteKeys - The document keys that matched the query at the last
   * snapshot.
   * @param limboFreeSnapshotVersion - The version of the snapshot when the
   * query was last synchronized.
   */
  Oo(e, t, n, s) {
    if (Oe(e)) return (function(B) {
      return B.stages.some(((u) => u instanceof Rn || u instanceof Yl));
    })(e);
    if (e.limit === null)
      return !1;
    if (n.size !== t.size)
      return !0;
    const i = e.limitType === "F" ? t.last() : t.first();
    return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0);
  }
  xo(e, t, n) {
    return Mn() <= ie.DEBUG && U("QueryEngine", "Using full collection scan to execute query:", Wl(t)), this.So.getDocumentsMatchingQuery(e, t, rn.min(), n);
  }
  /**
   * Combines the results from an indexed execution with the remaining documents
   * that have not yet been indexed.
   */
  Mo(e, t, n, s) {
    return this.So.getDocumentsMatchingQuery(e, n, s).next(((i) => (
      // Merge with existing results
      (t.forEach(((o) => {
        i = i.insert(o.key, o);
      })), i)
    )));
  }
}
const Ya = "LocalStore", M_ = 3e8;
class G_ {
  constructor(e, t, n, s) {
    this.persistence = e, this.No = t, this.serializer = s, /**
     * Maps a targetID to data about its target.
     *
     * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
     * of `applyRemoteEvent()` idempotent.
     */
    this.Lo = new me(te), /** Maps a target to its targetID. */
    // TODO(wuandy): Evaluate if TargetId can be part of Target.
    this.Bo = new bn(((i) => CC(i)), fC), /**
     * A per collection group index of the last read time processed by
     * `getNewDocumentChanges()`.
     *
     * PORTING NOTE: This is only used for multi-tab synchronization.
     */
    this.Uo = /* @__PURE__ */ new Map(), this.ko = e.getRemoteDocumentCache(), this.V_ = e.getTargetCache(), this.f_ = e.getBundleCache(), this.qo(n);
  }
  qo(e) {
    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(e), this.indexManager = this.persistence.getIndexManager(e), this.mutationQueue = this.persistence.getMutationQueue(e, this.indexManager), this.localDocuments = new A_(this.ko, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.ko.setIndexManager(this.indexManager), this.No.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(e) {
    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", ((t) => e.collect(t, this.Lo)));
  }
}
function k_(r, e, t, n) {
  return new G_(r, e, t, n);
}
async function mC(r, e) {
  const t = oe(r);
  return await t.persistence.runTransaction("Handle user change", "readonly", ((n) => {
    let s;
    return t.mutationQueue.getAllMutationBatches(n).next(((i) => (s = i, t.qo(e), t.mutationQueue.getAllMutationBatches(n)))).next(((i) => {
      const o = [], B = [];
      let u = ne();
      for (const c of s) {
        o.push(c.batchId);
        for (const C of c.mutations) u = u.add(C.key);
      }
      for (const c of i) {
        B.push(c.batchId);
        for (const C of c.mutations) u = u.add(C.key);
      }
      return t.localDocuments.getDocuments(n, u).next(((c) => ({
        $o: c,
        removedBatchIds: o,
        addedBatchIds: B
      })));
    }));
  }));
}
function EC(r) {
  const e = oe(r);
  return e.persistence.runTransaction("Get last remote snapshot version", "readonly", ((t) => e.V_.getLastRemoteSnapshotVersion(t)));
}
function H_(r, e) {
  const t = oe(r), n = e.snapshotVersion;
  let s = t.Lo;
  return t.persistence.runTransaction("Apply remote event", "readwrite-primary", ((i) => {
    const o = t.ko.newChangeBuffer({
      trackRemovals: !0
    });
    s = t.Lo;
    const B = [];
    e.targetChanges.forEach(((C, f) => {
      const m = s.get(f);
      if (!m) return;
      B.push(t.V_.removeMatchingKeys(i, C.removedDocuments, f).next((() => t.V_.addMatchingKeys(i, C.addedDocuments, f))));
      let y = m.withSequenceNumber(i.currentSequenceNumber);
      e.targetMismatches.get(f) !== null ? y = y.withResumeToken(Ae.EMPTY_BYTE_STRING, Z.min()).withLastLimboFreeSnapshotVersion(Z.min()) : C.resumeToken.approximateByteSize() > 0 && (y = y.withResumeToken(C.resumeToken, n)), s = s.insert(f, y), // Update the target data if there are target changes (or if
      // sufficient time has passed since the last update).
      /**
      * Returns true if the newTargetData should be persisted during an update of
      * an active target. TargetData should always be persisted when a target is
      * being released and should not call this function.
      *
      * While the target is active, TargetData updates can be omitted when nothing
      * about the target has changed except metadata like the resume token or
      * snapshot version. Occasionally it's worth the extra write to prevent these
      * values from getting too stale after a crash, but this doesn't have to be
      * too frequent.
      */
      (function(V, j, z) {
        return V.resumeToken.approximateByteSize() === 0 || j.snapshotVersion.toMicroseconds() - V.snapshotVersion.toMicroseconds() >= M_ ? !0 : z.addedDocuments.size + z.modifiedDocuments.size + z.removedDocuments.size > 0;
      })(m, y, C) && B.push(t.V_.updateTargetData(i, y));
    }));
    let u = at(), c = ne();
    if (e.documentUpdates.forEach(((C) => {
      e.resolvedLimboDocuments.has(C) && B.push(t.persistence.referenceDelegate.updateLimboDocument(i, C));
    })), // Each loop iteration only affects its "own" doc, so it's safe to get all
    // the remote documents in advance in a single call.
    B.push(U_(i, o, e.documentUpdates).next(((C) => {
      u = C.Ko, c = C.Qo;
    }))), !n.isEqual(Z.min())) {
      const C = t.V_.getLastRemoteSnapshotVersion(i).next(((f) => t.V_.setTargetsMetadata(i, i.currentSequenceNumber, n)));
      B.push(C);
    }
    return L.waitFor(B).next((() => o.apply(i))).next((() => t.localDocuments.getLocalViewOfDocuments(i, u, c))).next((() => u));
  })).then(((i) => (t.Lo = s, i)));
}
function U_(r, e, t) {
  let n = ne(), s = ne();
  return t.forEach(((i) => n = n.add(i))), e.getEntries(r, n).next(((i) => {
    let o = at();
    return t.forEach(((B, u) => {
      const c = i.get(B);
      u.isFoundDocument() !== c.isFoundDocument() && (s = s.add(B)), // Note: The order of the steps below is important, since we want
      // to ensure that rejected limbo resolutions (which fabricate
      // NoDocuments with SnapshotVersion.min()) never add documents to
      // cache.
      u.isNoDocument() && u.version.isEqual(Z.min()) ? (
        // NoDocuments with SnapshotVersion.min() are used in manufactured
        // events. We remove these documents from cache since we lost
        // access.
        (e.removeEntry(B, u.readTime), o = o.insert(B, u))
      ) : !c.isValidDocument() || u.version.compareTo(c.version) > 0 || u.version.compareTo(c.version) === 0 && c.hasPendingWrites ? (e.addEntry(u), o = o.insert(B, u)) : U(Ya, "Ignoring outdated watch update for ", B, ". Current version:", c.version, " Watch version:", u.version);
    })), {
      Ko: o,
      Qo: s
    };
  }));
}
function j_(r, e) {
  const t = oe(r);
  return t.persistence.runTransaction("Allocate target", "readwrite", ((n) => {
    let s;
    return t.V_.getTargetData(n, e).next(((i) => i ? (
      // This target has been listened to previously, so reuse the
      // previous targetID.
      // TODO(mcg): freshen last accessed date?
      (s = i, L.resolve(s))
    ) : t.V_.allocateTargetId(n).next(((o) => (s = new bt(e, o, "TargetPurposeListen", n.currentSequenceNumber), t.V_.addTargetData(n, s).next((() => s)))))));
  })).then(((n) => {
    const s = t.Lo.get(n.targetId);
    return (s === null || n.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (t.Lo = t.Lo.insert(n.targetId, n), t.Bo.set(e, n.targetId)), n;
  }));
}
async function ha(r, e, t) {
  const n = oe(r), s = n.Lo.get(e), i = t ? "readwrite" : "readwrite-primary";
  try {
    t || await n.persistence.runTransaction("Release target", i, ((o) => n.persistence.referenceDelegate.removeTarget(o, s)));
  } catch (o) {
    if (!or(o)) throw o;
    U(Ya, `Failed to update sequence numbers for target ${e}: ${o}`);
  }
  n.Lo = n.Lo.remove(e), // TODO(pipeline): This needs to handle pipeline properly.
  n.Bo.delete(s.target);
}
function Zl(r, e, t) {
  const n = oe(r);
  let s = Z.min(), i = ne();
  return n.persistence.runTransaction(
    "Execute query",
    "readwrite",
    // Use readwrite instead of readonly so indexes can be created
    // Use readwrite instead of readonly so indexes can be created
    ((o) => (function(u, c, C) {
      const f = oe(u), m = f.Bo.get(C);
      return m !== void 0 ? L.resolve(f.Lo.get(m)) : f.V_.getTargetData(c, C);
    })(n, o, Oe(e) ? e : It(e)).next(((B) => {
      if (B) return s = B.lastLimboFreeSnapshotVersion, n.V_.getMatchingKeysForTargetId(o, B.targetId).next(((u) => {
        i = u;
      }));
    })).next((() => n.No.getDocumentsMatchingQuery(o, e, t ? s : Z.min(), t ? i : ne()))).next(((B) => (
      // TODO(pipeline): this needs to be adapted to support other pipeline flavors.
      // For now, only 'exact' flavor is supported and it is enough.
      (J_(n, B), {
        documents: B,
        Wo: i
      })
    ))))
  );
}
function J_(r, e) {
  e.forEach(((t, n) => {
    const s = n.key.getCollectionGroup(), i = r.Uo.get(s) || Z.min();
    n.readTime.compareTo(i) > 0 && r.Uo.set(s, n.readTime);
  }));
}
class q_ {
  constructor(e, t) {
    this.asyncQueue = e, this.onlineStateHandler = t, /** The current OnlineState. */
    this.state = "Unknown", /**
     * A count of consecutive failures to open the stream. If it reaches the
     * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
     * Offline.
     */
    this.Yo = 0, /**
     * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
     * transition from OnlineState.Unknown to OnlineState.Offline without waiting
     * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
     */
    this.Zo = null, /**
     * Whether the client should log a warning message if it fails to connect to
     * the backend (initially true, cleared after a successful stream, or if we've
     * logged the message already).
     */
    this.Xo = !0;
  }
  /**
   * Called by RemoteStore when a watch stream is started (including on each
   * backoff attempt).
   *
   * If this is the first attempt, it sets the OnlineState to Unknown and starts
   * the onlineStateTimer.
   */
  ea() {
    this.Yo === 0 && (this.ta(
      "Unknown"
      /* OnlineState.Unknown */
    ), this.Zo = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, (() => (this.Zo = null, this.na("Backend didn't respond within 10 seconds."), this.ta(
      "Offline"
      /* OnlineState.Offline */
    ), Promise.resolve()))));
  }
  /**
   * Updates our OnlineState as appropriate after the watch stream reports a
   * failure. The first failure moves us to the 'Unknown' state. We then may
   * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
   * actually transition to the 'Offline' state.
   */
  ra(e) {
    this.state === "Online" ? this.ta(
      "Unknown"
      /* OnlineState.Unknown */
    ) : (this.Yo++, this.Yo >= 1 && (this.ia(), this.na(`Connection failed 1 times. Most recent error: ${e.toString()}`), this.ta(
      "Offline"
      /* OnlineState.Offline */
    )));
  }
  /**
   * Explicitly sets the OnlineState to the specified state.
   *
   * Note that this resets our timers / failure counters, etc. used by our
   * Offline heuristics, so must not be used in place of
   * handleWatchStreamStart() and handleWatchStreamFailure().
   */
  set(e) {
    this.ia(), this.Yo = 0, e === "Online" && // We've connected to watch at least once. Don't warn the developer
    // about being offline going forward.
    (this.Xo = !1), this.ta(e);
  }
  ta(e) {
    e !== this.state && (this.state = e, this.onlineStateHandler(e));
  }
  na(e) {
    const t = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    this.Xo ? (Nt(t), this.Xo = !1) : U("OnlineStateTracker", t);
  }
  ia() {
    this.Zo !== null && (this.Zo.cancel(), this.Zo = null);
  }
}
const Pt = "RemoteStore";
class K_ {
  constructor(e, t, n, s, i) {
    this.localStore = e, this.datastore = t, this.asyncQueue = n, this.remoteSyncer = {}, /**
     * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
     * LocalStore via fillWritePipeline() and have or will send to the write
     * stream.
     *
     * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
     * restart the write stream. When the stream is established the writes in the
     * pipeline will be sent in order.
     *
     * Writes remain in writePipeline until they are acknowledged by the backend
     * and thus will automatically be re-sent if the stream is interrupted /
     * restarted before they're acknowledged.
     *
     * Write responses from the backend are linked to their originating request
     * purely based on order, and so we can just shift() writes from the front of
     * the writePipeline as we receive responses.
     */
    this.sa = [], /**
     * A mapping of watched targets that the client cares about tracking and the
     * user has explicitly called a 'listen' for this target.
     *
     * These targets may or may not have been sent to or acknowledged by the
     * server. On re-establishing the listen stream, these targets should be sent
     * to the server. The targets removed with unlistens are removed eagerly
     * without waiting for confirmation from the listen stream.
     */
    this._a = /* @__PURE__ */ new Map(), this.oa = /* @__PURE__ */ new Map(), this.aa = /* @__PURE__ */ new Map(), this.ua = new an(1e3), this.ca = new an(1001), /**
     * A set of reasons for why the RemoteStore may be offline. If empty, the
     * RemoteStore may start its network connections.
     */
    this.la = /* @__PURE__ */ new Set(), /**
     * Event handlers that get called when the network is disabled or enabled.
     *
     * PORTING NOTE: These functions are used on the Web client to create the
     * underlying streams (to support tree-shakeable streams). On Android and iOS,
     * the streams are created during construction of RemoteStore.
     */
    this.Ea = [], this.ha = i, this.ha.Qe(((o) => {
      n.enqueueAndForget((async () => {
        Es(this) && (U(Pt, "Restarting streams for network reachability change."), await (async function(u) {
          const c = oe(u);
          c.la.add(
            4
            /* OfflineCause.ConnectivityChange */
          ), await ms(c), c.Ta.set(
            "Unknown"
            /* OnlineState.Unknown */
          ), c.la.delete(
            4
            /* OfflineCause.ConnectivityChange */
          ), await Vi(c);
        })(this));
      }));
    })), this.Ta = new q_(n, s);
  }
}
async function Vi(r) {
  if (Es(r)) for (const e of r.Ea) await e(
    /* enabled= */
    !0
  );
}
async function ms(r) {
  for (const e of r.Ea) await e(
    /* enabled= */
    !1
  );
}
function Ca(r, e) {
  return r.oa.get(e) || void 0;
}
function DC(r, e) {
  const t = oe(r), n = Ca(t, e.targetId);
  if (n !== void 0 && t._a.has(n)) return;
  const s = (
    /**
    * Generate a new remote target ID for the given SDK target ID.
    * Re-map the given SDK to the new remote ID.
    * Delete any mapping of the old remote ID, if given.
    * @param remoteStoreImpl
    * @param sdkTargetId
    * @return The new remote ID.
    */
    (function(B, u) {
      const c = Ca(B, u);
      c !== void 0 && // If there was an existing remote target ID mapped to that SDK target ID, forget about the old remote ID.
      B.aa.delete(c);
      const C = (function(m, y) {
        return y % 2 != 0 ? m.ca.next() : m.ua.next();
      })(B, u);
      return B.oa.set(u, C), B.aa.set(C, u), C;
    })(t, e.targetId)
  );
  U(Pt, "remoteStoreListen mapping SDK target ID to remote", e.targetId, s);
  const i = new bt(e.target, s, e.purpose, e.sequenceNumber, e.snapshotVersion, e.lastLimboFreeSnapshotVersion, e.resumeToken);
  t._a.set(s, i), eB(t) ? (
    // The listen will be sent in onWatchStreamOpen
    Za(t)
  ) : hr(t).Yt() && Xa(t, i);
}
function Wa(r, e) {
  const t = oe(r), n = hr(t), s = Ca(t, e);
  U(Pt, "remoteStoreUnlisten removing mapping of SDK target ID to remote", e, s), t._a.delete(s), t.oa.delete(e), t.aa.delete(s), n.Yt() && _C(t, s), t._a.size === 0 && (n.Yt() ? n.en() : Es(t) && // Revert to OnlineState.Unknown if the watch stream is not open and we
  // have no listeners, since without any listens to send we cannot
  // confirm if the stream is healthy and upgrade to OnlineState.Online.
  t.Ta.set(
    "Unknown"
    /* OnlineState.Unknown */
  ));
}
function Xa(r, e) {
  if (r.Pa.J(e.targetId), e.resumeToken.approximateByteSize() > 0 || e.snapshotVersion.compareTo(Z.min()) > 0) {
    const t = r.aa.get(e.targetId);
    if (t === void 0)
      return void U(Pt, "SDK target ID not found for remote ID: " + e.targetId);
    const n = r.remoteSyncer.getRemoteKeysForTarget(t).size;
    e = e.withExpectedCount(n);
  }
  hr(r).Pn(e);
}
function _C(r, e) {
  r.Pa.J(e), hr(r).In(e);
}
function Za(r) {
  r.Pa = new Um({
    getRemoteKeysForTarget: (e) => {
      const t = r.aa.get(e);
      return t !== void 0 ? r.remoteSyncer.getRemoteKeysForTarget(t) : ne();
    },
    ye: (e) => r._a.get(e) || null,
    Ve: () => r.datastore.serializer.databaseId
  }), hr(r).start(), r.Ta.ea();
}
function eB(r) {
  return Es(r) && !hr(r).Jt() && r._a.size > 0;
}
function Es(r) {
  return oe(r).la.size === 0;
}
function yC(r) {
  r.Pa = void 0;
}
async function Q_(r) {
  r.Ta.set(
    "Online"
    /* OnlineState.Online */
  );
}
async function z_(r) {
  r._a.forEach(((e, t) => {
    Xa(r, e);
  }));
}
async function $_(r, e) {
  yC(r), // If we still need the watch stream, retry the connection.
  eB(r) ? (r.Ta.ra(e), Za(r)) : (
    // No need to restart watch stream because there are no active targets.
    // The online state is set to unknown because there is no active attempt
    // at establishing a connection
    r.Ta.set(
      "Unknown"
      /* OnlineState.Unknown */
    )
  );
}
async function Y_(r, e, t) {
  if (
    // Mark the client as online since we got a message from the server
    r.Ta.set(
      "Online"
      /* OnlineState.Online */
    ), e instanceof Nh && e.state === 2 && e.cause
  )
    try {
      await (async function(s, i) {
        const o = i.cause;
        for (const B of i.targetIds) {
          if (s._a.has(B)) {
            const u = s.aa.get(B);
            u !== void 0 && (await s.remoteSyncer.rejectListen(u, o), s.oa.delete(u), s.aa.delete(B)), s._a.delete(B);
          }
          s.Pa.removeTarget(B);
        }
      })(r, e);
    } catch (n) {
      U(Pt, "Failed to remove targets %s: %s ", e.targetIds.join(","), n), await ec(r, n);
    }
  else if (e instanceof Ws ? r.Pa._e(e) : e instanceof Sh ? r.Pa.he(e) : r.Pa.ue(e), !t.isEqual(Z.min())) try {
    const n = await EC(r.localStore);
    t.compareTo(n) >= 0 && // We have received a target change with a global snapshot if the snapshot
    // version is not equal to SnapshotVersion.min().
    /**
    * Takes a batch of changes from the Datastore, repackages them as a
    * RemoteEvent, and passes that on to the listener, which is typically the
    * SyncEngine.
    */
    await (function(i, o) {
      const B = i.Pa.fe(o);
      B.targetChanges.forEach(((c, C) => {
        if (c.resumeToken.approximateByteSize() > 0) {
          const f = i._a.get(C);
          f && i._a.set(C, f.withResumeToken(c.resumeToken, o));
        }
      })), // Re-establish listens for the targets that have been invalidated by
      // existence filter mismatches.
      // TODO ideally this would use a new remote target ID
      B.targetMismatches.forEach(((c, C) => {
        const f = i._a.get(c);
        if (!f)
          return;
        i._a.set(c, f.withResumeToken(Ae.EMPTY_BYTE_STRING, f.snapshotVersion)), // Cause a hard reset by unwatching and rewatching immediately, but
        // deliberately don't send a resume token so that we get a full update.
        _C(i, c);
        const m = new bt(f.target, c, C, f.sequenceNumber);
        Xa(i, m);
      }));
      const u = (
        /**
        * Convert a RemoteEvent with remote IDs to a RemoteEvent with
        * SDK IDs and dropped updates
        * for any targets we no longer track.
        *
        * @param remoteStoreImpl
        * @param remoteEvent
        * @return a new RemoteEvent with SDK IDs and dropped updates
        * for any targets we no longer track.
        */
        (function(C, f) {
          const m = /* @__PURE__ */ new Map();
          f.targetChanges.forEach(((b, V) => {
            const j = C.aa.get(V);
            j !== void 0 && m.set(j, b);
          }));
          let y = new me(te);
          return f.targetMismatches.forEach(((b, V) => {
            const j = C.aa.get(b);
            j !== void 0 && (y = y.insert(j, V));
          })), new ds(f.snapshotVersion, m, y, f.documentUpdates, f.augmentedDocumentUpdates, f.resolvedLimboDocuments);
        })(i, B)
      );
      return i.remoteSyncer.applyRemoteEvent(u);
    })(r, t);
  } catch (n) {
    U(Pt, "Failed to raise snapshot:", n), await ec(r, n);
  }
}
async function ec(r, e, t) {
  if (!or(e)) throw e;
  r.la.add(
    1
    /* OfflineCause.IndexedDbFailed */
  ), // Disable network and raise offline snapshots
  await ms(r), r.Ta.set(
    "Offline"
    /* OnlineState.Offline */
  ), t || // Use a simple read operation to determine if IndexedDB recovered.
  // Ideally, we would expose a health check directly on SimpleDb, but
  // RemoteStore only has access to persistence through LocalStore.
  (t = () => EC(r.localStore)), // Probe IndexedDB periodically and re-enable network
  r.asyncQueue.enqueueRetryable((async () => {
    U(Pt, "Retrying IndexedDB access"), await t(), r.la.delete(
      1
      /* OfflineCause.IndexedDbFailed */
    ), await Vi(r);
  }));
}
async function tc(r, e) {
  const t = oe(r);
  t.asyncQueue.verifyOperationInProgress(), U(Pt, "RemoteStore received new credentials");
  const n = Es(t);
  t.la.add(
    3
    /* OfflineCause.CredentialChange */
  ), await ms(t), n && // Don't set the network status to Unknown if we are offline.
  t.Ta.set(
    "Unknown"
    /* OnlineState.Unknown */
  ), await t.remoteSyncer.handleCredentialChange(e), t.la.delete(
    3
    /* OfflineCause.CredentialChange */
  ), await Vi(t);
}
async function W_(r, e) {
  const t = oe(r);
  e ? (t.la.delete(
    2
    /* OfflineCause.IsSecondary */
  ), await Vi(t)) : e || (t.la.add(
    2
    /* OfflineCause.IsSecondary */
  ), await ms(t), t.Ta.set(
    "Unknown"
    /* OnlineState.Unknown */
  ));
}
function hr(r) {
  return r.Ia || // Create stream (but note that it is not started yet).
  (r.Ia = (function(t, n, s) {
    const i = oe(t);
    return i.pn(), new pE(n, i.connection, i.authCredentials, i.appCheckCredentials, i.serializer, s);
  })(r.datastore, r.asyncQueue, {
    ct: Q_.bind(null, r),
    Et: z_.bind(null, r),
    Tt: $_.bind(null, r),
    Tn: Y_.bind(null, r)
  }), r.Ea.push((async (e) => {
    e ? (r.Ia.Xt(), eB(r) ? Za(r) : r.Ta.set(
      "Unknown"
      /* OnlineState.Unknown */
    )) : (await r.Ia.stop(), yC(r));
  }))), r.Ia;
}
class IC {
  constructor(e) {
    this.observer = e, /**
     * When set to true, will not raise future events. Necessary to deal with
     * async detachment of listener.
     */
    this.muted = !1;
  }
  next(e) {
    this.muted || this.observer.next && this.Aa(this.observer.next, e);
  }
  error(e) {
    this.muted || (this.observer.error ? this.Aa(this.observer.error, e) : Nt("Uncaught Error in snapshot listener:", e.toString()));
  }
  Va() {
    this.muted = !0;
  }
  Aa(e, t) {
    setTimeout((() => {
      this.muted || e(t);
    }), 0);
  }
}
class tB {
  constructor(e, t, n, s, i) {
    this.asyncQueue = e, this.timerId = t, this.targetTimeMs = n, this.op = s, this.removalCallback = i, this.deferred = new Yt(), this.then = this.deferred.promise.then.bind(this.deferred.promise), // It's normal for the deferred promise to be canceled (due to cancellation)
    // and so we attach a dummy catch callback to avoid
    // 'UnhandledPromiseRejectionWarning' log spam.
    this.deferred.promise.catch(((o) => {
    }));
  }
  get promise() {
    return this.deferred.promise;
  }
  /**
   * Creates and returns a DelayedOperation that has been scheduled to be
   * executed on the provided asyncQueue after the provided delayMs.
   *
   * @param asyncQueue - The queue to schedule the operation on.
   * @param id - A Timer ID identifying the type of operation this is.
   * @param delayMs - The delay (ms) before the operation should be scheduled.
   * @param op - The operation to run.
   * @param removalCallback - A callback to be called synchronously once the
   *   operation is executed or canceled, notifying the AsyncQueue to remove it
   *   from its delayedOperations list.
   *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
   *   the DelayedOperation class public.
   */
  static createAndSchedule(e, t, n, s, i) {
    const o = Date.now() + n, B = new tB(e, t, o, s, i);
    return B.start(n), B;
  }
  /**
   * Starts the timer. This is called immediately after construction by
   * createAndSchedule().
   */
  start(e) {
    this.timerHandle = setTimeout((() => this.handleDelayElapsed()), e);
  }
  /**
   * Queues the operation to run immediately (if it hasn't already been run or
   * canceled).
   */
  skipDelay() {
    return this.handleDelayElapsed();
  }
  /**
   * Cancels the operation if it hasn't already been executed or canceled. The
   * promise will be rejected.
   *
   * As long as the operation has not yet been run, calling cancel() provides a
   * guarantee that the operation will not be run.
   */
  cancel(e) {
    this.timerHandle !== null && (this.clearTimeout(), this.deferred.reject(new H(M.CANCELLED, "Operation cancelled" + (e ? ": " + e : ""))));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget((() => this.timerHandle !== null ? (this.clearTimeout(), this.op().then(((e) => this.deferred.resolve(e)))) : Promise.resolve()));
  }
  clearTimeout() {
    this.timerHandle !== null && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
  }
}
function wC(r, e) {
  if (Nt("AsyncQueue", `${e}: ${r}`), or(r)) return new H(M.UNAVAILABLE, `${e}: ${r}`);
  throw r;
}
class nc {
  constructor() {
    this.activeTargetIds = Gm();
  }
  Ba(e) {
    this.activeTargetIds = this.activeTargetIds.add(e);
  }
  Ua(e) {
    this.activeTargetIds = this.activeTargetIds.delete(e);
  }
  /**
   * Converts this entry into a JSON-encoded format we can use for WebStorage.
   * Does not encode `clientId` as it is part of the key in WebStorage.
   */
  La() {
    const e = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now()
    };
    return JSON.stringify(e);
  }
}
class X_ {
  constructor() {
    this.fu = new nc(), this.mu = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
  }
  addPendingMutation(e) {
  }
  updateMutationState(e, t, n) {
  }
  addLocalQueryTarget(e, t = !0) {
    return t && this.fu.Ba(e), this.mu[e] || "not-current";
  }
  updateQueryState(e, t, n) {
    this.mu[e] = t;
  }
  removeLocalQueryTarget(e) {
    this.fu.Ua(e);
  }
  isLocalQueryTarget(e) {
    return this.fu.activeTargetIds.has(e);
  }
  clearQueryState(e) {
    delete this.mu[e];
  }
  getAllActiveQueryTargets() {
    return this.fu.activeTargetIds;
  }
  isActiveQueryTarget(e) {
    return this.fu.activeTargetIds.has(e);
  }
  start() {
    return this.fu = new nc(), Promise.resolve();
  }
  handleUserChange(e, t, n) {
  }
  setOnlineState(e) {
  }
  shutdown() {
  }
  writeSequenceNumber(e) {
  }
  notifyBundleLoaded(e) {
  }
}
function Ro() {
  return typeof document < "u" ? document : null;
}
class In {
  /**
   * Returns an empty copy of the existing DocumentSet, using the same
   * comparator.
   */
  static emptySet(e) {
    return new In(e.comparator);
  }
  /** The default ordering is by key if the comparator is omitted */
  constructor(e) {
    this.comparator = e ? (t, n) => e(t, n) || Q.comparator(t.key, n.key) : (t, n) => Q.comparator(t.key, n.key), this.keyedMap = kn(), this.sortedSet = new me(this.comparator);
  }
  has(e) {
    return this.keyedMap.get(e) != null;
  }
  get(e) {
    return this.keyedMap.get(e);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  /**
   * Returns the index of the provided key in the document set, or -1 if the
   * document key is not present in the set;
   */
  indexOf(e) {
    const t = this.keyedMap.get(e);
    return t ? this.sortedSet.indexOf(t) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  /** Iterates documents in order defined by "comparator" */
  forEach(e) {
    this.sortedSet.inorderTraversal(((t, n) => (e(t), !1)));
  }
  /** Inserts or updates a document with the same key */
  add(e) {
    const t = this.delete(e.key);
    return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
  }
  /** Deletes a document with a given key */
  delete(e) {
    const t = this.get(e);
    return t ? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t)) : this;
  }
  isEqual(e) {
    if (!(e instanceof In) || this.size !== e.size) return !1;
    const t = this.sortedSet.getIterator(), n = e.sortedSet.getIterator();
    for (; t.hasNext(); ) {
      const s = t.getNext().key, i = n.getNext().key;
      if (!s.isEqual(i)) return !1;
    }
    return !0;
  }
  toString() {
    const e = [];
    return this.forEach(((t) => {
      e.push(t.toString());
    })), e.length === 0 ? "DocumentSet ()" : `DocumentSet (
  ` + e.join(`  
`) + `
)`;
  }
  copy(e, t) {
    const n = new In();
    return n.comparator = this.comparator, n.keyedMap = e, n.sortedSet = t, n;
  }
}
class rc {
  constructor() {
    this.pu = new me(Q.comparator);
  }
  track(e) {
    const t = e.doc.key, n = this.pu.get(t);
    n ? (
      // Merge the new change with the existing change.
      e.type !== 0 && n.type === 3 ? this.pu = this.pu.insert(t, e) : e.type === 3 && n.type !== 1 ? this.pu = this.pu.insert(t, {
        type: n.type,
        doc: e.doc
      }) : e.type === 2 && n.type === 2 ? this.pu = this.pu.insert(t, {
        type: 2,
        doc: e.doc
      }) : e.type === 2 && n.type === 0 ? this.pu = this.pu.insert(t, {
        type: 0,
        doc: e.doc
      }) : e.type === 1 && n.type === 0 ? this.pu = this.pu.remove(t) : e.type === 1 && n.type === 2 ? this.pu = this.pu.insert(t, {
        type: 1,
        doc: n.doc
      }) : e.type === 0 && n.type === 1 ? this.pu = this.pu.insert(t, {
        type: 2,
        doc: e.doc
      }) : (
        // This includes these cases, which don't make sense:
        // Added->Added
        // Removed->Removed
        // Modified->Added
        // Removed->Modified
        // Metadata->Added
        // Removed->Metadata
        X(63341, {
          we: e,
          gu: n
        })
      )
    ) : this.pu = this.pu.insert(t, e);
  }
  yu() {
    const e = [];
    return this.pu.inorderTraversal(((t, n) => {
      e.push(n);
    })), e;
  }
}
class tr {
  constructor(e, t, n, s, i, o, B, u, c) {
    this.query = e, this.docs = t, this.oldDocs = n, this.docChanges = s, this.mutatedKeys = i, this.fromCache = o, this.syncStateChanged = B, this.excludesMetadataChanges = u, this.hasCachedResults = c;
  }
  /** Returns a view snapshot as if all documents in the snapshot were added. */
  static fromInitialDocuments(e, t, n, s, i) {
    const o = [];
    return t.forEach(((B) => {
      o.push({
        type: 0,
        doc: B
      });
    })), new tr(
      e,
      t,
      In.emptySet(t),
      o,
      n,
      s,
      /* syncStateChanged= */
      !0,
      /* excludesMetadataChanges= */
      !1,
      i
    );
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(e) {
    if (!(this.fromCache === e.fromCache && this.hasCachedResults === e.hasCachedResults && this.syncStateChanged === e.syncStateChanged && this.mutatedKeys.isEqual(e.mutatedKeys) && Li(this.query, e.query) && this.docs.isEqual(e.docs) && this.oldDocs.isEqual(e.oldDocs))) return !1;
    const t = this.docChanges, n = e.docChanges;
    if (t.length !== n.length) return !1;
    for (let s = 0; s < t.length; s++) if (t[s].type !== n[s].type || !t[s].doc.isEqual(n[s].doc)) return !1;
    return !0;
  }
}
class Z_ {
  constructor() {
    this.wu = void 0, this.bu = [];
  }
  // Helper methods that checks if the query has listeners that listening to remote store
  Su() {
    return this.bu.some(((e) => e.vu()));
  }
}
class ey {
  constructor() {
    this.queries = sc(), this.onlineState = "Unknown", this.Du = /* @__PURE__ */ new Set();
  }
  terminate() {
    (function(t, n) {
      const s = oe(t), i = s.queries;
      s.queries = sc(), i.forEach(((o, B) => {
        for (const u of B.bu) u.onError(n);
      }));
    })(this, new H(M.ABORTED, "Firestore shutting down"));
  }
}
function sc() {
  return new bn(((r) => hC(r)), Li);
}
async function TC(r, e) {
  const t = oe(r);
  let n = 3;
  const s = e.query;
  let i = t.queries.get(s);
  i ? !i.Su() && e.vu() && // Query has been listening to local cache, and tries to add a new listener sourced from watch.
  (n = 2) : (i = new Z_(), n = e.vu() ? 0 : 1);
  try {
    switch (n) {
      case 0:
        i.wu = await t.onListen(
          s,
          /** enableRemoteListen= */
          !0
        );
        break;
      case 1:
        i.wu = await t.onListen(
          s,
          /** enableRemoteListen= */
          !1
        );
        break;
      case 2:
        await t.onFirstRemoteStoreListen(s);
    }
  } catch (o) {
    const B = wC(o, `Initialization of query '${Oe(e.query) ? Ot(e.query) : Hr(e.query)}' failed`);
    return void e.onError(B);
  }
  t.queries.set(s, i), i.bu.push(e), // Run global snapshot listeners if a consistent snapshot has been emitted.
  e.xu(t.onlineState), i.wu && e.Cu(i.wu) && nB(t);
}
async function AC(r, e) {
  const t = oe(r), n = e.query;
  let s = 3;
  const i = t.queries.get(n);
  if (i) {
    const o = i.bu.indexOf(e);
    o >= 0 && (i.bu.splice(o, 1), i.bu.length === 0 ? s = e.vu() ? 0 : 1 : !i.Su() && e.vu() && // The removed listener is the last one that sourced from watch.
    (s = 2));
  }
  switch (s) {
    case 0:
      return t.queries.delete(n), t.onUnlisten(
        n,
        /** disableRemoteListen= */
        !0
      );
    case 1:
      return t.queries.delete(n), t.onUnlisten(
        n,
        /** disableRemoteListen= */
        !1
      );
    case 2:
      return t.onLastRemoteStoreUnlisten(n);
    default:
      return;
  }
}
function ty(r, e) {
  const t = oe(r);
  let n = !1;
  for (const s of e) {
    const i = s.query, o = t.queries.get(i);
    if (o) {
      for (const B of o.bu) B.Cu(s) && (n = !0);
      o.wu = s;
    }
  }
  n && nB(t);
}
function ny(r, e, t) {
  const n = oe(r), s = n.queries.get(e);
  if (s) for (const i of s.bu) i.onError(t);
  n.queries.delete(e);
}
function nB(r) {
  r.Du.forEach(((e) => {
    e.next();
  }));
}
var fa;
(function(r) {
  r.Default = "default", /** Listen to changes in cache only */
  r.Cache = "cache";
})(fa || (fa = {}));
class vC {
  constructor(e, t, n) {
    this.query = e, this.Fu = t, /**
     * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
     * observer. This flag is set to true once we've actually raised an event.
     */
    this.Ou = !1, this.Mu = null, this.onlineState = "Unknown", this.options = n || {};
  }
  /**
   * Applies the new ViewSnapshot to this listener, raising a user-facing event
   * if applicable (depending on what changed, whether the user has opted into
   * metadata-only changes, etc.). Returns true if a user-facing event was
   * indeed raised.
   */
  Cu(e) {
    if (!this.options.includeMetadataChanges) {
      const n = [];
      for (const s of e.docChanges) s.type !== 3 && n.push(s);
      e = new tr(
        e.query,
        e.docs,
        e.oldDocs,
        n,
        e.mutatedKeys,
        e.fromCache,
        e.syncStateChanged,
        /* excludesMetadataChanges= */
        !0,
        e.hasCachedResults
      );
    }
    let t = !1;
    return this.Ou ? this.Nu(e) && (this.Fu.next(e), t = !0) : this.Lu(e, this.onlineState) && (this.Bu(e), t = !0), this.Mu = e, t;
  }
  onError(e) {
    this.Fu.error(e);
  }
  /** Returns whether a snapshot was raised. */
  xu(e) {
    this.onlineState = e;
    let t = !1;
    return this.Mu && !this.Ou && this.Lu(this.Mu, e) && (this.Bu(this.Mu), t = !0), t;
  }
  Lu(e, t) {
    if (!e.fromCache || !this.vu()) return !0;
    const n = t !== "Offline";
    return (!this.options.waitForSyncWhenOnline || !n) && (!e.docs.isEmpty() || e.hasCachedResults || t === "Offline");
  }
  Nu(e) {
    if (e.docChanges.length > 0) return !0;
    const t = this.Mu && this.Mu.hasPendingWrites !== e.hasPendingWrites;
    return !(!e.syncStateChanged && !t) && this.options.includeMetadataChanges === !0;
  }
  Bu(e) {
    e = tr.fromInitialDocuments(e.query, e.docs, e.mutatedKeys, e.fromCache, e.hasCachedResults), this.Ou = !0, this.Fu.next(e);
  }
  vu() {
    return this.options.source !== fa.Cache;
  }
}
class RC {
  constructor(e) {
    this.key = e;
  }
}
class bC {
  constructor(e) {
    this.key = e;
  }
}
class ry {
  constructor(e, t) {
    this.query = e, this.zu = t, this.ju = null, this.hasCachedResults = !1, /**
     * A flag whether the view is current with the backend. A view is considered
     * current after it has seen the current flag from the backend and did not
     * lose consistency within the watch stream (e.g. because of an existence
     * filter mismatch).
     */
    this.current = !1, /** Documents in the view but not in the remote target */
    this.Hu = ne(), /** Document Keys that have local changes */
    this.mutatedKeys = ne(), this.Ju = Oe(e) ? ca(e) : Oa(e), this.Yu = new In(this.Ju);
  }
  /**
   * The set of remote documents that the server has told us belongs to the target associated with
   * this view.
   */
  get Zu() {
    return this.zu;
  }
  /**
   * Iterates over a set of doc changes, applies the query limit, and computes
   * what the new results should be, what the changes were, and whether we may
   * need to go back to the local cache for more results. Does not make any
   * changes to the view.
   * @param docChanges - The doc changes to apply to this view.
   * @param previousChanges - If this is being called with a refill, then start
   *        with this set of docs and changes instead of the current view.
   * @returns a new set of docs, changes, and refill flag.
   */
  Xu(e, t) {
    const n = t ? t.ec : new rc(), s = t ? t.Yu : this.Yu;
    let i = t ? t.mutatedKeys : this.mutatedKeys, o = s, B = !1;
    const [u, c] = this.tc(this.query, s);
    e.inorderTraversal(((f, m) => {
      const y = s.get(f), b = y_(this.query, m) ? m : null, V = !!y && this.mutatedKeys.has(y.key), j = !!b && (b.hasLocalMutations || // We only consider committed mutations for documents that were
      // mutated during the lifetime of the view.
      this.mutatedKeys.has(b.key) && b.hasCommittedMutations);
      let z = !1;
      y && b ? y.data.isEqual(b.data) ? V !== j && (n.track({
        type: 3,
        doc: b
      }), z = !0) : this.nc(y, b) || (n.track({
        type: 2,
        doc: b
      }), z = !0, (u && this.Ju(b, u) > 0 || c && this.Ju(b, c) < 0) && // This doc moved from inside the limit to outside the limit.
      // That means there may be some other doc in the local cache
      // that should be included instead.
      (B = !0)) : !y && b ? (n.track({
        type: 0,
        doc: b
      }), z = !0) : y && !b && (n.track({
        type: 1,
        doc: y
      }), z = !0, (u || c) && // A doc was removed from a full limit query. We'll need to
      // requery from the local cache to see if we know about some other
      // doc that should be in the results.
      (B = !0)), z && (b ? (o = o.add(b), i = j ? i.add(f) : i.delete(f)) : (o = o.delete(f), i = i.delete(f)));
    }));
    const C = this.rc(this.query);
    if (C) if (Oe(this.query)) {
      const f = [];
      o.forEach(((b) => f.push(b)));
      const m = gC(this.query, f);
      let y = new In(ca(this.query));
      for (const b of m) y = y.add(b);
      o.forEach(((b) => {
        y.has(b.key) || (i = i.delete(b.key), n.track({
          type: 1,
          doc: b
        }));
      })), o = y;
    } else {
      const f = this.sc(this.query);
      for (; o.size > C; ) {
        const m = f === "F" ? o.last() : o.first();
        o = o.delete(m.key), i = i.delete(m.key), n.track({
          type: 1,
          doc: m
        });
      }
    }
    return {
      Yu: o,
      ec: n,
      Oo: B,
      mutatedKeys: i
    };
  }
  rc(e) {
    return Oe(e) ? vo(e)?.limit : e.limit || void 0;
  }
  sc(e) {
    if (Oe(e)) {
      const t = vo(e);
      return t && t.limit < 0 ? "L" : "F";
    }
    return e.limitType;
  }
  tc(e, t) {
    if (Oe(e)) {
      const n = vo(e)?.limit;
      return [t.size === n ? t.last() : null, null];
    }
    return [e.limitType === "F" && t.size === this.rc(this.query) ? t.last() : null, e.limitType === "L" && t.size === this.rc(this.query) ? t.first() : null];
  }
  nc(e, t) {
    return e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations;
  }
  /**
   * Updates the view with the given ViewDocumentChanges and optionally updates
   * limbo docs and sync state from the provided target change.
   * @param docChanges - The set of changes to make to the view's docs.
   * @param limboResolutionEnabled - Whether to update limbo documents based on
   *        this change.
   * @param targetChange - A target change to apply for computing limbo docs and
   *        sync state.
   * @param targetIsPendingReset - Whether the target is pending to reset due to
   *        existence filter mismatch. If not explicitly specified, it is treated
   *        equivalently to `false`.
   * @returns A new ViewChange with the given docs, changes, and sync state.
   */
  // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
  applyChanges(e, t, n, s) {
    const i = this.Yu;
    this.Yu = e.Yu, this.mutatedKeys = e.mutatedKeys;
    const o = e.ec.yu();
    o.sort(((C, f) => (function(y, b) {
      const V = (j) => {
        switch (j) {
          case 0:
            return 1;
          case 2:
          case 3:
            return 2;
          case 1:
            return 0;
          default:
            return X(20277, {
              we: j
            });
        }
      };
      return V(y) - V(b);
    })(C.type, f.type) || this.Ju(C.doc, f.doc))), this._c(n), s = s ?? !1;
    const B = t && !s ? this.oc() : [], u = this.Hu.size === 0 && this.current && !s ? 1 : 0, c = u !== this.ju;
    return this.ju = u, o.length !== 0 || c ? {
      snapshot: new tr(
        this.query,
        e.Yu,
        i,
        o,
        e.mutatedKeys,
        u === 0,
        c,
        /* excludesMetadataChanges= */
        !1,
        !!n && n.resumeToken.approximateByteSize() > 0
      ),
      ac: B
    } : {
      ac: B
    };
  }
  /**
   * Applies an OnlineState change to the view, potentially generating a
   * ViewChange if the view's syncState changes as a result.
   */
  xu(e) {
    return this.current && e === "Offline" ? (
      // If we're offline, set `current` to false and then call applyChanges()
      // to refresh our syncState and generate a ViewChange as appropriate. We
      // are guaranteed to get a new TargetChange that sets `current` back to
      // true once the client is back online.
      (this.current = !1, this.applyChanges(
        {
          Yu: this.Yu,
          ec: new rc(),
          mutatedKeys: this.mutatedKeys,
          Oo: !1
        },
        /* limboResolutionEnabled= */
        !1
      ))
    ) : {
      ac: []
    };
  }
  /**
   * Returns whether the doc for the given key should be in limbo.
   */
  uc(e) {
    return !this.zu.has(e) && // The local store doesn't think it's a result, so it shouldn't be in limbo.
    !!this.Yu.has(e) && !this.Yu.get(e).hasLocalMutations;
  }
  /**
   * Updates syncedDocuments, current, and limbo docs based on the given change.
   * Returns the list of changes to which docs are in limbo.
   */
  _c(e) {
    e && (e.addedDocuments.forEach(((t) => this.zu = this.zu.add(t))), e.modifiedDocuments.forEach(((t) => {
    })), e.removedDocuments.forEach(((t) => this.zu = this.zu.delete(t))), this.current = e.current);
  }
  oc() {
    if (!this.current) return [];
    const e = this.Hu;
    this.Hu = ne(), this.Yu.forEach(((n) => {
      this.uc(n.key) && (this.Hu = this.Hu.add(n.key));
    }));
    const t = [];
    return e.forEach(((n) => {
      this.Hu.has(n) || t.push(new bC(n));
    })), this.Hu.forEach(((n) => {
      e.has(n) || t.push(new RC(n));
    })), t;
  }
  /**
   * Update the in-memory state of the current view with the state read from
   * persistence.
   *
   * We update the query view whenever a client's primary status changes:
   * - When a client transitions from primary to secondary, it can miss
   *   LocalStorage updates and its query views may temporarily not be
   *   synchronized with the state on disk.
   * - For secondary to primary transitions, the client needs to update the list
   *   of `syncedDocuments` since secondary clients update their query views
   *   based purely on synthesized RemoteEvents.
   *
   * @param queryResult.documents - The documents that match the query according
   * to the LocalStore.
   * @param queryResult.remoteKeys - The keys of the documents that match the
   * query according to the backend.
   *
   * @returns The ViewChange that resulted from this synchronization.
   */
  // PORTING NOTE: Multi-tab only.
  cc(e) {
    this.zu = e.Wo, this.Hu = ne();
    const t = this.Xu(e.documents);
    return this.applyChanges(
      t,
      /* limboResolutionEnabled= */
      !0
    );
  }
  /**
   * Returns a view snapshot as if this query was just listened to. Contains
   * a document add for every existing document and the `fromCache` and
   * `hasPendingWrites` status of the already established view.
   */
  // PORTING NOTE: Multi-tab only.
  lc() {
    return tr.fromInitialDocuments(this.query, this.Yu, this.mutatedKeys, this.ju === 0, this.hasCachedResults);
  }
}
const rB = "SyncEngine";
class sy {
  constructor(e, t, n) {
    this.query = e, this.targetId = t, this.view = n;
  }
}
class iy {
  constructor(e) {
    this.key = e, /**
     * Set to true once we've received a document. This is used in
     * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
     * decide whether it needs to manufacture a delete event for the target once
     * the target is CURRENT.
     */
    this.Ec = !1;
  }
}
class oy {
  constructor(e, t, n, s, i, o) {
    this.localStore = e, this.remoteStore = t, this.eventManager = n, this.sharedClientState = s, this.currentUser = i, this.maxConcurrentLimboResolutions = o, this.hc = {}, this.Tc = new bn(((B) => hC(B)), Li), this.Pc = /* @__PURE__ */ new Map(), /**
     * The keys of documents that are in limbo for which we haven't yet started a
     * limbo resolution query. The strings in this set are the result of calling
     * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
     *
     * The `Set` type was chosen because it provides efficient lookup and removal
     * of arbitrary elements and it also maintains insertion order, providing the
     * desired queue-like FIFO semantics.
     */
    this.Ic = /* @__PURE__ */ new Set(), /**
     * Keeps track of the target ID for each document that is in limbo with an
     * active target.
     */
    this.Rc = new me(Q.comparator), /**
     * Keeps track of the information about an active limbo resolution for each
     * active target ID that was started for the purpose of limbo resolution.
     */
    this.Ac = /* @__PURE__ */ new Map(), this.Vc = new Qa(), /** Stores user completion handlers, indexed by User and BatchId. */
    this.dc = {}, /** Stores user callbacks waiting for all pending writes to be acknowledged. */
    this.fc = /* @__PURE__ */ new Map(), this.mc = an.bs(), this.onlineState = "Unknown", // The primary state is set to `true` or `false` immediately after Firestore
    // startup. In the interim, a client should only be considered primary if
    // `isPrimary` is true.
    this.gc = void 0;
  }
  get isPrimaryClient() {
    return this.gc === !0;
  }
}
async function ay(r, e, t = !0) {
  const n = PC(r);
  let s;
  const i = n.Tc.get(e);
  return i ? (
    // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
    // already exists when EventManager calls us for the first time. This
    // happens when the primary tab is already listening to this query on
    // behalf of another tab and the user of the primary also starts listening
    // to the query. EventManager will not have an assigned target ID in this
    // case and calls `listen` to obtain this ID.
    (n.sharedClientState.addLocalQueryTarget(i.targetId), s = i.view.lc())
  ) : s = await OC(
    n,
    e,
    t,
    /** shouldInitializeView= */
    !0
  ), s;
}
async function By(r, e) {
  const t = PC(r);
  await OC(
    t,
    e,
    /** shouldListenToRemote= */
    !0,
    /** shouldInitializeView= */
    !1
  );
}
async function OC(r, e, t, n) {
  const s = await j_(r.localStore, Oe(e) ? e : It(e)), i = s.targetId, o = r.sharedClientState.addLocalQueryTarget(i, t);
  let B;
  return n && (B = await uy(r, e, i, o === "current", s.resumeToken)), r.isPrimaryClient && t && DC(r.remoteStore, s), B;
}
async function uy(r, e, t, n, s) {
  r.yc = (f, m, y) => (async function(V, j, z, ue) {
    let Ee = j.view.Xu(z);
    Ee.Oo && // The query has a limit and some docs were removed, so we need
    // to re-run the query against the local store to make sure we
    // didn't lose any good docs that had been past the limit.
    (Ee = await Zl(
      V.localStore,
      j.query,
      /* usePreviousResults= */
      !1
    ).then((({ documents: A }) => j.view.Xu(A, Ee))));
    const De = ue && ue.targetChanges.get(j.targetId), tt = ue && ue.targetMismatches.get(j.targetId) != null, de = j.view.applyChanges(
      Ee,
      /* limboResolutionEnabled= */
      V.isPrimaryClient,
      De,
      tt
    );
    return oc(V, j.targetId, de.ac), de.snapshot;
  })(r, f, m, y);
  const i = await Zl(
    r.localStore,
    e,
    /* usePreviousResults= */
    !0
  ), o = new ry(e, i.Wo), B = o.Xu(i.documents), u = gs.createSynthesizedTargetChangeForCurrentChange(t, n && r.onlineState !== "Offline", s), c = o.applyChanges(
    B,
    /* limboResolutionEnabled= */
    r.isPrimaryClient,
    u
  );
  oc(r, t, c.ac);
  const C = new sy(e, t, o);
  return r.Tc.set(e, C), r.Pc.has(t) ? r.Pc.get(t).push(e) : r.Pc.set(t, [e]), c.snapshot;
}
async function ly(r, e, t) {
  const n = oe(r), s = n.Tc.get(e), i = n.Pc.get(s.targetId);
  if (i.length > 1) return n.Pc.set(s.targetId, i.filter(((o) => !Li(o, e)))), void n.Tc.delete(e);
  n.isPrimaryClient ? (n.sharedClientState.removeLocalQueryTarget(s.targetId), n.sharedClientState.isActiveQueryTarget(s.targetId) || await ha(
    n.localStore,
    s.targetId,
    /*keepPersistedTargetData=*/
    !1
  ).then((() => {
    n.sharedClientState.clearQueryState(s.targetId), t && Wa(n.remoteStore, s.targetId), da(n, s.targetId);
  })).catch(vi)) : (da(n, s.targetId), await ha(
    n.localStore,
    s.targetId,
    /*keepPersistedTargetData=*/
    !0
  ));
}
async function cy(r, e) {
  const t = oe(r), n = t.Tc.get(e), s = t.Pc.get(n.targetId);
  t.isPrimaryClient && s.length === 1 && // PORTING NOTE: Unregister the target ID with local Firestore client as
  // watch target.
  (t.sharedClientState.removeLocalQueryTarget(n.targetId), Wa(t.remoteStore, n.targetId));
}
async function SC(r, e) {
  const t = oe(r);
  try {
    const n = await H_(t.localStore, e);
    e.targetChanges.forEach(((s, i) => {
      const o = t.Ac.get(i);
      o && // Since this is a limbo resolution lookup, it's for a single document
      // and it could be added, modified, or removed, but not a combination.
      ($(s.addedDocuments.size + s.modifiedDocuments.size + s.removedDocuments.size <= 1, 22616), s.addedDocuments.size > 0 ? o.Ec = !0 : s.modifiedDocuments.size > 0 ? $(o.Ec, 14607) : s.removedDocuments.size > 0 && ($(o.Ec, 42227), o.Ec = !1));
    })), await FC(t, n, e);
  } catch (n) {
    await vi(n);
  }
}
function ic(r, e, t) {
  const n = oe(r);
  if (n.isPrimaryClient && t === 0 || !n.isPrimaryClient && t === 1) {
    const s = [];
    n.Tc.forEach(((i, o) => {
      const B = o.view.xu(e);
      B.snapshot && s.push(B.snapshot);
    })), (function(o, B) {
      const u = oe(o);
      u.onlineState = B;
      let c = !1;
      u.queries.forEach(((C, f) => {
        for (const m of f.bu)
          m.xu(B) && (c = !0);
      })), c && nB(u);
    })(n.eventManager, e), s.length && n.hc.Tn(s), n.onlineState = e, n.isPrimaryClient && n.sharedClientState.setOnlineState(e);
  }
}
async function hy(r, e, t) {
  const n = oe(r);
  n.sharedClientState.updateQueryState(e, "rejected", t);
  const s = n.Ac.get(e), i = s && s.key;
  if (i) {
    let o = new me(Q.comparator);
    o = o.insert(i, ke.newNoDocument(i, Z.min()));
    const B = ne().add(i), u = new ds(
      Z.min(),
      /* targetChanges= */
      /* @__PURE__ */ new Map(),
      /* targetMismatches= */
      new me(te),
      o,
      at(),
      B
    );
    await SC(n, u), // Since this query failed, we won't want to manually unlisten to it.
    // We only remove it from bookkeeping after we successfully applied the
    // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
    // this query when the RemoteStore restarts the Watch stream, which should
    // re-trigger the target failure.
    n.Rc = n.Rc.remove(i), n.Ac.delete(e), sB(n);
  } else await ha(
    n.localStore,
    e,
    /* keepPersistedTargetData */
    !1
  ).then((() => da(n, e, t))).catch(vi);
}
function da(r, e, t = null) {
  r.sharedClientState.removeLocalQueryTarget(e);
  for (const n of r.Pc.get(e)) r.Tc.delete(n), t && r.hc.wc(n, t);
  r.Pc.delete(e), r.isPrimaryClient && r.Vc.e_(e).forEach(((n) => {
    r.Vc.containsKey(n) || // We removed the last reference for this key
    NC(r, n);
  }));
}
function NC(r, e) {
  r.Ic.delete(e.path.canonicalString());
  const t = r.Rc.get(e);
  t !== null && (Wa(r.remoteStore, t), r.Rc = r.Rc.remove(e), r.Ac.delete(t), sB(r));
}
function oc(r, e, t) {
  for (const n of t) n instanceof RC ? (r.Vc.addReference(n.key, e), Cy(r, n)) : n instanceof bC ? (U(rB, "Document no longer in limbo: " + n.key), r.Vc.removeReference(n.key, e), r.Vc.containsKey(n.key) || // We removed the last reference for this key
  NC(r, n.key)) : X(19791, {
    bc: n
  });
}
function Cy(r, e) {
  const t = e.key, n = t.path.canonicalString();
  r.Rc.get(t) || r.Ic.has(n) || (U(rB, "New document in limbo: " + t), r.Ic.add(n), sB(r));
}
function sB(r) {
  for (; r.Ic.size > 0 && r.Rc.size < r.maxConcurrentLimboResolutions; ) {
    const e = r.Ic.values().next().value;
    r.Ic.delete(e);
    const t = new Q(Be.fromString(e)), n = r.mc.next();
    r.Ac.set(n, new iy(t)), r.Rc = r.Rc.insert(t, n), DC(r.remoteStore, new bt(It(ba(t.path)), n, "TargetPurposeLimboResolution", Ai.wn));
  }
}
async function FC(r, e, t) {
  const n = oe(r), s = [], i = [], o = [];
  n.Tc.isEmpty() || (n.Tc.forEach(((B, u) => {
    o.push(n.yc(u, e, t).then(((c) => {
      if ((c || t) && n.isPrimaryClient) {
        const C = c ? !c.fromCache : t?.targetChanges.get(u.targetId)?.current;
        n.sharedClientState.updateQueryState(u.targetId, C ? "current" : "not-current");
      }
      if (c) {
        s.push(c);
        const C = $a.mo(u.targetId, c);
        i.push(C);
      }
    })));
  })), await Promise.all(o), n.hc.Tn(s), await (async function(u, c) {
    const C = oe(u);
    try {
      await C.persistence.runTransaction("notifyLocalViewChanges", "readwrite", ((f) => L.forEach(c, ((m) => L.forEach(m.Vo, ((y) => C.persistence.referenceDelegate.addReference(f, m.targetId, y))).next((() => L.forEach(m.fo, ((y) => C.persistence.referenceDelegate.removeReference(f, m.targetId, y)))))))));
    } catch (f) {
      if (!or(f)) throw f;
      U(Ya, "Failed to update sequence numbers: " + f);
    }
    for (const f of c) {
      const m = f.targetId;
      if (!f.fromCache) {
        const y = C.Lo.get(m), b = y.snapshotVersion, V = y.withLastLimboFreeSnapshotVersion(b);
        C.Lo = C.Lo.insert(m, V);
      }
    }
  })(n.localStore, i));
}
async function fy(r, e) {
  const t = oe(r);
  if (!t.currentUser.isEqual(e)) {
    U(rB, "User change. New user:", e.toKey());
    const n = await mC(t.localStore, e);
    t.currentUser = e, // Fails tasks waiting for pending writes requested by previous user.
    (function(i, o) {
      i.fc.forEach(((B) => {
        B.forEach(((u) => {
          u.reject(new H(M.CANCELLED, o));
        }));
      })), i.fc.clear();
    })(t, "'waitForPendingWrites' promise is rejected due to a user change."), // TODO(b/114226417): Consider calling this only in the primary tab.
    t.sharedClientState.handleUserChange(e, n.removedBatchIds, n.addedBatchIds), await FC(t, n.$o);
  }
}
function dy(r, e) {
  const t = oe(r), n = t.Ac.get(e);
  if (n && n.Ec) return ne().add(n.key);
  {
    let s = ne();
    const i = t.Pc.get(e);
    if (!i) return s;
    for (const o of i ?? []) {
      const B = t.Tc.get(o);
      s = s.unionWith(B.view.Zu);
    }
    return s;
  }
}
function PC(r) {
  const e = oe(r);
  return e.remoteStore.remoteSyncer.applyRemoteEvent = SC.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = dy.bind(null, e), e.remoteStore.remoteSyncer.rejectListen = hy.bind(null, e), e.hc.Tn = ty.bind(null, e.eventManager), e.hc.wc = ny.bind(null, e.eventManager), e;
}
class gi {
  constructor() {
    this.kind = "memory", this.synchronizeTabs = !1;
  }
  async initialize(e) {
    this.serializer = Ti(e.databaseInfo.databaseId), this.sharedClientState = this.vc(e), this.persistence = this.Dc(e), await this.persistence.start(), this.localStore = this.xc(e), this.gcScheduler = this.Cc(e, this.localStore), this.indexBackfillerScheduler = this.Fc(e, this.localStore);
  }
  Cc(e, t) {
    return null;
  }
  Fc(e, t) {
    return null;
  }
  xc(e) {
    return k_(this.persistence, new V_(), e.initialUser, this.serializer);
  }
  Dc(e) {
    return new pC(za.b_, this.serializer);
  }
  vc(e) {
    return new X_();
  }
  async terminate() {
    this.gcScheduler?.stop(), this.indexBackfillerScheduler?.stop(), this.sharedClientState.shutdown(), await this.persistence.shutdown();
  }
}
gi.provider = {
  build: () => new gi()
};
class gy extends gi {
  constructor(e) {
    super(), this.cacheSizeBytes = e;
  }
  Cc(e, t) {
    $(this.persistence.referenceDelegate instanceof di, 46915);
    const n = this.persistence.referenceDelegate.garbageCollector;
    return new RE(n, e.asyncQueue, t);
  }
  Dc(e) {
    const t = this.cacheSizeBytes !== void 0 ? Ye.withCacheSize(this.cacheSizeBytes) : Ye.DEFAULT;
    return new pC(((n) => di.b_(n, t)), this.serializer);
  }
}
class ga {
  async initialize(e, t) {
    this.localStore || (this.localStore = e.localStore, this.sharedClientState = e.sharedClientState, this.datastore = this.createDatastore(t), this.remoteStore = this.createRemoteStore(t), this.eventManager = this.createEventManager(t), this.syncEngine = this.createSyncEngine(
      t,
      /* startAsPrimary=*/
      !e.synchronizeTabs
    ), this.sharedClientState.onlineStateHandler = (n) => ic(
      this.syncEngine,
      n,
      1
      /* OnlineStateSource.SharedClientState */
    ), this.remoteStore.remoteSyncer.handleCredentialChange = fy.bind(null, this.syncEngine), await W_(this.remoteStore, this.syncEngine.isPrimaryClient));
  }
  createEventManager(e) {
    return (function() {
      return new ey();
    })();
  }
  createDatastore(e) {
    const t = Ti(e.databaseInfo.databaseId), n = dE(e.databaseInfo);
    return DE(e.authCredentials, e.appCheckCredentials, n, t);
  }
  createRemoteStore(e) {
    return (function(n, s, i, o, B) {
      return new K_(n, s, i, o, B);
    })(this.localStore, this.datastore, e.asyncQueue, ((t) => ic(
      this.syncEngine,
      t,
      0
      /* OnlineStateSource.RemoteStore */
    )), (function() {
      return Ul.Ye() ? new Ul() : new cE();
    })());
  }
  createSyncEngine(e, t) {
    return (function(s, i, o, B, u, c, C) {
      const f = new oy(s, i, o, B, u, c);
      return C && (f.gc = !0), f;
    })(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, e.initialUser, e.maxConcurrentLimboResolutions, t);
  }
  async terminate() {
    await (async function(t) {
      const n = oe(t);
      U(Pt, "RemoteStore shutting down."), n.la.add(
        5
        /* OfflineCause.Shutdown */
      ), await ms(n), n.ha.shutdown(), // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
      // triggering spurious listener events with cached data, etc.
      n.Ta.set(
        "Unknown"
        /* OnlineState.Unknown */
      );
    })(this.remoteStore), this.datastore?.terminate(), this.eventManager?.terminate();
  }
}
ga.provider = {
  build: () => new ga()
};
const Bn = "FirestoreClient";
class py {
  constructor(e, t, n, s, i) {
    this.authCredentials = e, this.appCheckCredentials = t, this.asyncQueue = n, this._databaseInfo = s, this.user = Ge.UNAUTHENTICATED, this.clientId = Ia.newId(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this._uninitializedComponentsProvider = i, this.authCredentials.start(n, (async (o) => {
      U(Bn, "Received user=", o.uid), await this.authCredentialListener(o), this.user = o;
    })), this.appCheckCredentials.start(n, ((o) => (U(Bn, "Received new app check token=", o), this.appCheckCredentialListener(o, this.user))));
  }
  get configuration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this._databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: 100
    };
  }
  setCredentialChangeListener(e) {
    this.authCredentialListener = e;
  }
  setAppCheckTokenChangeListener(e) {
    this.appCheckCredentialListener = e;
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const e = new Yt();
    return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async () => {
      try {
        this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), // The credentials provider must be terminated after shutting down the
        // RemoteStore as it will prevent the RemoteStore from retrieving auth
        // tokens.
        this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), e.resolve();
      } catch (t) {
        const n = wC(t, "Failed to shutdown persistence");
        e.reject(n);
      }
    })), e.promise;
  }
}
async function bo(r, e) {
  r.asyncQueue.verifyOperationInProgress(), U(Bn, "Initializing OfflineComponentProvider");
  const t = r.configuration;
  await e.initialize(t);
  let n = t.initialUser;
  r.setCredentialChangeListener((async (s) => {
    n.isEqual(s) || (await mC(e.localStore, s), n = s);
  })), // When a user calls clearPersistence() in one client, all other clients
  // need to be terminated to allow the delete to succeed.
  e.persistence.setDatabaseDeletedListener((() => r.terminate())), r._offlineComponents = e;
}
async function ac(r, e) {
  r.asyncQueue.verifyOperationInProgress();
  const t = await my(r);
  U(Bn, "Initializing OnlineComponentProvider"), await e.initialize(t, r.configuration), // The CredentialChangeListener of the online component provider takes
  // precedence over the offline component provider.
  r.setCredentialChangeListener(((n) => tc(e.remoteStore, n))), r.setAppCheckTokenChangeListener(((n, s) => tc(e.remoteStore, s))), r._onlineComponents = e;
}
async function my(r) {
  if (!r._offlineComponents) if (r._uninitializedComponentsProvider) {
    U(Bn, "Using user provided OfflineComponentProvider");
    try {
      await bo(r, r._uninitializedComponentsProvider._offline);
    } catch (e) {
      const t = e;
      if (!(function(s) {
        return s.name === "FirebaseError" ? s.code === M.FAILED_PRECONDITION || s.code === M.UNIMPLEMENTED : !(typeof DOMException < "u" && s instanceof DOMException) || // When the browser is out of quota we could get either quota exceeded
        // or an aborted error depending on whether the error happened during
        // schema migration.
        s.code === 22 || s.code === 20 || // Firefox Private Browsing mode disables IndexedDb and returns
        // INVALID_STATE for any usage.
        s.code === 11;
      })(t)) throw t;
      dt("Error using user provided cache. Falling back to memory cache: " + t), await bo(r, new gi());
    }
  } else U(Bn, "Using default OfflineComponentProvider"), await bo(r, new gy(void 0));
  return r._offlineComponents;
}
async function Ey(r) {
  return r._onlineComponents || (r._uninitializedComponentsProvider ? (U(Bn, "Using user provided OnlineComponentProvider"), await ac(r, r._uninitializedComponentsProvider._online)) : (U(Bn, "Using default OnlineComponentProvider"), await ac(r, new ga()))), r._onlineComponents;
}
async function LC(r) {
  const e = await Ey(r), t = e.eventManager;
  return t.onListen = ay.bind(null, e.syncEngine), t.onUnlisten = ly.bind(null, e.syncEngine), t.onFirstRemoteStoreListen = By.bind(null, e.syncEngine), t.onLastRemoteStoreUnlisten = cy.bind(null, e.syncEngine), t;
}
function Dy(r, e, t = {}) {
  const n = new Yt();
  return r.asyncQueue.enqueueAndForget((async () => (function(i, o, B, u, c) {
    const C = new IC({
      next: (m) => {
        C.Va(), o.enqueueAndForget((() => AC(i, f)));
        const y = m.docs.has(B);
        !y && m.fromCache ? (
          // TODO(dimond): If we're online and the document doesn't
          // exist then we resolve with a doc.exists set to false. If
          // we're offline however, we reject the Promise in this
          // case. Two options: 1) Cache the negative response from
          // the server so we can deliver that even when you're
          // offline 2) Actually reject the Promise in the online case
          // if the document doesn't exist.
          c.reject(new H(M.UNAVAILABLE, "Failed to get document because the client is offline."))
        ) : y && m.fromCache && u && u.source === "server" ? c.reject(new H(M.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : c.resolve(m);
      },
      error: (m) => c.reject(m)
    }), f = new vC(ba(B.path), C, {
      includeMetadataChanges: !0,
      waitForSyncWhenOnline: !0
    });
    return TC(i, f);
  })(await LC(r), r.asyncQueue, e, t, n))), n.promise;
}
function _y(r, e, t = {}) {
  const n = new Yt();
  return r.asyncQueue.enqueueAndForget((async () => (function(i, o, B, u, c) {
    const C = new IC({
      next: (m) => {
        C.Va(), o.enqueueAndForget((() => AC(i, f))), m.fromCache && u.source === "server" ? c.reject(new H(M.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : c.resolve(m);
      },
      error: (m) => c.reject(m)
    }), f = new vC(B instanceof Jr ? C_(B) : B, C, {
      includeMetadataChanges: !0,
      waitForSyncWhenOnline: !0
    });
    return TC(i, f);
  })(await LC(r), r.asyncQueue, e, t, n))), n.promise;
}
let xC = class {
  // Note: This class is stripped down version of the DocumentSnapshot in
  // the legacy SDK. The changes are:
  // - No support for SnapshotMetadata.
  // - No support for SnapshotOptions.
  /** @hideconstructor protected */
  constructor(e, t, n, s, i) {
    this._firestore = e, this._userDataWriter = t, this._key = n, this._document = s, this._converter = i;
  }
  /** Property of the `DocumentSnapshot` that provides the document's ID. */
  get id() {
    return this._key.path.lastSegment();
  }
  /**
   * The `DocumentReference` for the document included in the `DocumentSnapshot`.
   */
  get ref() {
    return new we(this._firestore, this._converter, this._key);
  }
  /**
   * Signals whether or not the document at the snapshot's location exists.
   *
   * @returns true if the document exists.
   */
  exists() {
    return this._document !== null;
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */
  data() {
    if (this._document) {
      if (this._converter) {
        const e = new yy(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          /* converter= */
          null
        );
        return this._converter.fromFirestore(e);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  /**
   * @internal
   * @private
   *
   * Retrieves all fields in the document as a proto Value. Returns `undefined` if
   * the document doesn't exist.
   *
   * @returns An `Object` containing all fields in the document or `undefined`
   * if the document doesn't exist.
   */
  _fieldsProto() {
    return this._document?.data.clone().value.mapValue.fields ?? void 0;
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(e) {
    if (this._document) {
      const t = this._document.data.field(bi("DocumentSnapshot.get", e));
      if (t !== null) return this._userDataWriter.convertValue(t);
    }
  }
}, yy = class extends xC {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * @override
   * @returns An `Object` containing all fields in the document.
   */
  data() {
    return super.data();
  }
};
class Iy {
  convertValue(e, t = "none") {
    switch (ve(e)) {
      case 0:
        return null;
      case 1:
        return e.booleanValue;
      case 2:
        return ge(e.integerValue || e.doubleValue);
      case 3:
        return this.convertTimestamp(e.timestampValue);
      case 4:
        return this.convertServerTimestamp(e, t);
      case 5:
        return e.stringValue;
      case 6:
        return this.convertBytes(tn(e.bytesValue));
      case 7:
        return this.convertReference(e.referenceValue);
      case 8:
        return this.convertGeoPoint(e.geoPointValue);
      case 9:
        return this.convertArray(e.arrayValue, t);
      case 11:
        return this.convertObject(e.mapValue, t);
      case 10:
        return this.convertVectorValue(e.mapValue);
      default:
        throw X(62114, {
          value: e
        });
    }
  }
  convertObject(e, t) {
    return this.convertObjectMap(e.fields, t);
  }
  /**
   * @internal
   */
  convertObjectMap(e, t = "none") {
    const n = {};
    return ir(e, ((s, i) => {
      n[s] = this.convertValue(i, t);
    })), n;
  }
  /**
   * @internal
   */
  convertVectorValue(e) {
    const t = e.fields?.[es].arrayValue?.values?.map(((n) => ge(n.doubleValue)));
    return new We(t);
  }
  convertGeoPoint(e) {
    return new wt(ge(e.latitude), ge(e.longitude));
  }
  convertArray(e, t) {
    return (e.values || []).map(((n) => this.convertValue(n, t)));
  }
  convertServerTimestamp(e, t) {
    switch (t) {
      case "previous":
        const n = Cs(e);
        return n == null ? null : this.convertValue(n, t);
      case "estimate":
        return this.convertTimestamp(Yn(e));
      default:
        return null;
    }
  }
  convertTimestamp(e) {
    const t = en(e);
    return new le(t.seconds, t.nanos);
  }
  convertDocumentKey(e, t) {
    const n = Be.fromString(e);
    $(Gh(n), 9688, {
      name: e
    });
    const s = new Xr(n.get(1), n.get(3)), i = new Q(n.popFirst(5));
    return s.isEqual(t) || // TODO(b/64130202): Somehow support foreign references.
    Nt(`A document reference to ${i} refers to a different database (${s.projectId}/${s.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`), i;
  }
}
const Bc = "AsyncQueue";
class uc {
  constructor(e = Promise.resolve()) {
    this.$c = [], // Is this AsyncQueue being shut down? Once it is set to true, it will not
    // be changed again.
    this.Kc = !1, // Operations scheduled to be queued in the future. Operations are
    // automatically removed after they are run or canceled.
    this.Qc = [], // visible for testing
    this.Wc = null, // Flag set while there's an outstanding AsyncQueue operation, used for
    // assertion sanity-checks.
    this.Gc = !1, // Enabled during shutdown on Safari to prevent future access to IndexedDB.
    this.zc = !1, // List of TimerIds to fast-forward delays for.
    this.jc = [], // Backoff timer used to schedule retries for retryable operations
    this.Ht = new qh(
      this,
      "async_queue_retry"
      /* TimerId.AsyncQueueRetry */
    ), // Visibility handler that triggers an immediate retry of all retryable
    // operations. Meant to speed up recovery when we regain file system access
    // after page comes into foreground.
    this.Hc = () => {
      const n = Ro();
      n && U(Bc, "Visibility state changed to " + n.visibilityState), this.Ht.$t();
    }, this.Jc = e;
    const t = Ro();
    t && typeof t.addEventListener == "function" && t.addEventListener("visibilitychange", this.Hc);
  }
  get isShuttingDown() {
    return this.Kc;
  }
  /**
   * Adds a new operation to the queue without waiting for it to complete (i.e.
   * we ignore the Promise result).
   */
  enqueueAndForget(e) {
    this.enqueue(e);
  }
  enqueueAndForgetEvenWhileRestricted(e) {
    this.Yc(), // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.Zc(e);
  }
  enterRestrictedMode(e) {
    if (!this.Kc) {
      this.Kc = !0, this.zc = e || !1;
      const t = Ro();
      t && typeof t.removeEventListener == "function" && t.removeEventListener("visibilitychange", this.Hc);
    }
  }
  enqueue(e) {
    if (this.Yc(), this.Kc)
      return new Promise((() => {
      }));
    const t = new Yt();
    return this.Zc((() => this.Kc && this.zc ? Promise.resolve() : (e().then(t.resolve, t.reject), t.promise))).then((() => t.promise));
  }
  enqueueRetryable(e) {
    this.enqueueAndForget((() => (this.$c.push(e), this.Xc())));
  }
  /**
   * Runs the next operation from the retryable queue. If the operation fails,
   * reschedules with backoff.
   */
  async Xc() {
    if (this.$c.length !== 0) {
      try {
        await this.$c[0](), this.$c.shift(), this.Ht.reset();
      } catch (e) {
        if (!or(e)) throw e;
        U(Bc, "Operation failed with retryable error: " + e);
      }
      this.$c.length > 0 && // If there are additional operations, we re-schedule `retryNextOp()`.
      // This is necessary to run retryable operations that failed during
      // their initial attempt since we don't know whether they are already
      // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
      // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
      // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
      // call scheduled here.
      // Since `backoffAndRun()` cancels an existing backoff and schedules a
      // new backoff on every call, there is only ever a single additional
      // operation in the queue.
      this.Ht.kt((() => this.Xc()));
    }
  }
  Zc(e) {
    const t = this.Jc.then((() => (this.Gc = !0, e().catch(((n) => {
      throw this.Wc = n, this.Gc = !1, Nt("INTERNAL UNHANDLED ERROR: ", lc(n)), n;
    })).then(((n) => (this.Gc = !1, n))))));
    return this.Jc = t, t;
  }
  enqueueAfterDelay(e, t, n) {
    this.Yc(), // Fast-forward delays for timerIds that have been overridden.
    this.jc.indexOf(e) > -1 && (t = 0);
    const s = tB.createAndSchedule(this, e, t, n, ((i) => this.el(i)));
    return this.Qc.push(s), s;
  }
  Yc() {
    this.Wc && X(47125, {
      tl: lc(this.Wc)
    });
  }
  verifyOperationInProgress() {
  }
  /**
   * Waits until all currently queued tasks are finished executing. Delayed
   * operations are not run.
   */
  async nl() {
    let e;
    do
      e = this.Jc, await e;
    while (e !== this.Jc);
  }
  /**
   * For Tests: Determine if a delayed operation with a particular TimerId
   * exists.
   */
  rl(e) {
    for (const t of this.Qc) if (t.timerId === e) return !0;
    return !1;
  }
  /**
   * For Tests: Runs some or all delayed operations early.
   *
   * @param lastTimerId - Delayed operations up to and including this TimerId
   * will be drained. Pass TimerId.All to run all delayed operations.
   * @returns a Promise that resolves once all operations have been run.
   */
  il(e) {
    return this.nl().then((() => {
      this.Qc.sort(((t, n) => t.targetTimeMs - n.targetTimeMs));
      for (const t of this.Qc) if (t.skipDelay(), e !== "all" && t.timerId === e) break;
      return this.nl();
    }));
  }
  /**
   * For Tests: Skip all subsequent delays for a timer id.
   */
  sl(e) {
    this.jc.push(e);
  }
  /** Called once a DelayedOperation is run or canceled. */
  el(e) {
    const t = this.Qc.indexOf(e);
    this.Qc.splice(t, 1);
  }
}
function lc(r) {
  let e = r.message || "";
  return r.stack && (e = r.stack.includes(r.message) ? r.stack : r.message + `
` + r.stack), e;
}
class iB extends Ri {
  /** @hideconstructor */
  constructor(e, t, n, s) {
    super(e, t, n, s), /**
     * Whether it's a {@link Firestore} or Firestore Lite instance.
     */
    this.type = "firestore", this._queue = new uc(), this._persistenceKey = s?.name || "[DEFAULT]";
  }
  async _terminate() {
    if (this._firestoreClient) {
      const e = this._firestoreClient.terminate();
      this._queue = new uc(e), this._firestoreClient = void 0, await e;
    }
  }
}
function wy(r, e) {
  const t = typeof r == "object" ? r : cp(), n = typeof r == "string" ? r : ii, s = op(t, "firestore").getImmediate({
    identifier: n
  });
  if (!s._initialized) {
    const i = Zd("firestore");
    i && SE(s, ...i);
  }
  return s;
}
function VC(r) {
  if (r._terminated) throw new H(M.FAILED_PRECONDITION, "The client has already been terminated.");
  return r._firestoreClient || Ty(r), r._firestoreClient;
}
function Ty(r) {
  const e = r._freezeSettings(), t = yE(r._databaseId, r._app?.options.appId || "", r._persistenceKey, r._app?.options.apiKey, e);
  r._componentsProvider || e.localCache?._offlineComponentProvider && e.localCache?._onlineComponentProvider && (r._componentsProvider = {
    _offline: e.localCache._offlineComponentProvider,
    _online: e.localCache._onlineComponentProvider
  }), r._firestoreClient = new py(r._authCredentials, r._appCheckCredentials, r._queue, t, r._componentsProvider && (function(s) {
    const i = s?._online.build();
    return {
      _offline: s?._offline.build(i),
      _online: i
    };
  })(r._componentsProvider));
}
class MC extends Iy {
  constructor(e) {
    super(), this.firestore = e;
  }
  convertBytes(e) {
    return new ct(e);
  }
  convertReference(e) {
    const t = this.convertDocumentKey(e, this.firestore._databaseId);
    return new we(
      this.firestore,
      /* converter= */
      null,
      t
    );
  }
}
class Lr {
  /** @hideconstructor */
  constructor(e, t) {
    this.hasPendingWrites = e, this.fromCache = t;
  }
  /**
   * Returns true if this `SnapshotMetadata` is equal to the provided one.
   *
   * @param other - The `SnapshotMetadata` to compare against.
   * @returns true if this `SnapshotMetadata` is equal to the provided one.
   */
  isEqual(e) {
    return this.hasPendingWrites === e.hasPendingWrites && this.fromCache === e.fromCache;
  }
}
class wn extends xC {
  /** @hideconstructor protected */
  constructor(e, t, n, s, i, o) {
    super(e, t, n, s, o), this._firestore = e, this._firestoreImpl = e, this.metadata = i;
  }
  /**
   * Returns whether or not the data exists. True if the document exists.
   */
  exists() {
    return super.exists();
  }
  /**
   * Retrieves all fields in the document as an `Object`. Returns `undefined` if
   * the document doesn't exist.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document or `undefined` if
   * the document doesn't exist.
   */
  data(e = {}) {
    if (this._document) {
      if (this._converter) {
        const t = new Zs(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          this.metadata,
          /* converter= */
          null
        );
        return this._converter.fromFirestore(t, e);
      }
      return this._userDataWriter.convertValue(this._document.data.value, e.serverTimestamps);
    }
  }
  /**
   * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
   * document or field doesn't exist.
   *
   * By default, a `serverTimestamp()` that has not yet been set to
   * its final value will be returned as `null`. You can override this by
   * passing an options object.
   *
   * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
   * field.
   * @param options - An options object to configure how the field is retrieved
   * from the snapshot (for example the desired behavior for server timestamps
   * that have not yet been set to their final value).
   * @returns The data at the specified field location or undefined if no such
   * field exists in the document.
   */
  // We are using `any` here to avoid an explicit cast by our users.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(e, t = {}) {
    if (this._document) {
      const n = this._document.data.field(bi("DocumentSnapshot.get", e));
      if (n !== null) return this._userDataWriter.convertValue(n, t.serverTimestamps);
    }
  }
  /**
   * Returns a JSON-serializable representation of this `DocumentSnapshot` instance.
   *
   * @returns a JSON representation of this object.  Throws a {@link FirestoreError} if this
   * `DocumentSnapshot` has pending writes.
   */
  toJSON() {
    if (this.metadata.hasPendingWrites) throw new H(M.FAILED_PRECONDITION, "DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
    const e = this._document, t = {};
    return t.type = wn._jsonSchemaVersion, t.bundle = "", t.bundleSource = "DocumentSnapshot", t.bundleName = this._key.toString(), !e || !e.isValidDocument() || !e.isFoundDocument() ? t : (this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields, "previous"), t.bundle = (this._firestore, this.ref.path, "NOT SUPPORTED"), t);
  }
}
wn._jsonSchemaVersion = "firestore/documentSnapshot/1.0", wn._jsonSchema = {
  type: Ie("string", wn._jsonSchemaVersion),
  bundleSource: Ie("string", "DocumentSnapshot"),
  bundleName: Ie("string"),
  bundle: Ie("string")
};
class Zs extends wn {
  /**
   * Retrieves all fields in the document as an `Object`.
   *
   * By default, `serverTimestamp()` values that have not yet been
   * set to their final value will be returned as `null`. You can override
   * this by passing an options object.
   *
   * @override
   * @param options - An options object to configure how data is retrieved from
   * the snapshot (for example the desired behavior for server timestamps that
   * have not yet been set to their final value).
   * @returns An `Object` containing all fields in the document.
   */
  data(e = {}) {
    return super.data(e);
  }
}
class Qn {
  /** @hideconstructor */
  constructor(e, t, n, s) {
    this._firestore = e, this._userDataWriter = t, this._snapshot = s, this.metadata = new Lr(s.hasPendingWrites, s.fromCache), this.query = n;
  }
  /** An array of all the documents in the `QuerySnapshot`. */
  get docs() {
    const e = [];
    return this.forEach(((t) => e.push(t))), e;
  }
  /** The number of documents in the `QuerySnapshot`. */
  get size() {
    return this._snapshot.docs.size;
  }
  /** True if there are no documents in the `QuerySnapshot`. */
  get empty() {
    return this.size === 0;
  }
  /**
   * Enumerates all of the documents in the `QuerySnapshot`.
   *
   * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
   * each document in the snapshot.
   * @param thisArg - The `this` binding for the callback.
   */
  forEach(e, t) {
    this._snapshot.docs.forEach(((n) => {
      e.call(t, new Zs(this._firestore, this._userDataWriter, n.key, n, new Lr(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
    }));
  }
  /**
   * Returns an array of the documents changes since the last snapshot. If this
   * is the first snapshot, all documents will be in the list as 'added'
   * changes.
   *
   * @param options - `SnapshotListenOptions` that control whether metadata-only
   * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
   * snapshot events.
   */
  docChanges(e = {}) {
    const t = !!e.includeMetadataChanges;
    if (t && this._snapshot.excludesMetadataChanges) throw new H(M.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
    return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === t || (this._cachedChanges = /** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */
    (function(s, i) {
      if (s._snapshot.oldDocs.isEmpty()) {
        let o = 0;
        return s._snapshot.docChanges.map(((B) => {
          Oe(s._snapshot.query) ? ca(s._snapshot.query) : Oa(s.query._query);
          const u = new Zs(s._firestore, s._userDataWriter, B.doc.key, B.doc, new Lr(s._snapshot.mutatedKeys.has(B.doc.key), s._snapshot.fromCache), s.query.converter);
          return B.doc, {
            type: "added",
            doc: u,
            oldIndex: -1,
            newIndex: o++
          };
        }));
      }
      {
        let o = s._snapshot.oldDocs;
        return s._snapshot.docChanges.filter(((B) => i || B.type !== 3)).map(((B) => {
          const u = new Zs(s._firestore, s._userDataWriter, B.doc.key, B.doc, new Lr(s._snapshot.mutatedKeys.has(B.doc.key), s._snapshot.fromCache), s.query.converter);
          let c = -1, C = -1;
          return B.type !== 0 && (c = o.indexOf(B.doc.key), o = o.delete(B.doc.key)), B.type !== 1 && (o = o.add(B.doc), C = o.indexOf(B.doc.key)), {
            type: Ay(B.type),
            doc: u,
            oldIndex: c,
            newIndex: C
          };
        }));
      }
    })(this, t), this._cachedChangesIncludeMetadataChanges = t), this._cachedChanges;
  }
  /**
   * Returns a JSON-serializable representation of this `QuerySnapshot` instance.
   *
   * @returns a JSON representation of this object. Throws a {@link FirestoreError} if this
   * `QuerySnapshot` has pending writes.
   */
  toJSON() {
    if (this.metadata.hasPendingWrites) throw new H(M.FAILED_PRECONDITION, "QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");
    const e = {};
    e.type = Qn._jsonSchemaVersion, e.bundleSource = "QuerySnapshot", e.bundleName = Ia.newId(), this._firestore._databaseId.database, this._firestore._databaseId.projectId;
    const t = [], n = [], s = [];
    return this.docs.forEach(((i) => {
      i._document !== null && (t.push(i._document), n.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields, "previous")), s.push(i.ref.path));
    })), e.bundle = (this._firestore, this.query._query, e.bundleName, "NOT SUPPORTED"), e;
  }
}
function Ay(r) {
  switch (r) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return X(61501, {
        type: r
      });
  }
}
Qn._jsonSchemaVersion = "firestore/querySnapshot/1.0", Qn._jsonSchema = {
  type: Ie("string", Qn._jsonSchemaVersion),
  bundleSource: Ie("string", "QuerySnapshot"),
  bundleName: Ie("string"),
  bundle: Ie("string")
};
function vy(r) {
  if (r.limitType === "L" && r.explicitOrderBy.length === 0) throw new H(M.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
class oB {
}
class Ry extends oB {
}
function by(r, e, ...t) {
  let n = [];
  e instanceof oB && n.push(e), n = n.concat(t), (function(i) {
    const o = i.filter(((u) => u instanceof aB)).length, B = i.filter(((u) => u instanceof Mi)).length;
    if (o > 1 || o > 0 && B > 0) throw new H(M.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
  })(n);
  for (const s of n) r = s._apply(r);
  return r;
}
class Mi extends Ry {
  /**
   * @internal
   */
  constructor(e, t, n) {
    super(), this._field = e, this._op = t, this._value = n, /** The type of this query constraint */
    this.type = "where";
  }
  static _create(e, t, n) {
    return new Mi(e, t, n);
  }
  _apply(e) {
    const t = this._parse(e);
    return GC(e._query, t), new ar(e.firestore, e.converter, ia(e._query, t));
  }
  _parse(e) {
    const t = LE(e.firestore);
    return (function(i, o, B, u, c, C, f) {
      let m;
      if (c.isKeyField()) {
        if (C === "array-contains" || C === "array-contains-any") throw new H(M.INVALID_ARGUMENT, `Invalid Query. You can't perform '${C}' queries on documentId().`);
        if (C === "in" || C === "not-in") {
          Cc(f, C);
          const b = [];
          for (const V of f) b.push(hc(u, i, V));
          m = {
            arrayValue: {
              values: b
            }
          };
        } else m = hc(u, i, f);
      } else C !== "in" && C !== "not-in" && C !== "array-contains-any" || Cc(f, C), m = xE(
        B,
        o,
        f,
        /* allowArrays= */
        C === "in" || C === "not-in"
      );
      return ye.create(c, C, m);
    })(e._query, "where", t, e.firestore._databaseId, this._field, this._op, this._value);
  }
}
function cc(r, e, t) {
  const n = e, s = bi("where", r);
  return Mi._create(s, n, t);
}
class aB extends oB {
  /**
   * @internal
   */
  constructor(e, t) {
    super(), this.type = e, this._queryConstraints = t;
  }
  static _create(e, t) {
    return new aB(e, t);
  }
  _parse(e) {
    const t = this._queryConstraints.map(((n) => n._parse(e))).filter(((n) => n.getFilters().length > 0));
    return t.length === 1 ? t[0] : gt.create(t, this._getOperator());
  }
  _apply(e) {
    const t = this._parse(e);
    return t.getFilters().length === 0 ? e : ((function(s, i) {
      let o = s;
      const B = i.getFlattenedFilters();
      for (const u of B) GC(o, u), o = ia(o, u);
    })(e._query, t), new ar(e.firestore, e.converter, ia(e._query, t)));
  }
  _getQueryConstraints() {
    return this._queryConstraints;
  }
  _getOperator() {
    return this.type === "and" ? "and" : "or";
  }
}
function hc(r, e, t) {
  if (typeof (t = zn(t)) == "string") {
    if (t === "") throw new H(M.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!vh(e) && t.indexOf("/") !== -1) throw new H(M.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);
    const n = e.path.child(Be.fromString(t));
    if (!Q.isDocumentKey(n)) throw new H(M.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);
    return Al(r, new Q(n));
  }
  if (t instanceof we) return Al(r, t._key);
  throw new H(M.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${mi(t)}.`);
}
function Cc(r, e) {
  if (!Array.isArray(r) || r.length === 0) throw new H(M.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
}
function GC(r, e) {
  const t = (function(s, i) {
    for (const o of s) for (const B of o.getFlattenedFilters()) if (i.indexOf(B.op) >= 0) return B.op;
    return null;
  })(r.filters, (function(s) {
    switch (s) {
      case "!=":
        return [
          "!=",
          "not-in"
          /* Operator.NOT_IN */
        ];
      case "array-contains-any":
      case "in":
        return [
          "not-in"
          /* Operator.NOT_IN */
        ];
      case "not-in":
        return [
          "array-contains-any",
          "in",
          "not-in",
          "!="
          /* Operator.NOT_EQUAL */
        ];
      default:
        return [];
    }
  })(e.op));
  if (t !== null)
    throw t === e.op ? new H(M.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new H(M.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`);
}
function kC(r) {
  r = Wr(r, we);
  const e = Wr(r.firestore, iB), t = VC(e);
  return Dy(t, r._key).then(((n) => Sy(e, r, n)));
}
function Oy(r) {
  r = Wr(r, ar);
  const e = Wr(r.firestore, iB), t = VC(e), n = new MC(e);
  return vy(r._query), _y(t, r._query).then(((s) => new Qn(e, n, r, s)));
}
function Sy(r, e, t) {
  const n = t.docs.get(e._key), s = new MC(r);
  return new wn(r, s, e._key, n, new Lr(t.hasPendingWrites, t.fromCache), e.converter);
}
const fc = "@firebase/firestore", dc = "4.17.2";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(e, t = !0) {
  $p(lp), ri(new zr("firestore", ((n, { instanceIdentifier: s, options: i }) => {
    const o = n.getProvider("app").getImmediate(), B = new iB(new aE(n.getProvider("auth-internal")), new lE(o, n.getProvider("app-check-internal")), sm(o, s), o);
    return i = {
      useFetchStreams: t,
      ...i
    }, B._setSettings(i), B;
  }), "PUBLIC").setMultipleInstances(!0)), jn(fc, dc, e), // BUILD_TARGET will be replaced by values like esm, cjs, etc during the compilation
  jn(fc, dc, "esm2020");
})();
var Ny = "firebase", Fy = "12.19.0";
jn(Ny, Fy, "app");
let Oo = null, So = null;
function Py() {
  if (!Ld())
    throw new Error(
      "Firebase is not configured. Create a Firebase project at https://console.firebase.google.com, enable Firestore, then add the VITE_FIREBASE_* values to your .env file and restart the dev server."
    );
  return Oo || (Oo = Hc(ko)), Oo;
}
function BB() {
  return So || (So = wy(Py())), So;
}
const Ly = () => NE(BB(), "knowledgeEntries"), xy = () => zh(BB(), "appConfig", "global");
async function Vy(r, e) {
  return (await Oy(
    by(Ly(), cc("subject", "==", r), cc("gradeLevel", "==", e))
  )).docs.map((n) => My(n.id, n.data()));
}
function My(r, e) {
  return {
    id: r,
    subject: e.subject,
    gradeLevel: e.gradeLevel,
    title: e.title,
    contentBody: e.contentBody,
    exampleProblems: e.exampleProblems ?? [],
    pedagogicalNotes: e.pedagogicalNotes ?? "",
    attachments: e.attachments ?? [],
    createdAt: e.createdAt?.toMillis?.() ?? Date.now(),
    updatedAt: e.updatedAt?.toMillis?.() ?? Date.now()
  };
}
async function Gy(r) {
  const e = await kC(zh(BB(), "embeddingVectors", r));
  if (!e.exists()) return;
  const t = e.data();
  return {
    entryId: r,
    model: t.model,
    vector: t.vector,
    updatedAt: t.updatedAt?.toMillis?.() ?? Date.now()
  };
}
async function ky(r) {
  return (await Promise.all(r.map((t) => Gy(t)))).filter((t) => !!t);
}
function Hy(r, e) {
  if (r.length !== e.length)
    throw new Error(`Vector length mismatch: ${r.length} !== ${e.length}`);
  let t = 0, n = 0, s = 0;
  for (let i = 0; i < r.length; i++)
    t += r[i] * e[i], n += r[i] * r[i], s += e[i] * e[i];
  return n === 0 || s === 0 ? 0 : t / (Math.sqrt(n) * Math.sqrt(s));
}
const Uy = 3, jy = 0.5;
async function Jy(r, e, t) {
  let n;
  try {
    n = await Vy(r, e), await Yf(r, e, n);
  } catch {
    n = await $f(r, e);
  }
  if (n.length === 0) return [];
  const s = await ky(n.map((o) => o.id));
  if (s.length === 0) return [];
  const i = await kd(t);
  return s.map((o) => {
    const B = n.find((u) => u.id === o.entryId);
    return B ? { entry: B, score: Hy(i, o.vector) } : null;
  }).filter((o) => o !== null && o.score >= jy).sort((o, B) => B.score - o.score).slice(0, Uy);
}
function qy(r) {
  if (r.length !== 0)
    return r.map(({ entry: e }) => `Title: ${e.title}
${e.contentBody}`).join(`
---
`);
}
const gc = /^\[(HOMEWORK|CORRECT|INCORRECT|INFO)\]\s*/i, Ks = ["easy", "medium", "hard"];
function pc(r, e) {
  const t = Ks.indexOf(r);
  return e ? Ks[Math.min(t + 1, Ks.length - 1)] : Ks[Math.max(t - 1, 0)];
}
async function Ky(r) {
  const { subject: e, gradeLevel: t, performance: n, history: s, message: i } = r;
  if (Hd(i))
    return { reply: Ud(e), performance: n, isHomeworkRequest: !1, referencedEntryIds: [] };
  let o = r.knowledgeContext, B = [];
  if (!o)
    try {
      const V = await Jy(e, t, i);
      o = qy(V), B = V.map((j) => j.entry.id);
    } catch {
    }
  const u = vf[Dc()], c = wf({ subject: e, gradeLevel: t, difficulty: n.currentDifficulty, knowledgeContext: o, language: u }) + `
Begin every reply with exactly one tag as the first token: [HOMEWORK] when presenting a new question, [CORRECT] when the student's prior answer was correct, [INCORRECT] when it was wrong, or [INFO] for anything else (hints, explanations, off-topic redirects).`, C = await Gd(c, [...s, { role: "student", content: i }]), f = C.match(gc)?.[1]?.toUpperCase(), m = C.replace(gc, "").trim(), y = { ...n };
  let b = !1;
  return f === "HOMEWORK" ? (b = !0, y.totalQuestions += 1) : f === "CORRECT" ? (y.consecutiveCorrect += 1, y.consecutiveIncorrect = 0, y.consecutiveCorrect >= 2 && (y.currentDifficulty = pc(y.currentDifficulty, !0), y.consecutiveCorrect = 0)) : f === "INCORRECT" && (y.consecutiveIncorrect += 1, y.consecutiveCorrect = 0, y.consecutiveIncorrect >= 2 && (y.currentDifficulty = pc(y.currentDifficulty, !1), y.consecutiveIncorrect = 0)), { reply: m, performance: y, isHomeworkRequest: b, referencedEntryIds: B };
}
async function HC(r, e) {
  r.innerHTML = `
    <div class="chat-view">
      <header class="chat-header">${e.subject} · ${be("common.grade")} ${e.gradeLevel}</header>
      <div class="message-list"></div>
      <div class="chat-status" aria-live="polite"></div>
      <div class="input-bar-container"></div>
    </div>
  `;
  const t = r.querySelector(".message-list"), n = r.querySelector(".input-bar-container"), s = r.querySelector(".chat-status");
  let i = await Zf(e.id);
  uo(t, i), Pf(n, async (o) => {
    const B = {
      id: crypto.randomUUID(),
      sessionId: e.id,
      role: "student",
      content: o,
      timestamp: Date.now()
    };
    i = [...i, B], uo(t, i), await pu(B), cu(n, !0), s.textContent = be("chat.thinking");
    try {
      const u = i.slice(0, -1).map((f) => ({ role: f.role, content: f.content })), c = await Ky({
        subject: e.subject,
        gradeLevel: e.gradeLevel,
        performance: e.performance,
        history: u,
        message: o
      });
      e.performance = c.performance, e.lastActiveAt = Date.now(), await Xf(e);
      const C = {
        id: crypto.randomUUID(),
        sessionId: e.id,
        role: "assistant",
        content: c.reply,
        timestamp: Date.now(),
        referencedEntryIds: c.referencedEntryIds.length ? c.referencedEntryIds : void 0,
        metadata: {
          difficulty: e.performance.currentDifficulty,
          isHomeworkRequest: c.isHomeworkRequest
        }
      };
      i = [...i, C], uo(t, i), await pu(C), s.textContent = "";
    } catch (u) {
      s.textContent = Qy(u);
    } finally {
      cu(n, !1);
    }
  });
}
function Qy(r) {
  if (r instanceof Jt)
    switch (r.kind) {
      case "not_configured":
        return be("chat.errorNotConfigured");
      case "rate_limited":
        return be("chat.errorRateLimited");
      case "unavailable":
        return be("chat.errorUnavailable");
      case "network":
        return be("chat.errorNetwork");
      default:
        return be("chat.errorGeneric");
    }
  return be("chat.errorGeneric");
}
async function zy(r, e = {}) {
  const { onSessionStart: t } = e, n = e.forcedSubject, s = e.forcedGradeLevel != null && !Number.isNaN(e.forcedGradeLevel) ? e.forcedGradeLevel : void 0;
  if (n && s != null) {
    await mc(r, s, n, t);
    return;
  }
  const i = await Vo("lastSubject"), o = await Vo("lastGradeLevel");
  let B = yf;
  try {
    const u = await kC(xy());
    if (u.exists()) {
      const c = u.data();
      B = [.../* @__PURE__ */ new Set([...c.predefinedSubjects, ...c.customSubjects])];
    }
  } catch {
  }
  Nf(
    r,
    async ({ gradeLevel: u, subject: c }) => {
      await Mo("lastSubject", c), await Mo("lastGradeLevel", u), await mc(r, u, c, t);
    },
    { lastSubject: i, lastGradeLevel: o, subjects: B, forcedSubject: n }
  );
}
async function mc(r, e, t, n) {
  const s = {
    id: crypto.randomUUID(),
    gradeLevel: e,
    subject: t,
    startedAt: Date.now(),
    lastActiveAt: Date.now(),
    performance: {
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      totalQuestions: 0,
      currentDifficulty: "easy"
    }
  };
  await Wf(s), n?.(s), await HC(r, s);
}
const $y = ["theme", "lang", "subject", "grade-level"];
class Yy extends HTMLElement {
  static get observedAttributes() {
    return $y;
  }
  #e = null;
  #t = null;
  connectedCallback() {
    if (this.#e) return;
    const e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
    t.textContent = _f, e.appendChild(t), this.#e = document.createElement("div"), this.#e.id = "app", e.appendChild(this.#e), this.#r(), lu(this.#s()), this.#n();
  }
  attributeChangedCallback(e, t, n) {
    if (!(!this.#e || t === n)) {
      if (e === "theme") {
        this.#r();
        return;
      }
      if (e === "lang") {
        lu(this.#s()), this.#n();
        return;
      }
      this.#t = null, this.#n();
    }
  }
  #r() {
    this.getAttribute("theme") === "dark" ? this.setAttribute("data-theme", "dark") : this.removeAttribute("data-theme");
  }
  #s() {
    const e = this.getAttribute("lang");
    return _c(e) ? e : "en";
  }
  async #n() {
    const e = this.#e;
    if (!e) return;
    if (this.#t) {
      await HC(e, this.#t);
      return;
    }
    const t = this.getAttribute("grade-level");
    await zy(e, {
      forcedSubject: this.getAttribute("subject") ?? void 0,
      forcedGradeLevel: t != null ? Number(t) : void 0,
      onSessionStart: (n) => {
        this.#t = n;
      }
    });
  }
}
customElements.get("need-homework-app") || customElements.define("need-homework-app", Yy);
