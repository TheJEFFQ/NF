document.addEventListener('DOMContentLoaded', () => {
    const mockConversations = [
        {
            id: 1,
            name: "John Doe",
            item: "iPhone 13 Pro",
            preview: "Is the iPhone still available?",
            time: "2 hours ago"
        },
        {
            id: 2,
            name: "Alice Smith",
            item: "MacBook Air M1",
            preview: "Great, I'll take it! When can we meet?",
            time: "1 day ago"
        },
        {
            id: 3,
            name: "Bob Wilson",
            item: "Sony A7 III",
            preview: "Can you do R 11,000?",
            time: "2 days ago"
        }
    ];

    const conversationsContainer = document.querySelector('.conversations');
    const messagesSearch = document.querySelector('.messages-search input');
    const chatArea = document.querySelector('.chat-area');
    const conversationsList = document.querySelector('.conversations-list');

    // Render conversations
    function renderConversations(conversations) {
        conversationsContainer.innerHTML = conversations.map(conv => `
            <div class="conversation-card" data-id="${conv.id}">
                <div class="avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="conversation-details">
                    <div class="conversation-header">
                        <span class="contact-name">${conv.name}</span>
                        <span class="message-time">${conv.time}</span>
                    </div>
                    <div class="item-title">${conv.item}</div>
                    <div class="message-preview">${conv.preview}</div>
                </div>
            </div>
        `).join('');

        // Add click handlers
        document.querySelectorAll('.conversation-card').forEach(card => {
            card.addEventListener('click', () => {
                const conv = mockConversations.find(c => c.id === parseInt(card.dataset.id));
                openChat(conv);
            });
        });
    }

    // Search functionality
    messagesSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredConversations = mockConversations.filter(conv => 
            conv.name.toLowerCase().includes(searchTerm) || 
            conv.item.toLowerCase().includes(searchTerm) ||
            conv.preview.toLowerCase().includes(searchTerm)
        );
        renderConversations(filteredConversations);
    });

    // Open chat function
    function openChat(conversation) {
        document.querySelectorAll('.conversation-card').forEach(card => {
            card.classList.remove('active');
            if (card.dataset.id === conversation.id.toString()) {
                card.classList.add('active');
            }
        });

        const userDetails = document.querySelector('.user-details');
        userDetails.innerHTML = `
            <h3>${conversation.name}</h3>
            <div class="chat-item">${conversation.item}</div>
        `;

        // For mobile: show chat area and hide conversations list
        if (window.innerWidth <= 768) {
            chatArea.classList.add('active');
            conversationsList.classList.add('hidden');
        }
    }

    // Add back button for mobile chat view
    const chatHeader = document.querySelector('.chat-header');
    const backButton = document.createElement('button');
    backButton.className = 'back-to-messages';
    backButton.innerHTML = '<i class="fas fa-arrow-left"></i>';
    chatHeader.insertBefore(backButton, chatHeader.firstChild);

    backButton.addEventListener('click', () => {
        chatArea.classList.remove('active');
        conversationsList.classList.remove('hidden');
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            chatArea.classList.remove('active');
            conversationsList.classList.remove('hidden');
        }
    });

    // Initial render
    renderConversations(mockConversations);
});
