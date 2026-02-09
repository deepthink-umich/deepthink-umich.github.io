// Paper Review and Graph Visualization
// Embedded papers data (no fetch required)
const papersData = {
  "papers": [
    {
      "id": "ddpm",
      "title": "Denoising Diffusion Probabilistic Models",
      "authors": ["Ho et al."],
      "year": 2020,
      "venue": "NeurIPS",
      "url": "https://arxiv.org/abs/2006.11239",
      "category": "foundational",
      "description": "Introduces the core framework for diffusion models using a forward and reverse diffusion process."
    },
    {
      "id": "ddim",
      "title": "Denoising Diffusion Implicit Models",
      "authors": ["Song et al."],
      "year": 2020,
      "venue": "ICLR",
      "url": "https://arxiv.org/abs/2010.02502",
      "category": "sampling",
      "description": "Proposes deterministic sampling for diffusion models, enabling faster generation with fewer steps."
    },
    {
      "id": "score_sde",
      "title": "Score-Based Generative Modeling through Stochastic Differential Equations",
      "authors": ["Song et al."],
      "year": 2021,
      "venue": "ICLR",
      "url": "https://arxiv.org/abs/2011.13456",
      "category": "foundational",
      "description": "Unifies score-based models and diffusion models through the lens of stochastic differential equations."
    },
    {
      "id": "classifier_guidance",
      "title": "Classifier Guidance",
      "authors": ["Dhariwal & Nichol"],
      "year": 2021,
      "venue": "NeurIPS",
      "url": "https://arxiv.org/abs/2105.05233",
      "category": "guidance",
      "description": "Uses classifier gradients to guide diffusion sampling for conditional generation."
    },
    {
      "id": "classifier_free",
      "title": "Classifier-Free Diffusion Guidance",
      "authors": ["Ho & Salimans"],
      "year": 2022,
      "venue": "NeurIPS",
      "url": "https://arxiv.org/abs/2207.12598",
      "category": "guidance",
      "description": "Eliminates the need for a separate classifier by training conditional and unconditional models together."
    },
    {
      "id": "latent_diffusion",
      "title": "High-Resolution Image Synthesis with Latent Diffusion Models",
      "authors": ["Rombach et al."],
      "year": 2022,
      "venue": "CVPR",
      "url": "https://arxiv.org/abs/2112.10752",
      "category": "efficiency",
      "description": "Applies diffusion in a learned latent space, enabling efficient high-resolution image generation."
    },
    {
      "id": "consistency_models",
      "title": "Consistency Models",
      "authors": ["Song et al."],
      "year": 2023,
      "venue": "ICML",
      "url": "https://arxiv.org/abs/2303.01469",
      "category": "sampling",
      "description": "Enables single-step generation by learning to map any point on the diffusion trajectory to the origin."
    },
    {
      "id": "rectified_flow",
      "title": "Rectified Flow: A Marginal Preserving Flow",
      "authors": ["Liu et al."],
      "year": 2022,
      "venue": "ICLR",
      "url": "https://arxiv.org/abs/2209.03003",
      "category": "sampling",
      "description": "Proposes a straight-line ODE flow for generative modeling with fast sampling."
    },
    {
      "id": "flow_matching",
      "title": "Flow Matching for Generative Modeling",
      "authors": ["Lipman et al."],
      "year": 2023,
      "venue": "ICLR",
      "url": "https://arxiv.org/abs/2210.02747",
      "category": "sampling",
      "description": "General framework for learning continuous normalizing flows with straight paths."
    },
    {
      "id": "generalization_analysis",
      "title": "On the Generalization of Diffusion Models",
      "authors": ["Block et al."],
      "year": 2023,
      "venue": "ICML",
      "url": "https://arxiv.org/abs/2302.05742",
      "category": "generalization",
      "description": "Theoretical analysis of generalization properties of diffusion models."
    },
    {
      "id": "distribution_shift",
      "title": "Distribution Shift in Diffusion Models",
      "authors": ["Kim et al."],
      "year": 2023,
      "venue": "NeurIPS",
      "url": "https://arxiv.org/abs/2305.18447",
      "category": "generalization",
      "description": "Studies how diffusion models generalize under distribution shifts."
    },
    {
      "id": "robust_diffusion",
      "title": "Robust Diffusion Models",
      "authors": ["Nie et al."],
      "year": 2024,
      "venue": "ICLR",
      "url": "https://arxiv.org/abs/2310.07716",
      "category": "generalization",
      "description": "Improves robustness and generalization of diffusion models through regularization."
    }
  ],
  "connections": [
    {
      "from": "ddpm",
      "to": "ddim",
      "type": "extends",
      "description": "DDIM extends DDPM with deterministic sampling"
    },
    {
      "from": "ddpm",
      "to": "score_sde",
      "type": "unifies",
      "description": "Score SDE unifies DDPM with score-based models"
    },
    {
      "from": "score_sde",
      "to": "classifier_guidance",
      "type": "enables",
      "description": "Classifier guidance uses score-based framework"
    },
    {
      "from": "classifier_guidance",
      "to": "classifier_free",
      "type": "improves",
      "description": "Classifier-free guidance removes need for separate classifier"
    },
    {
      "from": "ddpm",
      "to": "latent_diffusion",
      "type": "applies",
      "description": "Latent diffusion applies DDPM in latent space"
    },
    {
      "from": "ddim",
      "to": "consistency_models",
      "type": "inspires",
      "description": "Consistency models inspired by fast sampling in DDIM"
    },
    {
      "from": "score_sde",
      "to": "rectified_flow",
      "type": "simplifies",
      "description": "Rectified flow simplifies SDE to straight paths"
    },
    {
      "from": "rectified_flow",
      "to": "flow_matching",
      "type": "generalizes",
      "description": "Flow matching generalizes rectified flow framework"
    },
    {
      "from": "ddpm",
      "to": "generalization_analysis",
      "type": "analyzes",
      "description": "Analyzes generalization of DDPM framework"
    },
    {
      "from": "ddpm",
      "to": "distribution_shift",
      "type": "studies",
      "description": "Studies distribution shift in diffusion models"
    },
    {
      "from": "generalization_analysis",
      "to": "robust_diffusion",
      "type": "improves",
      "description": "Robust diffusion improves based on generalization insights"
    },
    {
      "from": "distribution_shift",
      "to": "robust_diffusion",
      "type": "addresses",
      "description": "Addresses distribution shift issues"
    }
  ],
  "categories": {
    "foundational": {
      "color": "#3b82f6",
      "label": "Foundational"
    },
    "sampling": {
      "color": "#10b981",
      "label": "Sampling Methods"
    },
    "guidance": {
      "color": "#f59e0b",
      "label": "Guidance"
    },
    "efficiency": {
      "color": "#8b5cf6",
      "label": "Efficiency"
    },
    "generalization": {
      "color": "#ef4444",
      "label": "Generalization"
    }
  }
};

