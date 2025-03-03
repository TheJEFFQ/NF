class Chat {
    constructor() {
        // Use relative WebSocket URL
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${wsProtocol}//${window.location.hostname}:8080`;
        this.ws = new WebSocket(wsUrl);
        this.currentChatUser = null;
        this.initWebSocket();
    }

    initWebSocket() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.displayMessage(data);
        };

        this.ws.onopen = () => {
            console.log('Connected to chat server');
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    async loadContacts() {
        try {
            const response = await fetch('/api/chat.php?action=get_contacts');
            const data = await response.json();
            if (data.success) {
                this.displayContacts(data.contacts);
            }
        } catch (error) {
            console.error('Error loading contacts:', error);
        }
    }

    async loadMessages(userId) {
        try {
            const response = await fetch(`/api/chat.php?action=get_messages&user_id=${userId}`);
            const data = await response.json();
            if (data.success) {
                this.displayMessages(data.messages);
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    sendMessage(message) {
        if (!this.currentChatUser) return;
        
        this.ws.send(JSON.stringify({
            sender_id: window.currentUserId,
            receiver_id: this.currentChatUser,
            message: message
        }));
    }

    displayMessage(message) {
        const chatMessages = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(message.sender_id === window.currentUserId ? 'sent' : 'received');
        
        messageElement.innerHTML = `
            <p>${message.message}</p>
            <span class="timestamp">${new Date(message.timestamp).toLocaleTimeString()}</span>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    displayMessages(messages) {
        const chatMessages = document.querySelector('.chat-messages');
        chatMessages.innerHTML = '';
        messages.forEach(message => this.displayMessage(message));
    }

    displayContacts(contacts) {
        const contactsList = document.querySelector('.contacts-list');
        contactsList.innerHTML = '';
        
        contacts.forEach(contact => {
            const contactElement = document.createElement('div');
            contactElement.classList.add('contact');
            contactElement.innerHTML = `<span>${contact.full_name}</span>`;
            
            contactElement.addEventListener('click', () => {
                this.currentChatUser = contact.id;
                this.loadMessages(contact.id);
                document.querySelector('.current-chat-user').textContent = contact.full_name;
            });
            
            contactsList.appendChild(contactElement);
        });
    }
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chatInstance = new Chat();
    
    const messageForm = document.querySelector('.message-form');
    messageForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = e.target.querySelector('input');
        const message = input.value.trim();
        
        if (message) {
            window.chatInstance.sendMessage(message);
            input.value = '';
        }
    });
});
