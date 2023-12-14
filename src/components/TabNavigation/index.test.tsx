import { render, screen } from '@testing-library/react';

import { TabNavigation } from '.';

describe('Tab Navigation', () => {
  const tabs = [
    { url: '/fashion', name: 'all', active: true },
    { url: '/fashion/style-trends', name: 'style & trends' },
    { url: '/fashion/look-for-less', name: 'look for less' },
  ];
  const activeTab = { url: '/fashion', name: 'all', active: true };

  it('rendered', () => {
    render(<TabNavigation tabs={tabs} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('rendered tabs with correct length', () => {
    render(<TabNavigation tabs={tabs} />);

    expect(screen.getAllByRole('link').length).toEqual(tabs.length);
  });

  it('active tab should have primary class', () => {
    render(<TabNavigation tabs={tabs} />);
    const elemActive = screen.getByText(activeTab.name);

    // eslint-disable-next-line testing-library/no-node-access
    expect(elemActive.parentElement).toHaveClass('text-primary');
  });
});