let network = null;
let allNodesData = null; // Store original node data
let currentCategoryFilter = 'all';

// Public function to manually initialize graph (for debugging)
window.initializePaperGraph = function() {
    initializeGraph();
};

// Initialize visualization when DOM is ready
function initializePapersVisualization() {
    // Initialize graph only if panel is visible, otherwise wait for tab switch
    const generalizationPanel = document.querySelector('.research-panel[data-panel="1"]');
    if (generalizationPanel && generalizationPanel.classList.contains('active')) {
        initializeGraph();
        // Initialize with "All" category selected
        setTimeout(() => {
            renderSelectedPapersList('all');
        }, 500);
    }
}

// Initialize the graph visualization
function initializeGraph() {
    
    if (!papersData) {
        console.error('Papers data not loaded');
        return;
    }
    
    // Check if vis.Network is available
    if (typeof vis === 'undefined' || !vis.Network) {
        console.error('vis-network library not loaded');
        return;
    }
    
    const container = document.getElementById('paper-graph');
    if (!container) {
        console.error('Graph container not found');
        return;
    }
    
    // Check if container is visible and has dimensions
    const panel = container.closest('.research-panel');
    if (panel && !panel.classList.contains('active')) {
        return;
    }
    
    // Check if container has dimensions
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
        setTimeout(() => initializeGraph(), 200);
        return;
    }
    
    // Destroy existing network if it exists
    if (network) {
        network.destroy();
        network = null;
    }
    
    
    // Create nodes from papers
    const nodes = papersData.papers.map(paper => {
        const authorsText = Array.isArray(paper.authors) 
            ? paper.authors.join(', ') 
            : (paper.authors || 'Unknown');
        
        // Support both single category (string) and multi-category (array)
        const categories = Array.isArray(paper.category) ? paper.category : [paper.category];
        const categoryObjects = categories.map(cat => papersData.categories[cat]).filter(Boolean);
        
        // Count only parent-side connections (where this paper is the "from" side)
        const connectionCount = papersData.connections.filter(
            c => c.from === paper.id
        ).length;
        
        // Calculate node size based on connection count
        // Base size: 20 for nodes with 0 connections
        // Add 8 for each connection, with a maximum of 80
        // This makes nodes with more outgoing connections significantly larger
        const nodeSize = connectionCount === 0 
            ? 20 
            : Math.min(20 + (connectionCount * 8), 80);
        
        // For multi-category, use first category color as primary, or create gradient
        const primaryColor = categoryObjects.length > 0 ? categoryObjects[0].color : '#94a3b8';
        const allColors = categoryObjects.map(cat => cat.color);
        
        // Start with grey color for all nodes
        const greyColor = '#94a3b8';
        
        const node = {
            id: paper.id,
            label: '', // No labels on nodes
            title: `${paper.title}\n${authorsText}\n${paper.venue} ${paper.year}\n`,
            color: {
                background: greyColor, // Start grey
                border: '#64748b',
                highlight: {
                    background: primaryColor,
                    border: '#fbbf24'
                },
                hover: {
                    background: primaryColor,
                    border: '#fbbf24'
                }
            },
            shape: 'circle',
            size: Number(nodeSize), // Ensure it's a number
            value: Number(nodeSize), // Also set value for vis-network compatibility
            borderWidth: 3,
            shadow: true,
            categories: categories, // Store all categories
            category: categories[0], // Primary category for backward compatibility
            originalColors: allColors, // Store all original colors for filtering
            originalColor: primaryColor // Store primary color for filtering
        };
        
        // Debug: log the size calculation for first few nodes
        if (paper.id === 'ddpm' || paper.id === 'ddim' || paper.id === 'classifier_free') {
        }
        
        return node;
    });
    
    // Create edges from connections
    const edges = papersData.connections.map(conn => ({
        from: conn.from,
        to: conn.to,
        label: '', // No labels on edges
        title: `${conn.type}: ${conn.description}`,
        arrows: {
            to: {
                enabled: true,
                scaleFactor: 1.2,
                type: 'arrow'
            }
        },
        color: {
            color: 'rgba(148, 163, 184, 0.6)',
            highlight: '#3b82f6',
            hover: '#3b82f6'
        },
        width: 2.5,
        smooth: false, // Make edges straight
        shadow: {
            enabled: true,
            color: 'rgba(0, 0, 0, 0.1)',
            size: 3
        }
    }));
    
    // Store original node data for filtering
    allNodesData = nodes.map(node => ({ ...node }));
    
    const data = { nodes: nodes, edges: edges };
    
    const options = {
        nodes: {
            borderWidth: 3,
            shadow: {
                enabled: true,
                color: 'rgba(0, 0, 0, 0.25)',
                size: 10,
                x: 3,
                y: 3
            },
            font: {
                size: 0 // No font since no labels
            },
            // Don't set a global size - let each node use its individual size
            // Remove scaling to allow individual node sizes to be displayed
            scaling: {
                label: {
                    enabled: false
                }
            },
            chosen: {
                node: function(values, id, selected, hovering) {
                    // Keep original size when selected/hovered
                    return values;
                }
            }
        },
        edges: {
            width: 2.5,
            shadow: {
                enabled: true,
                color: 'rgba(0, 0, 0, 0.15)',
                size: 4
            },
            selectionWidth: 4,
            hoverWidth: 3.5
        },
        physics: {
            enabled: true,
            stabilization: {
                enabled: true,
                iterations: 250,
                fit: true
            },
            barnesHut: {
                gravitationalConstant: -3000,
                centralGravity: 0.15,
                springLength: 200,
                springConstant: 0.05,
                damping: 0.1,
                avoidOverlap: 0.5 // Reduce overlap avoidance to allow size differences
            },
            repulsion: {
                centralGravity: 0.15,
                springLength: 200,
                springConstant: 0.05,
                nodeDistance: 150,
                damping: 0.1
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 150,
            zoomView: true,
            dragView: true,
            selectConnectedEdges: true,
            multiselect: false
        },
        layout: {
            improvedLayout: true,
            hierarchical: {
                enabled: false
            }
        }
    };
    
    try {
        network = new vis.Network(container, data, options);
        
        // Fit the graph to the container after initialization
        network.once('stabilizationEnd', function() {
            network.fit({
                animation: {
                    duration: 500,
                    easingFunction: 'easeInOutQuad'
                }
            });
        });
    } catch (error) {
        console.error('Error creating network:', error);
    }
    
    // Add click event to show paper details in right panel and highlight connected papers
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            showPaperDetails(nodeId); // Show in right panel
            highlightConnectedPapers(nodeId);
        } else {
            clearHighlights();
            // Don't clear the right panel - keep showing selected papers list
        }
    });
    
    // Add double-click to open paper URL
    network.on('doubleClick', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            const paper = papersData.papers.find(p => p.id === nodeId);
            if (paper && paper.url) {
                window.open(paper.url, '_blank');
            }
        }
    });
}

// Highlight connected papers in the graph
function highlightConnectedPapers(nodeId) {
    if (!network || !papersData) return;
    
    const connectedIds = new Set([nodeId]);
    
    // Find all connected nodes
    papersData.connections.forEach(conn => {
        if (conn.from === nodeId) connectedIds.add(conn.to);
        if (conn.to === nodeId) connectedIds.add(conn.from);
    });
    
    // Get original node data to preserve colors
    const originalNode = allNodesData.find(n => n.id === nodeId);
    
    // Update node colors
    const nodes = network.body.data.nodes.get();
    nodes.forEach(node => {
        if (node.id === nodeId) {
            // Selected node: highlight with bright border and original color if filtered
            const originalNodeData = allNodesData.find(n => n.id === node.id);
            if (originalNodeData && currentCategoryFilter !== 'all') {
                const nodeCategories = originalNodeData.categories || [originalNodeData.category];
                if (nodeCategories.includes(currentCategoryFilter)) {
                    node.color.background = originalNodeData.originalColor;
                } else {
                    node.color.background = '#94a3b8';
                }
            }
            node.color.border = '#fbbf24';
            node.color.borderWidth = 5;
        } else if (connectedIds.has(node.id)) {
            // Connected nodes: highlight border
            node.color.border = '#fbbf24';
            node.color.borderWidth = 4;
        } else {
            // Other nodes: reset to normal
            node.color.border = '#64748b';
            node.color.borderWidth = 3;
        }
    });
    
    network.setData({ nodes: nodes, edges: network.body.data.edges.get() });
}

// Clear highlights
function clearHighlights() {
    if (!network) return;
    const nodes = network.body.data.nodes.get();
    nodes.forEach(node => {
        node.color.border = '#1e3a8a';
        node.color.borderWidth = 2;
    });
    network.setData({ nodes: nodes, edges: network.body.data.edges.get() });
}

// Render summarized paper block (compact view)
function renderSummarizedPaperBlock(paper, onClickHandler = null) {
    const paperCategories = Array.isArray(paper.category) ? paper.category : [paper.category];
    const categoryObjects = paperCategories.map(cat => papersData.categories[cat]).filter(Boolean);
    const authorsText = Array.isArray(paper.authors) 
        ? paper.authors.join(', ') 
        : (paper.authors || 'Unknown');
    
    const clickAttr = onClickHandler ? `onclick="${onClickHandler}('${paper.id}')"` : '';
    const cursorStyle = onClickHandler ? 'cursor: pointer;' : '';
    
    return `
        <div class="paper-block-summarized" ${clickAttr} style="${cursorStyle}">
            <div class="paper-block-summarized-header">
                <h5 class="paper-block-summarized-title">
                    ${paper.title}
                </h5>
                <div class="paper-block-summarized-badges">
                    ${categoryObjects.map(cat => `
                        <span class="paper-block-summarized-badge" style="background-color: ${cat.color}">
                            ${cat.label}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="paper-block-summarized-meta">
                <span class="paper-block-summarized-authors">${authorsText}</span>
                <span class="paper-block-summarized-venue">${paper.venue} ${paper.year}</span>
            </div>
        </div>
    `;
}

// Render detailed paper block (full view)
function renderDetailedPaperBlock(paper) {
    const paperCategories = Array.isArray(paper.category) ? paper.category : [paper.category];
    const categoryObjects = paperCategories.map(cat => papersData.categories[cat]).filter(Boolean);
    const authorsText = Array.isArray(paper.authors) 
        ? paper.authors.join(', ') 
        : (paper.authors || 'Unknown');
    
    return `
        <div class="paper-block-detailed">
            <div class="paper-block-detailed-header">
                <h3 class="paper-block-detailed-title">
                    <a href="${paper.url}" target="_blank" rel="noopener noreferrer">${paper.title}</a>
                </h3>
                <div class="paper-block-detailed-badges">
                    ${categoryObjects.map(cat => `
                        <span class="paper-block-detailed-badge" style="background-color: ${cat.color}">
                            ${cat.label}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="paper-block-detailed-meta">
                <div class="paper-block-detailed-authors"><strong>Authors:</strong> ${authorsText}</div>
                <div class="paper-block-detailed-venue-year">
                    <span class="paper-block-detailed-venue">${paper.venue}</span>
                    <span class="paper-block-detailed-year">${paper.year}</span>
                </div>
            </div>
            <div class="paper-block-detailed-description">
                <strong>Abstract:</strong>
                <p>${paper.description}</p>
            </div>
            <div class="paper-block-detailed-actions">
                <a href="${paper.url}" target="_Flank" rel="noopener noreferrer" class="paper-block-detailed-link-btn">
                    <i class="fas fa-external-link-alt"></i> View Paper
                </a>
            </div>
        </div>
    `;
}

// Show paper details in right panel with connected papers
function showPaperDetails(paperId) {
    if (!papersData) return;
    
    const paper = papersData.papers.find(p => p.id === paperId);
    if (!paper) return;
    
    // Highlight and focus on the node in the graph
    if (network) {
        highlightConnectedPapers(paperId);
        // Focus on the selected node
        network.focus(paperId, {
            scale: 1.5,
            animation: {
                duration: 500,
                easingFunction: 'easeInOutQuad'
            }
        });
    }
    
    // Find all connected papers (both incoming and outgoing connections)
    const connections = papersData.connections.filter(
        c => c.from === paperId || c.to === paperId
    );
    
    const connectedPaperIds = new Set();
    connections.forEach(conn => {
        if (conn.from === paperId) connectedPaperIds.add(conn.to);
        if (conn.to === paperId) connectedPaperIds.add(conn.from);
    });
    
    const connectedPapers = Array.from(connectedPaperIds)
        .map(id => {
            const connectedPaper = papersData.papers.find(p => p.id === id);
            if (!connectedPaper) return null;
            // Find the connection type
            const connection = connections.find(c => 
                (c.from === paperId && c.to === id) || (c.to === paperId && c.from === id)
            );
            return {
                paper: connectedPaper,
                connectionType: connection ? connection.type : '',
                connectionDesc: connection ? connection.description : ''
            };
        })
        .filter(Boolean);
    
    // Support both single category (string) and multi-category (array)
    const categories = Array.isArray(paper.category) ? paper.category : [paper.category];
    const categoryObjects = categories.map(cat => papersData.categories[cat]).filter(Boolean);
    
    const authorsText = Array.isArray(paper.authors) 
        ? paper.authors.join(', ') 
        : (paper.authors || 'Unknown');
    
    // Display in the right panel (selected papers list area)
    const selectedPapersList = document.getElementById('selected-papers-list');
    if (!selectedPapersList) return;
    
    selectedPapersList.innerHTML = `
        <div class="papers-panel-header">
            <h4>Selected Paper</h4>
        </div>
        <div class="papers-panel-content">
            <!-- Detailed Block: Main Paper -->
            ${renderDetailedPaperBlock(paper)}
            
            <!-- Summarized Blocks: Related Papers -->
            ${connectedPapers.length > 0 ? `
                <div class="related-papers-section">
                    <h4 class="related-papers-title">Related Papers (${connectedPapers.length})</h4>
                    <div class="related-papers-list">
                        ${connectedPapers.map(({ paper: connectedPaper, connectionType, connectionDesc }) => {
                            return `
                                <div class="related-paper-wrapper">
                                    ${connectionType ? `
                                        <div class="connection-indicator-summarized">
                                            <span class="connection-type-badge-summarized">${connectionType}</span>
                                            ${connectionDesc ? `<span class="connection-desc-summarized">${connectionDesc}</span>` : ''}
                                        </div>
                                    ` : ''}
                                    ${renderSummarizedPaperBlock(connectedPaper, 'showPaperDetails')}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}


// Filter nodes by category
function filterByCategory(category) {
    if (!network || !allNodesData) return;
    
    currentCategoryFilter = category;
    
    // Update active button
    document.querySelectorAll('.category-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        }
    });
    
    // Get current nodes
    const nodes = network.body.data.nodes.get();
    
    // Update node colors based on category filter
    nodes.forEach(node => {
        const originalNode = allNodesData.find(n => n.id === node.id);
        if (!originalNode) return;
        
        if (category === 'all') {
            // Show all nodes in grey
            node.color.background = '#94a3b8';
            node.color.border = '#64748b';
        } else {
            // Check if node belongs to the selected category (support multi-category)
            const nodeCategories = originalNode.categories || [originalNode.category];
            if (nodeCategories.includes(category)) {
                // If multi-category, use primary color or create visual indicator
                if (originalNode.originalColors && originalNode.originalColors.length > 1) {
                    // Multi-category: use primary color with special border
                    node.color.background = originalNode.originalColor;
                    node.color.border = originalNode.originalColors[0]; // Use first category color
                    node.borderWidth = 4; // Thicker border for multi-category
                } else {
                    // Single category
                    node.color.background = originalNode.originalColor;
                    node.color.border = originalNode.originalColor;
                    node.borderWidth = 3;
                }
            } else {
                node.color.background = '#94a3b8';
                node.color.border = '#64748b';
                node.borderWidth = 3;
            }
        }
    });
    
    // Update the network
    network.setData({ nodes: nodes, edges: network.body.data.edges.get() });
    
    // Update selected papers list
    renderSelectedPapersList(category);
}

// Make filterByCategory available globally
window.filterByCategory = filterByCategory;

// Render selected papers list
function renderSelectedPapersList(category) {
    if (!papersData) return;
    
    const listContainer = document.getElementById('selected-papers-list');
    if (!listContainer) return;
    
    // Filter papers - support multi-category
    const filteredPapers = category === 'all' 
        ? papersData.papers 
        : papersData.papers.filter(p => {
            const paperCategories = Array.isArray(p.category) ? p.category : [p.category];
            return paperCategories.includes(category);
        });
    
    if (filteredPapers.length === 0) {
        listContainer.innerHTML = '';
        return;
    }
    
    const categoryInfo = category === 'all' 
        ? null 
        : papersData.categories[category];
    
    listContainer.innerHTML = `
        <div class="papers-panel-header">
            <h4>${category === 'all' ? 'All Papers' : categoryInfo.label} (${filteredPapers.length})</h4>
        </div>
        <div class="papers-panel-content">
            <div class="papers-list-summarized">
                ${filteredPapers.map(paper => renderSummarizedPaperBlock(paper, 'showPaperDetails')).join('')}
            </div>
        </div>
    `;
}


// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePapersVisualization);
} else {
    initializePapersVisualization();
}

// Watch for panel visibility changes
function setupPanelObserver() {
    const panel = document.querySelector('.research-panel[data-panel="1"]');
    if (panel) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (panel.classList.contains('active') && papersData && !network) {
                        setTimeout(() => initializeGraph(), 100);
                    }
                }
            });
        });
        
        observer.observe(panel, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Set up observer after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPanelObserver);
} else {
    setupPanelObserver();
}

// Re-initialize graph when Generalization tab is opened
// Wait for openResearchTab to be defined
function setupTabHandler() {
    if (typeof window.openResearchTab !== 'undefined') {
        const originalOpenResearchTab = window.openResearchTab;
        window.openResearchTab = function(tabIndex) {
            originalOpenResearchTab(tabIndex);
            
            // If Generalization tab (index 1) is opened, ensure graph is initialized
            if (tabIndex === 1) {
                // Wait for panel to be visible and have dimensions
                setTimeout(() => {
                    if (!network) {
                        initializeGraph();
                        // Initialize selected papers list
                        setTimeout(() => {
                            renderSelectedPapersList('all');
                        }, 500);
                    } else {
                        // Force redraw and fit to window
                        network.redraw();
                        network.fit({
                            animation: {
                                duration: 500,
                                easingFunction: 'easeInOutQuad'
                            }
                        });
                        // Update selected papers list
                        renderSelectedPapersList(currentCategoryFilter);
                    }
                }, 300);
            }
        };
    } else {
        // Retry if openResearchTab is not yet defined
        setTimeout(setupTabHandler, 100);
    }
}

// Set up tab handler after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupTabHandler);
} else {
    setupTabHandler();
}

